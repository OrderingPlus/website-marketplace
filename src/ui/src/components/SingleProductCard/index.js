import React, { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from 'styled-components'
import { Heart as DisLike, HeartFill as Like } from 'react-bootstrap-icons'

import {
  CardContainer,
  CardInfo,
  CardLogo,
  SoldOut,
  QuantityContainer,
  TitleWrapper
} from './styles'

import { useLanguage, useConfig, useOrder, useUtils, useSession, SingleProductCard as SingleProductCardController } from '~components'

import {
  Button,
  Alert,
  useIntersectionObserver,
  Modal,
  LoginForm,
  SignUpForm,
  ForgotPasswordForm
} from '~ui'

const singleProductCardPropsAreEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.product) === JSON.stringify(nextProps.product) &&
    prevProps.isSkeleton === nextProps.isSkeleton &&
    prevProps.isSoldOut === nextProps.isSoldOut &&
    prevProps.isCartOnProductsList === nextProps.isCartOnProductsList &&
    prevProps.productAddedToCartLength === nextProps.productAddedToCartLength
}

const SingleProductCardUI = React.memo((props) => {
  const {
    product,
    isSoldOut,
    isSkeleton,
    onProductClick,
    isCartOnProductsList,
    useCustomFunctionality,
    onCustomClick,
    customText,
    customStyle,
    useKioskApp,
    productAddedToCartLength,
    handleFavoriteProduct,
    isFavorite,
    isPreviously
  } = props

  const [, t] = useLanguage()
  const [$element, isObserved] = useIntersectionObserver()
  const [stateConfig] = useConfig()
  const [{ optimizeImage }] = useUtils()
  const [orderState] = useOrder()
  const [{ auth }, { login }] = useSession()
  const theme = useTheme()
  const favoriteRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPageToShow, setModalPageToShow] = useState(null)
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  const editMode = typeof product?.code !== 'undefined'
  const isObservedValidation = isObserved || useKioskApp

  const removeToBalance = editMode ? product?.quantity : 0

  const cartProducts = Object.values(orderState.carts).reduce((products, _cart) => [...products, ..._cart?.products], [])
  const productBalance = cartProducts.reduce((sum, _product) => sum + (_product.id === product?.id ? _product.quantity : 0), 0)

  const totalBalance = (productBalance || 0) - removeToBalance

  const maxCartProductConfig = (stateConfig.configs.max_product_amount ? parseInt(stateConfig.configs.max_product_amount) : 100) - totalBalance

  const hideAddButton = theme?.business_view?.components?.products?.components?.add_to_cart_button?.hidden ?? true
  const hideProductDummyLogo = theme?.business_view?.components?.products?.components?.product?.components?.dummy?.hidden

  let maxCartProductInventory = (product?.inventoried ? product?.quantity : undefined) - totalBalance
  maxCartProductInventory = !isNaN(maxCartProductInventory) ? maxCartProductInventory : maxCartProductConfig

  const maxProductQuantity = Math.min(maxCartProductConfig, maxCartProductInventory)

  const handleClickProduct = (e) => {
    if (favoriteRef?.current?.contains(e.target)) return
    if (productAddedToCartLength && product?.maximum_per_order && productAddedToCartLength >= product?.maximum_per_order) {
      setAlertState({
        open: true,
        content: [t('PRODUCT_ON_MAXIMUM_ORDER', 'The product is on maximum order')]
      })
      return
    }

    if (isFavorite) {
      onProductClick && onProductClick()
      return
    }
    (!isSkeleton && !useCustomFunctionality && onProductClick && onProductClick(product, product?.business?.slug)) ||
      (useCustomFunctionality && onCustomClick && onCustomClick())
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const handleChangeFavorite = () => {
    if (auth) {
      handleFavoriteProduct && handleFavoriteProduct(!product?.favorite)
    } else {
      setModalPageToShow('login')
      setIsModalOpen(true)
    }
  }

  const closeAuthModal = () => {
    setIsModalOpen(false)
    setModalPageToShow(null)
  }

  const handleSuccessLogin = (user) => {
    if (user) {
      closeAuthModal()
    }
  }

  const handleCustomModalClick = (e, { page }) => {
    e.preventDefault()
    setModalPageToShow(page)
  }

  const handleSuccessSignup = (user) => {
    login({
      user,
      token: user?.session?.access_token
    })
  }

  return (
    <>
      <CardContainer
        ref={$element}
        soldOut={isSoldOut || maxProductQuantity <= 0}
        onClick={handleClickProduct}
        isCartOnProductsList={isCartOnProductsList}
        style={useCustomFunctionality && customStyle}
        className='product-card'
        isShowAddButt={!useCustomFunctionality && !hideAddButton && !isSkeleton}
      >
        {isObservedValidation && (
          <div>
            {!useCustomFunctionality && (
              <>
                {!isSkeleton && productAddedToCartLength > 0 && (
                  <QuantityContainer>
                    <span>{productAddedToCartLength}</span>
                  </QuantityContainer>
                )}
                <CardInfo soldOut={isSoldOut || maxProductQuantity <= 0} isBgimage={optimizeImage(product?.images || theme?.images?.dummies?.product, 'h_86,c_limit')} oneLine={isPreviously}>
                  <CardLogo
                    className='image'
                    soldOut={isSoldOut || maxProductQuantity <= 0}
                    bgimage={optimizeImage(product?.images || (!hideProductDummyLogo && theme?.images?.dummies?.product), 'h_86,c_limit')}
                  />
                  <TitleWrapper>
                    {!isSkeleton ? (<h1>{product?.name}</h1>) : (<Skeleton width={100} />)}
                    {
                      !isSkeleton
                        ? (
                          <span onClick={() => handleChangeFavorite()} ref={favoriteRef}>
                            {product?.favorite ? <Like /> : <DisLike />}
                          </span>
                          )
                        : (<Skeleton width={16} height={16} />)}
                  </TitleWrapper>
                </CardInfo>

                {(isSoldOut || maxProductQuantity <= 0) && <SoldOut isBottom={product?.ribbon?.enabled}>{t('SOLD_OUT', 'SOLD OUT')}</SoldOut>}
              </>
            )}
            {useCustomFunctionality && customText && (
              <span style={{ fontSize: 16, fontWeight: 500 }}>{customText}</span>
            )}
          </div>
        )}
        {!useCustomFunctionality && !hideAddButton && !isSkeleton && (
          <Button outline color='primary' disabled={productAddedToCartLength && product?.maximum_per_order && productAddedToCartLength >= product?.maximum_per_order}>
            {t('ADD', 'Add')}
          </Button>
        )}
      </CardContainer>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onRemove={() => closeAuthModal()}
          onClose={() => closeAuthModal()}
          width='50%'
          authModal
        >
          {modalPageToShow === 'login' && (
            <LoginForm
              handleSuccessLogin={handleSuccessLogin}
              elementLinkToSignup={
                <a
                  onClick={
                    (e) => handleCustomModalClick(e, { page: 'signup' })
                  } href='#'
                >{t('CREATE_ACCOUNT', theme?.defaultLanguages?.CREATE_ACCOUNT || 'Create account')}
                </a>
              }
              elementLinkToForgotPassword={
                <a
                  onClick={
                    (e) => handleCustomModalClick(e, { page: 'forgotpassword' })
                  } href='#'
                >{t('RESET_PASSWORD', theme?.defaultLanguages?.RESET_PASSWORD || 'Reset password')}
                </a>
              }
              useLoginByCellphone
              isPopup
            />
          )}
          {modalPageToShow === 'signup' && (
            <SignUpForm
              elementLinkToLogin={
                <a
                  onClick={
                    (e) => handleCustomModalClick(e, { page: 'login' })
                  } href='#'
                >{t('LOGIN', theme?.defaultLanguages?.LOGIN || 'Login')}
                </a>
              }
              useLoginByCellphone
              useChekoutFileds
              handleSuccessSignup={handleSuccessSignup}
              isPopup
              closeModal={() => closeAuthModal()}
            />
          )}
          {modalPageToShow === 'forgotpassword' && (
            <ForgotPasswordForm
              elementLinkToLogin={
                <a
                  onClick={
                    (e) => handleCustomModalClick(e, { page: 'login' })
                  } href='#'
                >{t('LOGIN', theme?.defaultLanguages?.LOGIN || 'Login')}
                </a>
              }
              isPopup
            />
          )}
        </Modal>
      )}
      <Alert
        title={t('PRODUCT', 'Product')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </>
  )
}, singleProductCardPropsAreEqual)

export const SingleProductCard = (props) => {
  const singleProductCardProps = {
    ...props,
    UIComponent: SingleProductCardUI
  }
  return <SingleProductCardController {...singleProductCardProps} />
}
