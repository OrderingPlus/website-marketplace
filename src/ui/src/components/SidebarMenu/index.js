import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import IosMenu from '@meronex/icons/ios/IosMenu'
import MdClose from '@meronex/icons/md/MdClose'
import AiOutlineLogin from '@meronex/icons/ai/AiOutlineLogin'
import AiOutlineUserAdd from '@meronex/icons/ai/AiOutlineUserAdd'
import FaRegAddressCard from '@meronex/icons/fa/FaRegAddressCard'
import FaRegListAlt from '@meronex/icons/fa/FaRegListAlt'
import AiOutlineHome from '@meronex/icons/ai/AiOutlineHome'
import BiWallet from '@meronex/icons/bi/BiWallet'
import BiStore from '@meronex/icons/bi/BiStore'
import FaUserCircle from '@meronex/icons/fa/FaUserCircle'
import BiHelpCircle from '@meronex/icons/bi/BiHelpCircle'
import SiJsonwebtokens from '@meronex/icons/si/SiJsonwebtokens'
import BiMessageDetail from '@meronex/icons/bi/BiMessageDetail'
import BsSearch from '@meronex/icons/bs/BsSearch'
import { Heart, Tag } from 'react-bootstrap-icons'

import {
  Container,
  IconContent,
  SidebarContent,
  MenuClose,
  MenuLink,
  WrappContent,
  MenuLinkIcon,
  MenuLinkText,
  TextInfo,
  MenuLinkSeparator
} from './styles'

import { useEvent, useLanguage, useOrder, useSession, useConfig } from '~components'
import {
  useWindowSize,
  LogoutButton,
  Modal,
  SignUpForm,
  LoginForm,
  ForgotPasswordForm
} from '~ui'

