import React, { useEffect, useState } from 'react'
import {
  HighestRatedContainer,
  ErrorMessage,
  BusinessList,
  Title,
  Description,
  BusinessListWrapper
} from './styles'

import { useLanguage, useOrder, BusinessList as BusinessListController } from '~components'

import {
  AutoScroll,
  Modal,
  getCateringValues,
  Button,
  BusinessPreorder,
  BusinessController,
  NotFoundSource
} from '~ui'

const HighestRatedUI = (props) => {
  const {
    businessesList,
    handleBusinessClick,
    isCustomLayout,
    handleClickAddress,
    setHasHighRatedBusiness,
    isCustomerMode,
    favoriteIds,
    setFavoriteIds
  } = props

  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [isPreorder, setIsPreorder] = useState(false)
  const [preorderBusiness, setPreorderBusiness] = useState(null)

  const isBusinessWithReviews = businessesList?.businesses?.every((business) => business?.reviews?.total === 0)
  const cateringTypeString = orderState?.options?.type === 7
    ? 'catering_delivery'
    : orderState?.options?.type === 8
      ? 'catering_pickup'
      : null
  const cateringValues = preorderBusiness?.configs && getCateringValues(cateringTypeString, preorderBusiness?.configs)

  const handleClosePreorder = () => {
    setIsPreorder(false)
    setPreorderBusiness(null)
  }

  useEffect(() => {
    if (preorderBusiness) setIsPreorder(true)
  }, [preorderBusiness])

  useEffect(() => {
    if (!businessesList.loading) {
      setHasHighRatedBusiness(!isBusinessWithReviews)
    }
  }, [businessesList?.businesses])

  useEffect(() => {
    if (!businessesList?.businesses?.length) return
    const ids = [...(favoriteIds ?? [])]
    businessesList.businesses.forEach(business => {
      if (business?.favorite) {
        ids.push(business.id)
      }
    })
    setFavoriteIds && setFavoriteIds([...new Set(ids)])
  }, [businessesList?.businesses?.length])

  return (
    <>
      <HighestRatedContainer>
        <Title>{t('HIGHEST_RATED', 'Highest rated')}</Title>
        <Description>{t('TOP_RATINGS_AND_GREAT_SERVICE', 'Top ratings and great service')}</Description>
        <BusinessListWrapper>
          <BusinessList>
            {
              !isCustomerMode && !businessesList.loading && (businessesList.businesses.length === 0 || isBusinessWithReviews) && (
                <NotFoundSource
                  content={t('NOT_FOUND_BUSINESSES_HIGHEST_RATED', 'No highest rated businesses found, please change filters or change address.')}
                >
                  <Button
                    outline
                    color='primary'
                    onClick={() => handleClickAddress()}
                  >
                    {t('CHANGE_ADDRESS', 'Select other Address')}
                  </Button>
                </NotFoundSource>
              )
            }
            <AutoScroll scrollId='highestRated'>
              {
                !businessesList?.loading && businessesList?.businesses?.map((business) => (
                  business?.reviews?.total > 0 && (
                    <BusinessController
                      key={business.id}
                      className='card'
                      business={business}
                      isBusinessOpen={business.open && business?.enabled !== false}
                      handleCustomClick={handleBusinessClick}
                      orderType={orderState?.options?.type}
                      isCustomLayout={isCustomLayout}
                      isCustomerMode={isCustomerMode}
                      favoriteIds={favoriteIds}
                      setFavoriteIds={setFavoriteIds}
                      onPreorderBusiness={setPreorderBusiness}
                    />
                  )
                ))
              }
            </AutoScroll>
            {businessesList.loading && (
              [...Array(8).keys()].map(i => (
                <BusinessController
                  key={i}
                  className='card'
                  business={{}}
                  isSkeleton
                  orderType={orderState?.options?.type}
                />
              ))
            )}
            {businessesList.error && businessesList.error.length > 0 && businessesList.businesses.length === 0 && (
              businessesList.error.map((e, i) => (
                <ErrorMessage key={i}>{t('ERROR', 'ERROR')}: [{e?.message || e}]</ErrorMessage>
              ))
            )}
          </BusinessList>
        </BusinessListWrapper>
      </HighestRatedContainer>
      {isPreorder && (
        <Modal
          open={isPreorder}
          width='760px'
          onClose={() => handleClosePreorder()}
        >
          <BusinessPreorder
            business={preorderBusiness}
            handleClick={handleBusinessClick}
            showButton
            cateringPreorder={!!cateringTypeString}
            {...cateringValues}
          />
        </Modal>
      )}
    </>
  )
}

export const HighestRated = (props) => {
  const highestRatedProps = {
    ...props,
    UIComponent: HighestRatedUI,
    initialOrderByValue: 'rating'
  }
  return <BusinessListController {...highestRatedProps} />
}
