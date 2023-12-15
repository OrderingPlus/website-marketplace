import React, { useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import FaUserAlt from '@meronex/icons/fa/FaUserAlt'
import FaRegAddressCard from '@meronex/icons/fa/FaRegAddressCard'
import FaRegListAlt from '@meronex/icons/fa/FaRegListAlt'
import FaSignOutAlt from '@meronex/icons/fa/FaSignOutAlt'
import MdcMenuRightOutline from '@meronex/icons/mdc/MdcMenuRightOutline'
import BiHelpCircle from '@meronex/icons/bi/BiHelpCircle'

import { HeaderItem, PopoverBody, PopoverArrow, PopoverList, PopoverListItem, PopoverListLink } from './styles'

import { useLanguage, useSession, LogoutAction as LogoutActionController, useEvent, useCustomer } from '~components'

import { capitalize } from '~ui'
import { DropDownCircleImage } from '../../../Dropdown/style'

const IconOption = ({ value }) => {
  switch (value) {
    case 'profile':
      return <FaRegAddressCard />

    case 'orders':
      return <FaRegListAlt />

    case 'orders_manager':
      return <FaRegListAlt />

    case 'help':
      return <BiHelpCircle />

    default:
      return <MdcMenuRightOutline />
  }
}

export const UserPopover = (props) => {
  const {
    open,
    isHome,
    optionsList,
    withLogout,
    isCustomerMode,
    isLinkedToAdmin
  } = props
  const [sessionState] = useSession()
  const [, t] = useLanguage()
  const [events] = useEvent()
  const referenceElement = useRef()
  const popperElement = useRef()
  const arrowElement = useRef()

  const optionsDefault = [
    { name: 'profile', pathname: '/profile' },
    { name: 'orders', pathname: '/profile/orders' },
    { name: 'help', pathname: '/help' },
    { name: 'orders_manager', link: t('REACT_ORDERS_MANAGER_URL', 'https://new-admin.ordering.co/orders') }
  ]

  const options = isCustomerMode
    ? optionsDefault.filter(option => option.name === 'profile' || (option.name === 'orders_manager' && isLinkedToAdmin))
    : optionsList || optionsDefault.filter(option => option.pathname)

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

  const handleGoToPage = (page, link) => {
    if (link) {
      window.open(link, '_blank').focus()
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
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <HeaderItem
        isPhoto={sessionState?.user?.photo}
        isHome={isHome}
        ref={referenceElement}
        onClick={props.onClick}
      >
        <DropDownCircleImage
          src={sessionState?.user?.photo}
          fallback={<FaUserAlt />}
        />
      </HeaderItem>
      <PopoverBody ref={popperElement} style={popStyle} {...attributes.popper}>
        <PopoverList>
          {options && options.length > 0 && (
            options.map(option => (
              <PopoverListLink
                key={option.name}
                active={window.location.pathname === option.pathname}
                onClick={() => handleGoToPage(option.name, option.link)}
              >
                <IconOption value={option.name} /> {t(option.name.toUpperCase(), capitalize(option.name))}
              </PopoverListLink>
            ))
          )}
          {withLogout && (
            <PopoverListItemLogout onClose={props.onClose} />
          )}
        </PopoverList>
        <PopoverArrow key='arrow' ref={arrowElement} style={styles.arrow} />
      </PopoverBody>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </div>
  )
}

const LogoutActionUI = (props) => {
  const [, t] = useLanguage()
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
  }
  return (
    <PopoverListItem onClick={handleClick}>
      <FaSignOutAlt /> {t('LOGOUT', 'Logout')}
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