import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { nanoid } from 'nanoid'
import {
  HeroContainer,
  ContentWrapper,
  LogoWrapper,
  UseAccount,
  HeroContent
} from './styles'
import { useSession, useOrder, useLanguage, useEvent, useApi } from '~components'

import {
  Modal,
  Button,
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  useWindowSize
} from '~ui'

export const HomeHero = (props) => {
  const { notificationState } = props

  const [{ auth, user }, { login }] = useSession()
  const [orderState, { changeType }] = useOrder()
  const [, t] = useLanguage()
  const [events] = useEvent()
  const [ordering] = useApi()
  const [modals, setModals] = useState({ listOpen: false, formOpen: false })
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [modalPageToShow, setModalPageToShow] = useState(null)
  const [newAddressModalOpened, setNewAddressModalOpened] = useState(false)

  const bgImg = theme?.my_products?.components?.images?.components?.homepage_background?.components?.image
  const mobileBgImg = theme?.my_products?.components?.images?.components?.homepage_mobile_background?.components?.image
  const isFullScreen = theme?.my_products?.components?.images?.components?.homepage_image_fullscreen

  const handleOpenLoginSignUp = (index) => {
    setModalPageToShow(index)
    setAuthModalOpen(true)
  }

  const handleCustomModalClick = (e, { page }) => {
    e.preventDefault()
    setModalPageToShow(page)
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
    setModalPageToShow(null)
  }

  const handleSuccessLogin = (user) => {
    if (user) {
      closeAuthModal()
    }
  }

  const handleSuccessSignup = (user) => {
    login({
      user,
      token: user?.session?.access_token
    })
  }

  const handleCreateGuestUser = async (values) => {
    try {
      const { content: { error, result } } = await ordering.users().save(values)
      if (!error) {
        login({
          user: result,
          token: result.session?.access_token
        })
      } else {
        // setState({ ...state, error: result, loading: false })
      }
    } catch (err) {
      // setState({ ...state, error: err.message, loading: false })
    }
  }

  const handleUpdateGuest = async () => {
    const guestToken = nanoid()
    if (guestToken) await handleCreateGuestUser({ guest_token: guestToken })
  }

  const handleGoToOrders = () => {
    events.emit('go_to_page', { page: 'my_orders' })
  }

  const handleGoToOrderTypes = async (orderType) => {
    await changeType(orderType)
    if (!auth && !user?.guestId) {
      await handleUpdateGuest()
    }
    events.emit('go_to_page', { page: 'order_types' })
  }

  useEffect(() => {
    return () => setModals({ listOpen: false, formOpen: false })
  }, [])

  useEffect(() => {
    if (newAddressModalOpened) return
    if (auth && !orderState.loading && !orderState?.options?.address?.location) {
      setModals({ ...modals, listOpen: true })
      setNewAddressModalOpened(true)
    }
  }, [auth, orderState, newAddressModalOpened])

  return (
    <HeroContainer
      bgimage={windowSize.width < 576
        ? (mobileBgImg || theme.images?.general?.homeHeroMobile)
        : (bgImg || theme.images?.general?.homeHero)}
      isFullScreen={isFullScreen}
    >
      <ContentWrapper>
          <LogoWrapper>
            <img alt='Logotype' src={theme?.images?.logos?.logoWhite} loading='lazy' />
          </LogoWrapper>
        <HeroContent>
          <UseAccount>
            <Button color='primary' onClick={() => handleGoToOrderTypes(1)}>{t('DELIVERY', 'DELIVERY')}</Button>
            <Button color='primary' onClick={() => handleGoToOrderTypes(2)}>{t('PICKUP', 'PICKUP')}</Button>
            <Button
              color='primary'
              onClick={() => auth ? handleGoToOrders() : handleOpenLoginSignUp('login')}>
              {auth ? t('PREVIOUS_ORDERS', 'PREVIOUS ORDERS') : t('LOGIN', 'login')}
            </Button>
          </UseAccount>
        </HeroContent>
      </ContentWrapper>
      {authModalOpen && !auth && (
        <Modal
          open={authModalOpen}
          onRemove={() => closeAuthModal()}
          width='50%'
          authModal
        >
          {modalPageToShow === 'login' && (
            <LoginForm
              notificationState={notificationState}
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
              notificationState={notificationState}
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
    </HeroContainer>
  )
}
