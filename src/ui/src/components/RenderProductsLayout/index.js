import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { Cart3, ArrowLeft } from 'react-bootstrap-icons'

import {
  Title,
  WrappLayout,
  WrapContent,
  BusinessContent,
  BusinessCategoryProductWrapper,
  BusinessCartContainer,
  BusinessCartContent,
  EmptyCart,
  EmptyBtnWrapper,

  TabsContainer,
  BackButton,
  BusinessProductsListContainer
} from './styles'

import { ToastType, useEvent, useLanguage, useToast, useUtils } from '~components'
import { SpinnerCart } from '../Cart/styles'

import {
  useWindowSize,
  scrollTo,
  SpinnerLoader,
  Modal,
  Button,
  Cart,

  BusinessBasicInformation,
  BusinessProductsCategories,
  BusinessProductsList,
  Tab,
  FavoriteList
} from '~ui'

export const RenderProductsLayout = (props) => {
  const {
    errors,
    isError,
    isLoading,
    business,
    searchValue,
    currentCart,
    businessState,
    categoryState,
    categorySelected,
    openBusinessInformation,
    isCartOnProductsList,
    errorQuantityProducts,
    handler,
    onClickCategory,
    featuredProducts,
    onProductClick,
    handleSearchRedirect,
    handleChangeSearch,
    handleCartOpen,
    isCustomLayout,
    useKioskApp,
    setSubcategoriesSelected,
    subcategoriesSelected,
    isLazy,
    handleUpdateProducts,
    handleChangeProfessionalSelected,
    professionalSelected,
    isCustomerMode,
    productLoading,
    setProductLoading,
    businessNearestState
  } = props

  const theme = useTheme()
  const [, t] = useLanguage()
  const [{ parsePrice }] = useUtils()
  const [events] = useEvent()
  const windowSize = useWindowSize()
  const [, { showToast }] = useToast()
  const [isCartModal, setisCartModal] = useState(false)
  const [tabSelected, setTabSelected] = useState(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const showCartOnProductList = !theme?.business_view?.components?.cart?.components?.hidden

  const handleSaveProduct = () => {
    if (windowSize.width < 993) {
      return
    }
    const productContainer = document.getElementsByClassName('bp-list')[0]
    scrollTo(productContainer, 500, 1250)
  }

  const handleChangeTab = (val) => {
    setTabSelected(val)
  }

  useEffect(() => {
    handleSaveProduct()
  }, [categorySelected])

  useEffect(() => {
    if (!isLoading && !business?.id) {
      events.emit('go_to_page', { page: 'order_types' })
      showToast(ToastType.Error, t(businessNearestState?.error) || t('NO_BUSINESS_NEAR_LOCATION', 'No business near of you location'))
    }
  }, [isLoading, business?.id])

  return (
    <>
      {!isLoading && business?.id && (
        <WrappLayout isCartOnProductsList={isCartOnProductsList}>
          <BusinessProductsListContainer className='bp-list'>
            {!(businessState?.loading || businessNearestState?.loading) && business?.id && !(business?.categories?.length === 0) && !selectedCategoryId && (
              <>
                <TabsContainer>
                  <Tab
                    className={tabSelected === 1 ? 'selected' : ''}
                    onClick={() => handleChangeTab(1)}
                  >
                    <p
                      size={14}
                      color={
                        tabSelected === 1
                          ? theme.colors.primary
                          : theme.colors.black
                      }
                    >
                      {t('MENU', 'MENU')}
                    </p>
                  </Tab>
                  <Tab
                    className={tabSelected === 2 ? 'selected' : ''}
                    onClick={() => handleChangeTab(2)}
                  >
                    <p
                      size={14}
                      color={
                        tabSelected === 2
                          ? theme.colors.primary
                          : theme.colors.black
                      }
                    >
                      {t('FOR_YOU', 'FOR YOU')}
                    </p>
                  </Tab>
                </TabsContainer>
                {tabSelected === 1 && (
                  <BusinessProductsCategories
                    categories={[...business?.categories.sort((a, b) => a.rank - b.rank)]}
                    categorySelected={categorySelected}
                    onClickCategory={onClickCategory}
                    featured={featuredProducts}
                    selectedCategoryId={selectedCategoryId}
                    lazyLoadProductsRecommended={business?.lazy_load_products_recommended}
                    setSelectedCategoryId={setSelectedCategoryId}
                  />
                )}
                {tabSelected === 2 && (
                  <FavoriteList
                    isProduct
                    businessId={business.id}
                    paginationSettings={{ initialPage: 1, pageSize: 50, controlType: 'infinity' }}
                    favoriteURL='favorite_products'
                    originalURL='products'
                  />
                )}
              </>
            )}
            {selectedCategoryId && (
              <>
                <BackButton onClick={() => setSelectedCategoryId(null)}>
                  <ArrowLeft size={24} />
                </BackButton>
                <BusinessContent isCustomLayout={isCustomLayout || useKioskApp} id='wrapper-categories'>
                  <BusinessCategoryProductWrapper showCartOnProductList={showCartOnProductList}>
                    <WrapContent id='businessProductList'>
                      <BusinessProductsList
                        categories={[
                          { id: null, name: t('ALL', theme?.defaultLanguages?.ALL || 'All') },
                          ...business?.categories.sort((a, b) => a.rank - b.rank)
                        ]}
                        isLazy={isLazy}
                        selectedCategoryId={selectedCategoryId}
                        category={categorySelected}
                        categoryState={categoryState}
                        useKioskApp={useKioskApp}
                        businessId={business?.id}
                        errors={errors}
                        onProductClick={onProductClick}
                        handleSearchRedirect={handleSearchRedirect}
                        featured={featuredProducts}
                        searchValue={searchValue}
                        isCartOnProductsList={isCartOnProductsList}
                        handleClearSearch={handleChangeSearch}
                        errorQuantityProducts={errorQuantityProducts}
                        business={business}
                        currentCart={currentCart}
                        setSubcategoriesSelected={setSubcategoriesSelected}
                        subcategoriesSelected={subcategoriesSelected}
                        onClickCategory={onClickCategory}
                        handleUpdateProducts={handleUpdateProducts}
                        professionalSelected={professionalSelected}
                        handleChangeProfessionalSelected={handleChangeProfessionalSelected}
                        previouslyProducts={businessState?.business?.previously_products}
                      />
                    </WrapContent>
                  </BusinessCategoryProductWrapper>

                </BusinessContent>
              </>
            )}
          </BusinessProductsListContainer>
          {(windowSize.width >= 1000 && windowSize.height >= 600) && (
            <BusinessCartContainer isProfessional={business?.professionals?.length > 0 && !useKioskApp}>
              <BusinessCartContent maxHeight={window.innerHeight - 100}>
                {currentCart?.products?.length > 0
                  ? (
                    <>
                      <Title>{t('YOUR_CART', 'Your cart')}</Title>
                      <Cart
                        isStore
                        isCustomMode
                        isForceOpenCart
                        useKioskApp={useKioskApp}
                        cart={currentCart}
                        isCartPending={currentCart?.status === 2}
                        isProducts={currentCart.products.length}
                        isCartOnProductsList={isCartOnProductsList}
                        handleCartOpen={handleCartOpen}
                        businessConfigs={business?.configs}
                        productLoading={productLoading}
                        setProductLoading={setProductLoading}
                      />
                    </>
                    )
                  : (
                    <EmptyCart>
                      <div className='empty-content'>
                        <Cart3 />
                        <p>{t('ADD_PRODUCTS_IN_YOUR_CART', 'Add products in your cart')}</p>
                      </div>
                      <EmptyBtnWrapper>
                        <span>{parsePrice(0)}</span>
                        <Button>{t('EMPTY_CART', 'Empty cart')}</Button>
                      </EmptyBtnWrapper>
                      {productLoading && (
                        <SpinnerCart emptyCart>
                          <SpinnerLoader
                            style={{ height: 100 }}
                          />
                        </SpinnerCart>
                      )}
                    </EmptyCart>
                    )}
              </BusinessCartContent>
            </BusinessCartContainer>
          )}
        </WrappLayout>
      )}

      {isLoading && !isError && (
        <>
          {!isCustomLayout && !useKioskApp && (
            <BusinessBasicInformation
              isSkeleton
              handler={handler}
              businessState={{ business: {}, loading: true }}
              openBusinessInformation={openBusinessInformation}
            />
          )}
          <BusinessContent isCustomLayout={isCustomLayout || useKioskApp} id='wrapper-categories'>
            <BusinessCategoryProductWrapper showCartOnProductList={showCartOnProductList}>
              <div style={{ position: 'relative' }}>
                <BusinessProductsCategories
                  isSkeleton
                  categories={[]}
                  openBusinessInformation={openBusinessInformation}
                  isCustomerMode={isCustomerMode}
                />
              </div>
            </BusinessCategoryProductWrapper>
          </BusinessContent>
          {(selectedCategoryId || windowSize.width >= 993) && (
            <WrapContent>
              <BusinessProductsList
                categories={[]}
                useKioskApp={useKioskApp}
                category={categorySelected}
                categoryState={categoryState}
                isBusinessLoading={isLoading}
                handleUpdateProducts={handleUpdateProducts}
                errorQuantityProducts={errorQuantityProducts}
              />
            </WrapContent>
          )}
        </>
      )}
      {isCartModal && (
        <Modal
          width='40%'
          open={isCartModal}
          onClose={() => setisCartModal(false)}
          padding='0'
        >
          <BusinessCartContent isModal>
            <Title style={{ textAlign: 'center', marginTop: '5px' }}>{t('YOUR_CART', 'Your cart')}</Title>
            {currentCart?.products?.length > 0
              ? (
                <>
                  <Cart
                    isStore
                    isCustomMode
                    isForceOpenCart
                    cart={currentCart}
                    useKioskApp={useKioskApp}
                    isCartPending={currentCart?.status === 2}
                    isProducts={currentCart.products.length}
                    isCartOnProductsList={isCartOnProductsList}
                    handleCartOpen={handleCartOpen}
                    businessConfigs={business?.configs}
                    productLoading={productLoading}
                    setProductLoading={setProductLoading}
                  />
                </>
                )
              : (
                <EmptyCart>
                  <div className='empty-content'>
                    <Cart3 />
                    <p>{t('ADD_PRODUCTS_IN_YOUR_CART', 'Add products in your cart')}</p>
                  </div>
                  <EmptyBtnWrapper>
                    <span>{parsePrice(0)}</span>
                    <Button>{t('EMPTY_CART', 'Empty cart')}</Button>
                  </EmptyBtnWrapper>
                </EmptyCart>
                )}
          </BusinessCartContent>
        </Modal>
      )}
    </>
  )
}
