import React, { useEffect } from 'react'
import MdClose from '@meronex/icons/md/MdClose'
import {
  ModalDialog,
  ModalActions,
  ModalTitle,
  ModalIcon,
  ModalHeader,
  ModalBackHeader,
  ModalIconWrapper
} from './styles'

import { Popup, useLanguage } from '~components'
import { Button } from '~ui'

const ModalUI = (props) => {
  const {
    title,
    children,
    onAccept,
    onCancel,
    onClose,
    acceptText,
    cancelText,
    isTransparent,
    hideCloseDefault,
    isProductForm,
    authModal,
    onRemove,
    isSlideBar,
    slideBarPosition,
    disableOverflowX
  } = props
  const [, t] = useLanguage()

  const handleKeyDown = (e) => {
    if (e.keyCode === 27 && props.open) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    const bodyPaddingRight = window.document.body.style.paddingRight
    document.body.style.paddingRight = props.open ? `${bodyPaddingRight + scrollbarWidth}px` : `${bodyPaddingRight}px`
    document.body.style.overflow = props.open ? 'hidden' : 'auto'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.removeAttribute('style')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ModalDialog
      className='popup-dialog'
      width={props.width}
      height={props.height}
      padding={props.padding}
      isTransparent={isTransparent}
      isSlideBar={isSlideBar}
      slideBarPosition={slideBarPosition}
      open={props.open}
      disableOverflowX={disableOverflowX}
      style={props.customStyle}
    >
      {isProductForm && (
        <ModalBackHeader />
      )}
      {!hideCloseDefault && (
        <ModalIconWrapper>
          <ModalIcon isProductForm={isProductForm}>
            {
              (authModal && onRemove) ? <MdClose onClick={() => onRemove()} /> : <MdClose onClick={() => onClose()} />
            }
          </ModalIcon>
        </ModalIconWrapper>
      )}
      <ModalHeader>
        {title && (
          <ModalTitle>
            {title}
          </ModalTitle>
        )}
      </ModalHeader>
      {children}
      {(onCancel || onAccept) && (
        <ModalActions>
          {onCancel && <Button outline onClick={() => onCancel()}>{cancelText || t('CANCEL', 'Cancel')}</Button>}
          {onAccept && <Button color='primary' onClick={() => onAccept()}>{acceptText || t('ACCEPT', 'Accept')}</Button>}
        </ModalActions>)}
    </ModalDialog>
  )
}

export const Modal = (props) => {
  const ModalProps = {
    ...props,
    disableDefaultStyleOnRender: true,
    UIComponent: ModalUI
  }

  return (
    <Popup {...ModalProps} />
  )
}

export default Modal