export const SidebarMenu = (props) => {
  const { auth, isHideSignup, userCustomer, isCustomerMode, notificationState } = props
  const [, { login }] = useSession()
  const [events] = useEvent()
  const [{ configs }] = useConfig()
  const [, t] = useLanguage()
  const [{ options }] = useOrder()
  const theme = useTheme()
  const { width } = useWindowSize()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalPageToShow, setModalPageToShow] = useState(null)

  const isProjectEnterpricePlan = configs?.plan_enterprise && configs?.plan_enterprise?.value
  const isWalletEnabled = configs?.cash_wallet?.value && configs?.wallet_enabled?.value === '1' && (configs?.wallet_cash_enabled?.value === '1' || configs?.wallet_credit_point_enabled?.value === '1')
  const isPromotionsEnabled = configs?.advanced_offers_module?.value === '1' || configs?.advanced_offers_module?.value === true
  const hideBrowse = theme?.bar_menu?.components?.browse?.hidden
  const hideOrders = theme?.bar_menu?.components?.orders?.hidden
  const hideProfile = theme?.bar_menu?.components?.profile?.hidden
  const hideWallet = theme?.bar_menu?.components?.wallet?.hidden
  const hideMessages = theme?.bar_menu?.components?.messages?.hidden
  const hideHelp = theme?.bar_menu?.components?.help?.hidden
  const hideFavorites = theme?.bar_menu?.components?.favortes?.hidden
  const hideSession = theme?.bar_menu?.components?.sessions?.hidden || !isProjectEnterpricePlan
  const hidePromotions = theme?.bar_menu?.components?.promotions?.hidden

  const closeModal = () => {
    setModalIsOpen(false)
    setModalPageToShow(null)
    actionSidebar(false)
  }

  const handleSuccessLogin = (user) => {
    if (user) {
      closeModal()
    }
  }

  const handleOpenLoginSignUp = (index) => {
    setModalPageToShow(index)
    setModalIsOpen(true)
  }

  const handleGoToPage = (e, data) => {
    e.preventDefault()
    events.emit('go_to_page', data)
    actionSidebar(false)
    setIsMenuOpen(false)
  }

  const actionSidebar = (value) => {
    setIsMenuOpen(value)
    document.getElementById('sidebar_menu').style.width = value
      ? width > 489 ? '340px' : '100vw'
      : '0'
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
    closeModal()
  }

  useEffect(() => {
    if (isMenuOpen) {
      if (width <= 489) {
        document.getElementById('sidebar_menu').style.width = '100vh'
      } else {
        document.getElementById('sidebar_menu').style.width = '340px'
      }
    }
  }, [width])

  return (
    <Container $auth={auth}>
      <IconContent
        aria-label='menu'
        onClick={() => actionSidebar(true)}
      >
        <IosMenu />
      </IconContent>
      <SidebarContent
        id='sidebar_menu'
      >
        <MenuClose
          aria-label='close'
          onClick={() => actionSidebar(false)}
        >
          <MdClose />
        </MenuClose>

        {userCustomer && (
          <MenuLink isCustomer={userCustomer}>
            <WrappContent>
              <MenuLinkIcon
                active={false}
              >
                <FaUserCircle />
              </MenuLinkIcon>
              <MenuLinkText>
                <TextInfo
                  active={false}
                >
                  {`${userCustomer?.name} ${userCustomer?.lastname}`}
                </TextInfo>
              </MenuLinkText>
              <MenuLinkSeparator>
                <div>
                  <hr />
                </div>
              </MenuLinkSeparator>
            </WrappContent>
          </MenuLink>
        )}

        <MenuLink
          onClick={(e) => handleGoToPage(e, { page: options?.address?.location ? 'search' : 'home' })}
          href={options?.address?.location ? '/search' : '/home'}
        >
          <WrappContent>
            <MenuLinkIcon
              active={
                window.location.pathname === '/' ||
                window.location.pathname === '/home' ||
                window.location.pathname === '/search'
              }
            >
              {options?.address?.location
                ? (
                <BiStore />
                  )
                : (
                <AiOutlineHome />
                  )}
            </MenuLinkIcon>
            <MenuLinkText>
              <TextInfo
                active={
                  window.location.pathname === '/' ||
                  window.location.pathname === '/home' ||
                  window.location.pathname === '/search'
                }
              >
                {options?.address?.location
                  ? (
                      t('BUSINESSES', 'Businesses')
                    )
                  : (
                      t('HOME', 'Home')
                    )}
              </TextInfo>
            </MenuLinkText>
            <MenuLinkSeparator>
              <div>
                <hr />
              </div>
            </MenuLinkSeparator>
          </WrappContent>
        </MenuLink>
        {auth && (
          <>
            {!hideBrowse && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'business_search' })}
                href='/business_search'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/business_search'
                    }
                  >
                    <BsSearch />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/business_search'
                      }
                    >
                      {t('BROWSE_SEARCH', 'Browse & Search')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {
              !isCustomerMode && !hideOrders && (
                <MenuLink
                  onClick={(e) => handleGoToPage(e, { page: 'orders' })}
                  href='/profile/orders'
                >
                  <WrappContent>
                    <MenuLinkIcon
                      active={
                        window.location.pathname === '/profile/orders'
                      }
                    >
                      <FaRegListAlt />
                    </MenuLinkIcon>
                    <MenuLinkText>
                      <TextInfo
                        active={
                          window.location.pathname === '/profile/orders'
                        }
                      >
                        {t('ORDERS', 'Orders')}
                      </TextInfo>
                    </MenuLinkText>
                    <MenuLinkSeparator>
                      <div>
                        <hr />
                      </div>
                    </MenuLinkSeparator>
                  </WrappContent>
                </MenuLink>
              )
            }
            {!hideProfile && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'profile' })}
                href='/profile'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/profile'
                    }
                  >
                    <FaRegAddressCard />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/profile'
                      }
                    >
                      {t('VIEW_ACCOUNT', 'View account')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {isWalletEnabled && !hideWallet && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'wallets' })}
                href='/wallets'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/wallets'
                    }
                  >
                    <BiWallet />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/wallets'
                      }
                    >
                      {t('WALLETS', 'Wallets')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {isPromotionsEnabled && !hidePromotions && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'promotions' })}
                href='/promotions'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/promotions'
                    }
                  >
                    <Tag />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/promotions'
                      }
                    >
                      {t('PROMOTIONS', 'Promotions')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {!hideMessages && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'messages' })}
                href='/messages'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/messages'
                    }
                  >
                    <BiMessageDetail />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/messages'
                      }
                    >
                      {t('MESSAGES', 'Messages')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {!hideHelp && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'help' })}
                href='/help'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/help'
                    }
                  >
                    <BiHelpCircle />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/help'
                      }
                    >
                      {t('HELP', 'help')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {!hideSession && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'sessions' })}
                href='/sessions'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/sessions'
                    }
                  >
                    <SiJsonwebtokens />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/sessions'
                      }
                    >
                      {t('SESSIONS', 'Sessions')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            {!hideFavorites && (
              <MenuLink
                onClick={(e) => handleGoToPage(e, { page: 'favorite' })}
                href='/favorite'
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={
                      window.location.pathname === '/favorite'
                    }
                  >
                    <Heart />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={
                        window.location.pathname === '/favorite'
                      }
                    >
                      {t('FAVORITES', 'Favorites')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
            <LogoutButton onCustomClick={() => actionSidebar(false)} />
          </>
        )}
        {!auth && (
          <>
            <MenuLink
              onClick={() => {
                handleOpenLoginSignUp('login')
                actionSidebar(false)
              }}
            >
              <WrappContent>
                <MenuLinkIcon
                  active={modalPageToShow === 'login'}
                >
                  <AiOutlineLogin />
                </MenuLinkIcon>
                <MenuLinkText>
                  <TextInfo
                    active={modalPageToShow === 'login'}
                  >
                    {t('SIGN_IN', 'Sign in')}
                  </TextInfo>
                </MenuLinkText>
                <MenuLinkSeparator>
                  <div>
                    <hr />
                  </div>
                </MenuLinkSeparator>
              </WrappContent>
            </MenuLink>
            {!isHideSignup && (
              <MenuLink
                onClick={() => {
                  handleOpenLoginSignUp('signup')
                  actionSidebar(false)
                }}
              >
                <WrappContent>
                  <MenuLinkIcon
                    active={modalPageToShow === 'signup'}
                  >
                    <AiOutlineUserAdd />
                  </MenuLinkIcon>
                  <MenuLinkText>
                    <TextInfo
                      active={modalPageToShow === 'signup'}
                    >
                      {t('SIGNUP', 'Sign up')}
                    </TextInfo>
                  </MenuLinkText>
                  <MenuLinkSeparator>
                    <div>
                      <hr />
                    </div>
                  </MenuLinkSeparator>
                </WrappContent>
              </MenuLink>
            )}
          </>
        )}
      </SidebarContent>
      {modalIsOpen && !auth && (
        <Modal
          open={modalIsOpen}
          onClose={() => closeModal()}
          width='50%'
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
              closeModal={() => closeModal()}
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
    </Container>
  )
}
