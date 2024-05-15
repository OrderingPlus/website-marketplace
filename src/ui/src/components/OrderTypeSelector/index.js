import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import {
  ArrowContainer,
  OrderTypeSelectorContainer,
  OrderTypesButtonsContainer,
  OrderTypesContainer
} from './styles'

import { useLanguage, useOrder, OrderTypeControl, useSession } from '~components'
import Button from '../../styles/Buttons'
import { AdvancedAddressForm } from '../AdvancedAddressForm'
import { ArrowLeft } from 'react-bootstrap-icons'

export const OrderTypeSelectorUI = (props) => {
  const {
    handleChangeOrderType,
    orderTypes,
    typeSelected,
    setOrderTypeValue,
    onBusinessClick,
    propsToFetch
  } = props

  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [{ user }] = useSession()
  const theme = useTheme()
  const [openSpreadForm, setOpenSpreadForm] = useState(false)
  const [openBusinessList, setOpenBusinessList] = useState(false)

  const handleChangeOrderTypeCallback = async (orderType) => {
    if (!orderState.loading) {
      setOrderTypeValue && setOrderTypeValue(orderType)
      await handleChangeOrderType(orderType)
    }
  }

  return (
    <OrderTypesContainer
      className='order-type'
      style={{ overflow: 'hidden' }}
      openBusinessList={openBusinessList}
    >
      <OrderTypesButtonsContainer>
        {openSpreadForm && !openBusinessList && (
          <ArrowContainer onClick={() => setOpenSpreadForm(false)}>
            <ArrowLeft />
            <p>{t('GO_BACK', 'Go back')}</p>
          </ArrowContainer>
        )}
        <h2>
          {t('SELECT_YOUR_STORE', 'Select your store')}
        </h2>
        <h3>
          {t('HOW_YOU_PREFER_GET_PIZZA', 'How do you prefer get your pizza?')}
        </h3>
        <OrderTypeSelectorContainer $typeSelected={typeSelected}>
          <Button
            initialIcon
            onClick={() => handleChangeOrderTypeCallback(orderTypes[0]?.value)}
            className={typeSelected === orderTypes[0]?.value ? 'selected' : ''}
          >
            <img
              src={theme?.images?.general?.deliveryIcon}
            />
            <p>{t(orderTypes[0]?.text)}</p>
          </Button>
          <Button
            initialIcon
            onClick={() => handleChangeOrderTypeCallback(orderTypes[1]?.value)}
            className={typeSelected === orderTypes[1]?.value ? 'selected' : ''}
          >
            <img
              src={theme?.images?.general?.pickupIcon}
            />
            <p>{t(orderTypes[1]?.text)}</p>
          </Button>
        </OrderTypeSelectorContainer>
      </OrderTypesButtonsContainer>
      <AdvancedAddressForm
        propsToFetch={propsToFetch}
        isSelectedAfterAdd
        userId={user?.id}
        addressId={orderState?.options?.address?.id}
        onBusinessClick={onBusinessClick}
        openSpreadForm={openSpreadForm}
        setOpenSpreadForm={setOpenSpreadForm}
        openBusinessList={openBusinessList}
        setOpenBusinessList={setOpenBusinessList}
      />
    </OrderTypesContainer>
  )
}

export const OrderTypeSelector = (props) => {
  const [, t] = useLanguage()
  const theme = useTheme()

  const orderTypeProps = {
    ...props,
    UIComponent: OrderTypeSelectorUI,
    orderTypes: props.orderTypes || [
      {
        value: 1,
        text: t('DELIVERY', 'Delivery'),
        description: t('ORDERTYPE_DESCRIPTION_DELIVERY', 'Delivery description'),
        image: theme.images?.deliveryTypes?.delivery
      },
      {
        value: 2,
        text: t('PICKUP', 'Pickup'),
        description: t('ORDERTYPE_DESCRIPTION_PICKUP', 'Pickup description'),
        image: theme.images?.deliveryTypes?.pickUp
      }
    ]
  }

  return <OrderTypeControl {...orderTypeProps} />
}
