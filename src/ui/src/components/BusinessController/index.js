import React, { useState, useRef } from 'react'
import { useTheme } from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { Heart as DisLike, HeartFill as Like } from 'react-bootstrap-icons'
import GoPrimitiveDot from '@meronex/icons/go/GoPrimitiveDot'

import {
  ContainerCard,
  WrapperBusinessCard,
  BusinessHero,
  BusinessContent,
  BusinessInfo,
  BusinessInfoItem,
  BusinessName,
  Medadata,
  RibbonBox,
  FavoriteWrapper,
  BusinessNameContainer,
  BusinessDistance,
  BusinessNameContainerRight,
  OpenAtContainer,
  BusinessAddress,
  ButtonSkeleton
} from './styles'

import { useLanguage, useUtils, useOrder, useSession, BusinessController as BusinessSingleCard } from '~components'
import {
  Alert,
  Modal,
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  convertHoursToMinutes,
  lightenDarkenColor,
  shape,
  Button
} from '~ui'
import moment from 'moment'
import dayjs from 'dayjs'

const BusinessControllerUI = (props) => {
  const {
    isSkeleton,
    business,
    handleClick,
    orderType,
    isCustomerMode,
    isBusinessOpen,
    onPreorderBusiness,
    firstCard,
    minWidthEnabled,
    typeButton,
    children,
    businessDeliveryPrice,
    businessDeliveryTime,
    businessPickupTime,
    businessDistance,
    handleFavoriteBusiness,
    businessState,
    isBusinessMap
  } = props

  const theme = useTheme()
  const [, t] = useLanguage()
  const [{ auth }, { login }] = useSession()
  const [{ parsePrice, parseDistance, parseTime }] = useUtils()
  const [orderState] = useOrder()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPageToShow, setModalPageToShow] = useState(null)

  const favoriteRef = useRef(null)
  const businessRows = theme?.business_listing_view?.components?.layout?.rows
  const hideBusinessFee = theme?.business_listing_view?.components?.business?.components?.fee?.hidden
  const hideBusinessTime = theme?.business_listing_view?.components?.business?.components?.time?.hidden
  const hideBusinessDistance = theme?.business_listing_view?.components?.business?.components?.distance?.hidden
  const hideBusinessFavorite = theme?.business_listing_view?.components?.business?.components?.favorite?.hidden

  const handleBusinessClick = (e) => {
    if (favoriteRef?.current?.contains(e.target)) return
    if (onPreorderBusiness && !isBusinessOpen) onPreorderBusiness(business)
    else handleClick(business)
  }

  const handleChangeFavorite = () => {
    if (auth) {
      handleFavoriteBusiness && handleFavoriteBusiness(!businessState?.business?.favorite)
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

  const checkTime = (val) => val < 10 ? `0${val}` : val

  const findTodayLapse = () => {
    if (business?.today?.enabled) {
      const currentDate = dayjs().tz(business?.timezone)
      const lapse = business?.today?.lapses?.find((lapse) => {
        const from = currentDate.hour(lapse.open.hour).minute(lapse.open.minute)
        const to = currentDate.hour(lapse.close.hour).minute(lapse.close.minute)
        return currentDate.unix() >= from.unix() && currentDate.unix() <= to.unix()
      })
      return lapse || business?.today?.lapses?.[0]
    }
  }

  if (typeButton) {
    return (
      <ContainerCard typeButton={typeButton}>
        {children}
      </ContainerCard>
    )
  }

  return (
    <>
      <ContainerCard
        isSkeleton={isSkeleton}
        firstCard={firstCard}
        minWidthEnabled={minWidthEnabled}
        businessRows={businessRows}
        disabled={business?.enabled === false}
        isBusinessMap={isBusinessMap}
      >
        <WrapperBusinessCard disabled={business?.enabled === false} isSkeleton={isSkeleton}>
          {business?.ribbon?.enabled && (
            <RibbonBox
              bgColor={business?.ribbon?.color}
              colorText={lightenDarkenColor(business?.ribbon?.color)}
              borderRibbon={lightenDarkenColor(business?.ribbon?.color)}
              isRoundRect={business?.ribbon?.shape === shape?.rectangleRound}
              isCapsule={business?.ribbon?.shape === shape?.capsuleShape}
            >
              {business?.ribbon?.text}
            </RibbonBox>
          )}
          <BusinessHero>
            <BusinessNameContainer>
              {business?.name
                ? (
                  <BusinessName>{business?.name}</BusinessName>
                  )
                : (
                  <Skeleton width={150} />
                  )}
            </BusinessNameContainer>
            <BusinessNameContainerRight>
              {!hideBusinessDistance && (
                <>
                  {(businessDistance ?? business?.distance) >= 0
                    ? (
                      <BusinessDistance>
                        {parseDistance((businessDistance ?? business?.distance))}
                      </BusinessDistance>
                      )
                    : (
                      <Skeleton width={65} />
                      )}
                </>
              )}
              {!hideBusinessFavorite && !isCustomerMode && (
                <FavoriteWrapper ref={favoriteRef} onClick={handleChangeFavorite}>
                  {!isSkeleton
                    ? (
                      <>
                        {(businessState?.business?.favorite) ? <Like /> : <DisLike />}
                      </>
                      )
                    : (
                      <Skeleton width={16} height={16} />
                      )}
                </FavoriteWrapper>
              )}
            </BusinessNameContainerRight>
          </BusinessHero>
          <BusinessContent>
            {!isSkeleton
              ? (
                <BusinessAddress>
                  {business?.address}
                </BusinessAddress>
                )
              : (
                <Skeleton width={195} />
                )}
            <BusinessInfo className='info'>
              <BusinessInfoItem>
                <Medadata isSkeleton={isSkeleton}>
                  {!hideBusinessFee && orderType === 1 && (
                    <>
                      {(businessDeliveryPrice ?? business?.delivery_price) >= 0
                        ? (
                          <p>
                            <span>{t('DELIVERY_FEE', 'Delivery fee')}</span>
                            {business && parsePrice((businessDeliveryPrice ?? business?.delivery_price))}
                            <GoPrimitiveDot />
                          </p>
                          )
                        : (
                          <Skeleton width={65} />
                          )}
                    </>
                  )}
                  {!hideBusinessTime && (
                    <>
                      {Object.keys(business).length > 0
                        ? (
                          <p className='bullet'>
                            {convertHoursToMinutes(orderState?.options?.type === 1 ? (businessDeliveryTime ?? business?.delivery_time) : (businessPickupTime ?? business?.pickup_time)) || <Skeleton width={100} />}
                          </p>
                          )
                        : (
                          <Skeleton width={65} />
                          )}
                    </>
                  )}
                </Medadata>
              </BusinessInfoItem>
            </BusinessInfo>
            <OpenAtContainer isClosed={!(business?.open && business?.today?.enabled)}>
              {!isSkeleton
                ? (
                  <p>
                    {business?.open && business?.today?.enabled
                      ? `${t('OPEN_AT', 'OPEN AT')} ${parseTime(moment(`${checkTime(findTodayLapse()?.open?.hour)}:${checkTime(findTodayLapse()?.open?.minute)}`, 'HH:mm'))}`
                      : t('STORE_CLOSED', 'Store closed')}
                  </p>
                  )
                : (
                  <Skeleton width={65} />
                  )}
            </OpenAtContainer>
          </BusinessContent>
            {!isSkeleton
              ? (
                <Button
                  color={business?.open && business?.today?.enabled ? 'primary' : 'secondary'}
                  onClick={(e) => !isSkeleton && handleClick && handleBusinessClick(e)}
                >
                  {business?.open && business?.today?.enabled
                    ? t('START_ORDER', 'START ORDER')
                    : t('VIEW_MENU', 'VIEW MENU')}
                </Button>
                )
              : (
                <ButtonSkeleton>
                  <Skeleton height={45} />
                </ButtonSkeleton>
                )}
        </WrapperBusinessCard>
      </ContainerCard>
      <Alert
        title={t('BUSINESS_CLOSED', 'Business Closed')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
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
    </>
  )
}

export const BusinessController = (props) => {
  const businessControllerProps = {
    ...props,
    UIComponent: BusinessControllerUI
  }

  return (
    <BusinessSingleCard {...businessControllerProps} />
  )
}
