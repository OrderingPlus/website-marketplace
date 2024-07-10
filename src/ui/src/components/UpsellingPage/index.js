import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import MdClose from '@meronex/icons/md/MdClose'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  Container,
  UpsellingContainer,
  Item,
  Image,
  Details,
  CloseUpselling,
  SkeletonContainer,
  HorizontalUpsellingContainer,
  HorizontalItem,
  HorizontalImage,
  HorizontalDetails,
  WrapAutoScroll,
  UpsellingPageTitleWrapper,
  Divider
} from './styles'

import { UpsellingPage as UpsellingPageController, useLanguage, useUtils } from '~components'

import {
  Button,
  Modal,
  AutoScroll,
  ProductForm
} from '~ui'

const UpsellingPageUI = (props) => {
  const {
    upsellingProducts,
    handleUpsellingPage,
    openUpselling,
    canOpenUpselling,
    setCanOpenUpselling,
    business,
    isCustomMode
  } = props

  const [, t] = useLanguage()
  const [{ parsePrice }] = useUtils()
  const theme = useTheme()

  const [actualProduct, setActualProduct] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showUpselling, setShowUpSelling] = useState(true)

  const hideProductDummyLogo = theme?.business_view?.components?.products?.components?.product?.components?.dummy?.hidden

  useEffect(() => {
    if (!isCustomMode) {
      if (upsellingProducts?.products?.length && !upsellingProducts.loading) {
        setCanOpenUpselling && setCanOpenUpselling(true)
      } else if (!upsellingProducts?.products?.length && !upsellingProducts.loading && !canOpenUpselling && openUpselling) {
        handleUpsellingPage()
      }
    }
  }, [upsellingProducts.loading, upsellingProducts?.products.length])

  useEffect(() => {
    if (upsellingProducts?.products.length > 0) setShowUpSelling(true)
    else setShowUpSelling(false)
  }, [upsellingProducts?.products.length])

  const handleFormProduct = (product) => {
    setActualProduct(product)
    setModalIsOpen(true)
  }

  const handleSaveProduct = () => {
    setActualProduct(null)
    setModalIsOpen(false)
  }

  const UpsellingLayout = () => {
    return (
      <Container>
        <UpsellingContainer>
          {
            !upsellingProducts.loading
              ? (
              <>
                {
                  (!upsellingProducts.error && upsellingProducts.products?.length > 0)
                    ? upsellingProducts.products.map((product, i) => (
                    <Item key={product.id} name={product.name}>
                      <Image>
                        <img src={product.images} alt={`product-${i}`} width='150px' height='150px' loading='lazy' />
                      </Image>
                      <Details>
                        <div>
                          <h3 title={product.name}>{product.name}</h3>
                        </div>
                        <p>{parsePrice(product.price)}</p>
                        <Button color='primary' onClick={() => handleFormProduct(product)}>{t('ADD', 'Add')}</Button>
                      </Details>
                    </Item>
                    ))
                    : (
                    <div>
                      {upsellingProducts.message || t('NO_UPSELLING_PRODUCTS', 'There are no upselling products')}
                    </div>
                      )
                }
              </>
                )
              : [...Array(8)].map((item, i) => (
              <SkeletonContainer key={i}>
                <Skeleton width={150} height={250} />
              </SkeletonContainer>
                ))
          }
        </UpsellingContainer>
      </Container>
    )
  }

  return (
    <>
      {isCustomMode
        ? (
            showUpselling
              ? (
          <>
            <Divider />
            <UpsellingPageTitleWrapper>
              <p>{t('UPSELLING_QUESTION', 'Do you want something else?')}</p>
              <MdClose onClick={() => setShowUpSelling(false)} />
            </UpsellingPageTitleWrapper>
            <WrapAutoScroll>
              <HorizontalUpsellingContainer>
                {
                  !upsellingProducts.loading
                    ? (
                    <AutoScroll scrollId='upSelling' isColumnMode={upsellingProducts.products.length === 1}>
                      {
                        (!upsellingProducts.error && upsellingProducts.products.length > 0)
                          ? upsellingProducts.products.map((product, i) => (
                          <HorizontalItem key={product.id} name={product.name}>
                            <HorizontalDetails>
                              <div>
                                <h3 title={product.name}>{product.name}</h3>
                              </div>
                              <div>
                                <span>{parsePrice(product.price)}</span>
                              </div>
                              <Button color='primary' onClick={() => handleFormProduct(product)}>{t('ADD', 'Add')}</Button>
                            </HorizontalDetails>
                            {(product?.images || (!hideProductDummyLogo && theme?.images?.dummies?.product)) && (
                              <HorizontalImage>
                                <img src={product.images} alt={`product-${i}`} loading='lazy' />
                              </HorizontalImage>
                            )}
                          </HorizontalItem>
                          ))
                          : (
                          <div>
                            {upsellingProducts.message || t('NO_UPSELLING_PRODUCTS', 'There are no upselling products')}
                          </div>
                            )
                      }
                    </AutoScroll>
                      )
                    : [...Array(8)].map((item, i) => (
                    <SkeletonContainer key={i}>
                      <Skeleton width={250} height={100} />
                    </SkeletonContainer>
                      ))
                }
              </HorizontalUpsellingContainer>
            </WrapAutoScroll>
          </>
                )
              : null
          )
        : (
        <>
          {!(!canOpenUpselling || upsellingProducts?.products?.length === 0)
            ? openUpselling
              ? (
              <Modal
                title={t('UPSELLING_QUESTION', 'Do you want something else?')}
                open={openUpselling}
                onClose={() => handleUpsellingPage()}
                width='70%'
              >
                <UpsellingLayout />
                <CloseUpselling>
                  <Button
                    color='secondary'
                    outline
                    onClick={() => handleUpsellingPage(false)}
                  >
                    {t('NO_THANKS', 'No, Thanks')}
                  </Button>
                </CloseUpselling>
              </Modal>
                )
              : null
            : null}
        </>
          )}
      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          width='700px'
          padding='0'
          closeOnBackdrop
          disableOverflowX
        >
          {actualProduct && (
            <ProductForm
              useKioskApp={props.useKioskApp}
              product={actualProduct}
              businessId={actualProduct.api.businessId}
              businessSlug={business.slug}
              onSave={() => handleSaveProduct()}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export const UpsellingPage = (props) => {
  const UpsellingPageProps = {
    ...props,
    UIComponent: UpsellingPageUI
  }

  return <UpsellingPageController {...UpsellingPageProps} />
}
