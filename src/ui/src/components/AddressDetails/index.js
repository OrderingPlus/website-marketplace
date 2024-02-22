import React, { useState, useEffect } from 'react'

import {
  AddressContainer,
  Header,
  Map,
  Text,
  ToggleMap,
  WrappMap
} from './styles'

import { AddressDetails as AddressDetailsController, useOrder, useLanguage, useCustomer } from '~components'
import { Modal, Alert, AddressList } from '~ui'

const AddressDetailsUI = (props) => {
  const {
    addressToShow,
    isCartPending,
    googleMapsUrl,
    isCustomerMode,
    apiKey,
    isFromCheckout
  } = props

  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const [openModal, setOpenModal] = useState(false)
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [isShowMap, setIsShowMap] = useState(false)
  const userCustomer = JSON.parse(window.localStorage.getItem('user-customer'))
  const [{ user }] = useCustomer()

  useEffect(() => {
    return () => setOpenModal(false)
  }, [])

  return (
    <AddressContainer>
      <Header>
        <Text>
          <h1>{addressToShow || orderState?.options?.address?.address}</h1>
          {orderState?.options?.type === 1 && !isCartPending &&
            <span onClick={() => setOpenModal(true)}>{t('CHANGE_ADDRESS', 'Change address')}</span>}
        </Text>
      </Header>
      {apiKey && (
        <>
          {!isShowMap && (
            <ToggleMap>
              <Text>
                <span onClick={() => setIsShowMap(!isShowMap)}>{t('SHOW_MAP', 'Show map')}</span>
              </Text>
            </ToggleMap>
          )}
          {isShowMap && (
            <WrappMap>
              <Map>
                <img src={googleMapsUrl} id='google-maps-image' alt='google-maps-location' width='288px' height='162px' loading='lazy' />
              </Map>
            </WrappMap>
          )}
        </>
      )}

      <Modal
        open={openModal}
        width='70%'
        onClose={() => setOpenModal(false)}
      >
        <AddressList
          isModal
          changeOrderAddressWithDefault
          userId={isNaN(userCustomer?.id) ? null : userCustomer?.id}
          onCancel={() => setOpenModal(false)}
          userCustomerSetup={isCustomerMode && user}
          isFromCheckout={isFromCheckout}
          isCustomerMode={isCustomerMode}
        />
      </Modal>

      <Alert
        title={t('SEARCH', 'Search')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
    </AddressContainer>
  )
}

export const AddressDetails = (props) => {
  const addressDetailsProps = {
    ...props,
    UIComponent: AddressDetailsUI
  }
  return (
    <AddressDetailsController {...addressDetailsProps} />
  )
}
