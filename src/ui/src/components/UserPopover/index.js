import React, { useRef, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { usePopper } from 'react-popper'
import AiOutlineMenu from '@meronex/icons/ai/AiOutlineMenu'
import FaUserAlt from '@meronex/icons/fa/FaUserAlt'
import {
  HeaderItem,
  PopoverBody,
  PopoverList,
  PopoverListItem,
  PopoverListLink,
  ExtraOptions,
  Divider,
  UserImgWrapper,
  RoundMark
} from './styles'

import { useLanguage, useSession, LogoutAction as LogoutActionController, useEvent, useCustomer, useConfig, useOrder } from '~components'
import { DropDownCircleImage } from '../Dropdown/style'
import { capitalize } from '~ui'

export const UserPopover = (props) => {
  const {
    open,
    isHome,
    optionsList,
    withLogout,
    isCustomerMode,
    handleOpenAddressModal
  } = props
  const [sessionState] = useSession()
  const [, t] = useLanguage()
  const [events] = useEvent()
  const [{ configs }] = useConfig()
  const [orderStatus] = useOrder()
  const theme = useTheme()
  const referenceElement = useRef()
  const popperElement = useRef()
  const arrowElement = useRef()

  const isWalletEnabled = configs?.cash_wallet?.value && configs?.wallet_enabled?.value === '1' && (configs?.wallet_cash_enabled?.value === '1' || configs?.wallet_credit_point_enabled?.value === '1')
  const isPromotionsEnabled = configs?.advanced_offers_module?.value === '1' || configs?.advanced_offers_module?.value === true
  const isAddressListNewPage = theme?.profile?.components?.address_list?.components?.layout?.position === 'new_page'
  const isProjectEnterpricePlan = configs?.plan_enterprise && configs?.plan_enterprise?.value

  const hideBrowse = theme?.bar_menu?.components?.browse?.hidden
  const hideOrders = theme?.bar_menu?.components?.orders?.hidden
  const hideProfile = theme?.bar_menu?.components?.profile?.hidden
  const hideWallet = theme?.bar_menu?.components?.wallet?.hidden
  const hideMessages = theme?.bar_menu?.components?.messages?.hidden
  const hideHelp = theme?.bar_menu?.components?.help?.hidden
  const hideFavorites = theme?.bar_menu?.components?.favorites?.hidden
  const hideSession = theme?.bar_menu?.components?.sessions?.hidden || !isProjectEnterpricePlan
  const hidePromotions = theme?.bar_menu?.components?.promotions?.hidden

  const optionsDefault = [
    { name: 'search', pathname: '/search', displayName: 'My home', key: 'my_home', isActive: true },
    { name: 'business_search', pathname: '/business_search', displayName: 'Browse & Search', key: 'browse_search', isActive: !hideBrowse },
    { name: 'orders', pathname: '/profile/orders', displayName: 'orders', key: 'orders', isActive: !hideOrders }
  ]

  const extraOptions = [
    { name: 'profile', pathname: '/profile', displayName: 'view account', key: 'view_account', isActive: !hideProfile },
    { name: 'wallets', pathname: '/wallets', displayName: 'wallets', key: 'wallets', isActive: !hideWallet && isWalletEnabled && !isCustomerMode },
    { name: 'promotions', pathname: '/promotions', displayName: 'promotions', key: 'promotions', isActive: !hidePromotions && isPromotionsEnabled },
    { name: 'messages', pathname: '/messages', displayName: 'messages', key: 'messages', isActive: !hideMessages && !isCustomerMode },
    { name: 'help', pathname: '/help', displayName: 'help', key: 'help', isActive: !hideHelp },
    { name: 'sessions', pathname: '/sessions', displayName: 'sessions', key: 'sessions', isActive: !hideSession },
    { name: 'favorite', pathname: '/favorite', displayName: 'favorites', key: 'favorites', isActive: !hideFavorites },
    { name: 'addresses', pathname: '/profile/addresses', displayName: 'places', key: 'places', isActive: isAddressListNewPage }
  ]

  const addressRequiredPageNames = ['business_search', 'promotions']

  const options = isCustomerMode
    ? optionsDefault.filter(option => option.name === 'profile')
    : optionsList || optionsDefault
  const popper = usePopper(referenceElement.current, popperElement.current, {
    placement: 'auto',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement.current } },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      }
    ]
  })

  const { styles, attributes } = popper

  useEffect(() => {
    // forceUpdate && forceUpdate()
  }, [open, sessionState])

  const handleClickOutside = (e) => {
    if (!open) return
    const outsidePopover = !popperElement.current?.contains(e.target)
    const outsidePopoverMenu = !referenceElement.current?.contains(e.target)
    if (outsidePopover && outsidePopoverMenu) {
      props.onClose && props.onClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      props.onClose && props.onClose()
    }
  }

  const handleGoToPage = (e, page) => {
    e.preventDefault()
    if (!orderStatus.options?.address?.location && addressRequiredPageNames.includes(page)) {
      handleOpenAddressModal()
    } else {
      events.emit('go_to_page', { page })
    }
    props.onClick && props.onClick()
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mouseup', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const popStyle = { ...styles.popper, visibility: open ? 'visible' : 'hidden', minWidth: '150px' }
  if (!open) {
    popStyle.transform = 'translate3d(0px, 0px, 0px)'
  }
  return (
    <div style={{ overflow: 'hidden' }}>
      <HeaderItem
        isPhoto={sessionState?.user?.photo}
        $isHome={isHome}
        ref={referenceElement}
        isOpen={open}
        onClick={props.onClick}
      >
        <AiOutlineMenu className='menu-list' />
        <UserImgWrapper>
          <RoundMark />
          <DropDownCircleImage
            src={sessionState?.user?.photo}
            fallback={<FaUserAlt />}
          />
        </UserImgWrapper>

      </HeaderItem>
      <PopoverBody ref={popperElement} style={popStyle} {...attributes.popper}>
        <PopoverList>
          {options && options.length > 0 && (
            options.filter(option => option.isActive).map((option, i) => (
              <PopoverListLink
                key={i}
                active={window.location.pathname === option.pathname}
                onClick={(e) => handleGoToPage(e, option.name)}
                href={!orderStatus.options?.address?.location && addressRequiredPageNames.includes(option.name) ? null : option.pathname}
              >
                {t((option.key || option.name).toUpperCase(), capitalize(option.displayName || option.name))}
              </PopoverListLink>
            ))
          )}
          <Divider />
          <ExtraOptions>
            {
              extraOptions && extraOptions.length > 0 && (
                extraOptions.map((option, i) => option.isActive && (
                  <PopoverListLink
                    key={i}
                    active={window.location.pathname === option.pathname}
                    onClick={(e) => handleGoToPage(e, option.name)}
                    href={option.pathname}
                  >
                    {t((option.key || option.name).toUpperCase(), capitalize(option.displayName || option.name))}
                  </PopoverListLink>
                ))
              )
            }

            <Divider />
            {withLogout && (
              <PopoverListItemLogout onClose={props.onClose} />
            )}
          </ExtraOptions>
        </PopoverList>
      </PopoverBody>
    </div>
  )
}

const LogoutActionUI = (props) => {
  const [, t] = useLanguage()
  const [events] = useEvent()
  const [, { deleteUserCustomer }] = useCustomer()

  const handleClick = () => {
    const GoogleAuth = window?.gapi?.auth2?.getAuthInstance()
    if (GoogleAuth) {
      const signedIn = GoogleAuth.isSignedIn.get()
      if (signedIn) {
        GoogleAuth.signOut().then(() => {
          GoogleAuth.disconnect()
        })
      }
    }

    deleteUserCustomer(true)
    props.handleLogoutClick()
    props.onClose && props.onClose()
    events.emit('go_to_page', { page: 'home' })
  }
  return (
    <PopoverListItem onClick={handleClick}>
      {t('LOGOUT', 'Logout')}
    </PopoverListItem>
  )
}

const PopoverListItemLogout = (props) => {
  const logoutActionProps = {
    UIComponent: LogoutActionUI,
    onClose: props.onClose
  }
  return (
    <LogoutActionController {...logoutActionProps} />
  )
}
