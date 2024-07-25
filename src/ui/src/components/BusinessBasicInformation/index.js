import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { ArrowLeft } from 'react-bootstrap-icons'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import BsInfoCircle from '@meronex/icons/bs/BsInfoCircle'

import {
  BusinessContainer,
  BusinessContent,
  WrapperBusinessLogo,
  BusinessLogo,
  BusinessMoreDetail,
  SearchComponentContainer,
  BusinessInfoWrapper,
  BackButton
} from './styles'
import { SearchComponent } from './SearchComponent'
import { BusinessInfoComponent } from './BusinessInfoComponent'

import { useUtils, useLanguage } from '~components'
import {
  Button,
  useWindowSize,
  Modal,
  BusinessInformation,
  BusinessReviews,
  MomentContent,
  SearchProducts,
  BusinessPreorder
} from '~ui'
dayjs.extend(timezone)
dayjs.extend(isBetween)

const types = ['food', 'laundry', 'alcohol', 'groceries']

export const BusinessBasicInformation = (props) => {
  const {
    isSkeleton,
    businessState,
    setOpenBusinessInformation,
    openBusinessInformation,
    handleChangeSearch,
    searchValue,
    sortByOptions,
    sortByValue,
    handleChangeSortBy,
    categoryState,
    errorQuantityProducts,
    isCustomerMode,
    isCustomLayout,
    setCategoryClicked,
    categoryClicked,
    handleAddReservation,
    currentCart
  } = props
  const { business, loading } = businessState

  const theme = useTheme()
  const [, t] = useLanguage()
  const [{ optimizeImage }] = useUtils()
  const windowSize = useWindowSize()
  const [isBusinessReviews, setIsBusinessReviews] = useState(false)
  const [isPreOrder, setIsPreOrder] = useState(false)
  const [openSearchProducts, setOpenSearchProducts] = useState(false)

  const hideLogo = theme?.business_view?.components?.header?.components?.logo?.hidden
  const hideInfoIcon = theme?.business_view?.components?.header?.components?.business_info?.hidden
  const hideHeader = theme?.business_view?.components?.header?.hidden

  const isInfoShrunken = theme?.business_view?.components?.header?.components?.business?.components?.layout?.position === 'shrunken'

  const businessInfoComponentProps = {
    loading,
    business,
    isInfoShrunken,
    isCustomerMode,
    setIsPreOrder,
    setIsBusinessReviews,
    categoryState,
    searchValue,
    errorQuantityProducts,
    setOpenSearchProducts,
    handleChangeSortBy,
    sortByValue,
    sortByOptions,
    isCustomLayout,
    handleAddReservation,
    currentCart
  }

  const getBusinessType = () => {
    if (Object.keys(business).length <= 0) return t('GENERAL', 'General')
    const _types = []
    types.forEach(type => business[type] && _types.push(
      t(`BUSINESS_TYPE_${type?.replace(/\s/g, '_')?.toUpperCase()}`, type)
    ))
    return _types.join(', ')
  }

  useEffect(() => {
    if (businessState?.loading) return
    let timeout = null
    const currentDate = dayjs().tz(businessState?.business?.timezone)
    let lapse = null
    if (businessState?.business?.today?.enabled) {
      lapse = businessState?.business?.today?.lapses?.find(lapse => {
        const from = currentDate.hour(lapse.open.hour).minute(lapse.open.minute)
        const to = currentDate.hour(lapse.close.hour).minute(lapse.close.minute)
        return currentDate.unix() >= from.unix() && currentDate.unix() <= to.unix()
      })
    }
    if (lapse) {
      const to = currentDate.hour(lapse.close.hour).minute(lapse.close.minute)
      const timeToClose = (to.unix() - currentDate.unix()) * 1000
      timeout = setTimeout(() => {
        setIsPreOrder(true)
      }, timeToClose)
    }
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [businessState?.business])

  useEffect(() => {
    document.body.style.overflowY = openSearchProducts ? 'hidden' : 'auto'
  }, [openSearchProducts])

  const handleScroll = () => {
    const searchElement = document.getElementById('search-component')
    if (searchElement) {
      const limit = window.scrollY >= searchElement?.offsetTop && window.scrollY > 0
      if (limit) {
        const classAdded = searchElement.classList.contains('fixed-search')
        !classAdded && searchElement.classList.add('fixed-search')
      } else {
        searchElement && searchElement.classList.remove('fixed-search')
      }
    }
    const backArrowElement = document.getElementById('back-arrow')

    const businessNameElement = document.getElementById('business_name')
    const businessNameFeedbackElement = document.getElementById('business_name_feedback')
    if (businessNameElement) {
      const limit = window.scrollY >= (businessNameElement?.offsetTop - 55) && window.scrollY > 0
      if (limit) {
        const classAdded = businessNameElement.classList.contains('fixed-name')
        !classAdded && businessNameElement.classList.add('fixed-name')
        const classAdded2 = backArrowElement?.classList?.contains?.('fixed-arrow')
        !classAdded2 && backArrowElement && backArrowElement.classList.add('fixed-arrow')
        if (businessNameFeedbackElement) businessNameFeedbackElement.style.display = 'block'
      } else {
        businessNameElement && businessNameElement.classList.remove('fixed-name')
        backArrowElement && backArrowElement.classList.remove('fixed-arrow')
        if (businessNameFeedbackElement) businessNameFeedbackElement.style.display = 'none'
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [windowSize?.width])

  useEffect(() => {
    window.scroll({
      top: window.scrollY - 1,
      left: 0
    })
  }, [sortByValue])

  return (
    <>
      {openSearchProducts && (
        <SearchProducts
          {...props}
          onClose={() => {
            handleChangeSearch && handleChangeSearch('')
            setOpenSearchProducts(false)
            window.scroll({
              top: window.scrollY - 1,
              left: 0
            })
          }}
          business={businessState.business}
        />
      )}
      <BusinessInfoWrapper>
        {(!isInfoShrunken) && (
          <BusinessInfoComponent {...businessInfoComponentProps} />
        )}
        {((business?.header || business?.logo || loading || isInfoShrunken) && !hideHeader) && (
          <BusinessContainer bgimage={business?.header} isSkeleton={isSkeleton} id='container' isClosed={!business?.open}>
            {(!loading && !business?.open) && <h1>{t('CLOSED', 'Closed')}</h1>}
            {(!hideLogo && business?.logo) && (
              <BusinessContent>
                <WrapperBusinessLogo>
                  {!loading && (
                    <BusinessLogo bgimage={optimizeImage(business?.logo, 'h_200,c_limit')} />
                  )}
                </WrapperBusinessLogo>
              </BusinessContent>
            )}
            {(isInfoShrunken) && (
              <BusinessInfoComponent {...businessInfoComponentProps} />
            )}
            {!loading && (
              <>
                {isInfoShrunken && (
                  <SearchComponentContainer>
                    <SearchComponent
                      setOpenSearchProducts={setOpenSearchProducts}
                      handleChangeSortBy={handleChangeSortBy}
                      sortByValue={sortByValue}
                      sortByOptions={sortByOptions}
                    />
                  </SearchComponentContainer>
                )}
                {!hideInfoIcon && (
                  <BusinessMoreDetail>
                    <BsInfoCircle onClick={() => setOpenBusinessInformation(true)} />
                  </BusinessMoreDetail>
                )}
              </>
            )}
          </BusinessContainer>
        )}
        {!business?.header && !business?.logo && !loading && !isInfoShrunken && !hideInfoIcon && (
          <BusinessMoreDetail position='relative'>
            <BsInfoCircle onClick={() => setOpenBusinessInformation(true)} />
          </BusinessMoreDetail>
        )}
      </BusinessInfoWrapper>
      {(windowSize.width <= 768 && categoryClicked) && (
        <BackButton>
          <Button
            color='primary'
            initialIcon
            onClick={() => setCategoryClicked(false)}
          >
            <ArrowLeft />
            <div>{t('GO_TO_ALL_CATEGORIES', 'Go to all categories')}</div>
          </Button>
        </BackButton>
      )}
      {openBusinessInformation && (
        <Modal
          width='70%'
          open={openBusinessInformation}
          onClose={setOpenBusinessInformation}
          padding='0'
          hideCloseDefault
          isTransparent
        >
          <BusinessInformation
            business={business}
            getBusinessType={getBusinessType}
            optimizeImage={optimizeImage}
            onClose={setOpenBusinessInformation}
          />
        </Modal>
      )}
      {isBusinessReviews && (
        <Modal
          width='70%'
          open={isBusinessReviews}
          onClose={() => setIsBusinessReviews(false)}
          padding='20px'
        >
          <BusinessReviews
            businessId={business.id}
            reviews={business.reviews?.reviews}
            businessName={business.name}
            stars={business.reviews?.total}
          />
        </Modal>
      )}
      {isPreOrder && (
        <Modal
          open={isPreOrder}
          width={isCustomerMode ? '700px' : '760px'}
          onClose={() => setIsPreOrder(false)}
          padding={isCustomerMode && '20px'}
        >
          {isCustomerMode
            ? (
            <MomentContent onClose={() => setIsPreOrder(false)} />
              )
            : (
            <BusinessPreorder
              business={business}
              handleClick={() => setIsPreOrder(false)}
            />
              )}
        </Modal>
      )}
    </>
  )
}
