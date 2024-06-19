import React, { useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import FaRegClock from '@meronex/icons/fa/FaRegClock'
import BsChevronDown from '@meronex/icons/bs/BsChevronDown'

import { HeaderItem, PopoverBody, PopoverArrow } from './styles'

import { useOrder, useLanguage, useUtils, useConfig } from '~components'
import { MomentContent } from '~ui'

export const MomentPopover = (props) => {
  const { open, isBanner, customView } = props
  const [{ configs }] = useConfig()
  const [orderStatus] = useOrder()
  const [, t] = useLanguage()
  const [{ parseDate }] = useUtils()
  const referenceElement = useRef()
  const popperElement = useRef()
  const arrowElement = useRef()

  const modifiers = [
    { name: 'arrow', options: { element: arrowElement.current } },
    {
      name: 'offset',
      options: {
        offset: [0, isBanner ? 15 : 12]
      }
    }
  ]
  if (isBanner) {
    modifiers.push({
      name: 'computeStyles',
      options: {
        gpuAcceleration: false
      }
    })
  }
  const popper = usePopper(referenceElement.current, popperElement.current, {
    placement: isBanner ? 'bottom' : 'auto',
    modifiers
  })

  const { styles, attributes } = popper

  const handleClickOutside = (e) => {
    if (!open) return
    const outsidePopover = !popperElement.current?.contains(e.target)
    const outsidePopoverMenu = !referenceElement.current?.contains(e.target)
    const outsideModal = !window.document.getElementById('app-modals') || !window.document.getElementById('app-modals').contains(e.target)
    if (outsidePopover && outsidePopoverMenu && outsideModal) {
      props.onClose && props.onClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      props.onClose && props.onClose()
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mouseup', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const popStyle = {
    ...styles.popper,
    visibility: open ? 'visible' : 'hidden',
    width: `${isBanner ? '80vw' : '450px'} `,
    maxHeight: '70vh',
    overflowY: 'auto',
    transform: `${isBanner ? 'translateX(-5vw)' : ''}`
  }
  if (!open) {
    popStyle.transform = 'translate3d(0px, 0px, 0px)'
  }

  return (
    <div className='moment-popover' style={{ overflow: 'hidden' }}>
      <HeaderItem
        ref={referenceElement}
        onClick={configs?.max_days_preorder?.value === -1 || configs?.max_days_preorder?.value === 0 ? null : props.onClick}
        $isHome={props.isHome}
        $isBanner={isBanner}
        $customView={customView}
      >
        <FaRegClock />
        {orderStatus.options?.moment
          ? parseDate(orderStatus.options?.moment, { outputFormat: configs?.dates_moment_format?.value })
          : t('ASAP_ABBREVIATION', 'ASAP')}
        {isBanner && <BsChevronDown />}
      </HeaderItem>
      <PopoverBody ref={popperElement} style={popStyle} {...attributes.popper} $customView={customView}>
        <MomentContent />
        <PopoverArrow key='arrow' ref={arrowElement} style={styles.arrow} />
      </PopoverBody>
    </div>
  )
}
