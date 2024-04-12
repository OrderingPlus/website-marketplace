import React, { useState } from 'react'

import {
  AddressContainer,
  Map,
  Text,
  WrappMap
} from './styles'

import { AddressDetails as AddressDetailsController, useOrder, useLanguage } from '~components'
import { Alert } from '~ui'

const AddressDetailsUI = (props) => {
  const {
    addressToShow,
    isCartPending,
    googleMapsUrl,
    apiKey,
    handleOpenAddressList
  } = props

  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  return (
    <AddressContainer>
      {apiKey && (
          <WrappMap>
            <Map>
              <img src={googleMapsUrl} id='google-maps-image' alt='google-maps-location' width='288px' height='162px' loading='lazy' />
            </Map>
          </WrappMap>
      )}
        <Text>
          <h1>{addressToShow || orderState?.options?.address?.address}</h1>
          {orderState?.options?.type === 1 && !isCartPending &&
            <span onClick={() => handleOpenAddressList(true)}>{t('CHANGE_ADDRESS', 'Change address')}</span>}
        </Text>

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
