import React from 'react'
import { useTheme } from 'styled-components'
import BsArrowRight from '@meronex/icons/bs/BsArrowRight'
import {
  OrderTypeSelectorContainer,
  OrderTypeListItemContainer,
  OrderTypeTitle,
  OrderTypeDescription,
  OrderStartWrapper,
  OrderTypeListTitle,
  OrderTypeOverlay
} from './styles'

import { useLanguage, useOrder, OrderTypeControl } from '~components'

export const OrderTypeSelectorContentUI = (props) => {
  const {
    handleChangeOrderType,
    orderTypes,
    onClose,
    configTypes
  } = props

  const [, t] = useLanguage()
  const [orderStatus] = useOrder()
  const theme = useTheme()
  const handleClickOrderType = (orderType) => {
    onClose && onClose()
    handleChangeOrderType && handleChangeOrderType(orderType)
  }

  const titleOrdertype = theme?.order_types?.components?.title_menu
  const orderTypeImage = (type) => theme?.order_types?.components?.[type]?.components?.image
  const orderTypeTitle = (type) => theme?.order_types?.components?.[type]?.components?.title
  const orderTypeDescription = (type) => theme?.order_types?.components?.[type]?.components?.description
  const orderTypeCallAction = (type) => theme?.order_types?.components?.[type]?.components?.call_to_action
  return (
    <div className='order-type' style={{ overflow: 'hidden' }}>
      <OrderTypeSelectorContainer>
        <OrderTypeListTitle>{titleOrdertype || t('HOW_WILL_YOU_DELIVERY_TYPE', 'How will you delivery type?')}</OrderTypeListTitle>
        {
          orderTypes && (configTypes ? orderTypes.filter(type => configTypes?.includes(type.value)) : orderTypes).map((item, i) => (
            <OrderTypeListItemContainer
              key={i}
              bgimage={orderTypeImage(item?.text?.replace(/[^A-Z0-9]+/ig, '_')?.toLowerCase()) || item?.image}
              onClick={() => handleClickOrderType(item.value)}
              active={orderStatus?.options?.type === item?.value}
            >
              <OrderTypeTitle>{orderTypeTitle(item?.text?.replace(/[^A-Z0-9]+/ig, '_')?.toLowerCase()) || item.textDisplay}</OrderTypeTitle>
              <OrderTypeDescription>{orderTypeDescription(item?.text?.replace(/[^A-Z0-9]+/ig, '_')?.toLowerCase()) || item.description}</OrderTypeDescription>
              <OrderStartWrapper>
                <span>{orderTypeCallAction(item?.text?.replace(/[^A-Z0-9]+/ig, '_')?.toLowerCase()) || t('START_MY_ORDER', 'start my order')}</span>
                <BsArrowRight />
              </OrderStartWrapper>
              <OrderTypeOverlay />
            </OrderTypeListItemContainer>
          ))
        }
      </OrderTypeSelectorContainer>
    </div>
  )
}

export const OrderTypeSelectorContent = (props) => {
  const [, t] = useLanguage()
  const theme = useTheme()

  const orderTypeProps = {
    ...props,
    UIComponent: OrderTypeSelectorContentUI,
    orderTypes: props.orderTypes || [
      {
        value: 1,
        text: 'DELIVERY',
        textDisplay: t('DELIVERY', 'Delivery'),
        description: t('ORDERTYPE_DESCRIPTION_DELIVERY', 'Delivery description'),
        image: theme.images?.deliveryTypes?.delivery
      },
      {
        value: 2,
        text: 'PICKUP',
        textDisplay: t('PICKUP', 'Pickup'),
        description: t('ORDERTYPE_DESCRIPTION_PICKUP', 'Pickup description'),
        image: theme.images?.deliveryTypes?.pickUp
      },
      {
        value: 3,
        text: 'EAT_IN',
        textDisplay: t('EAT_IN', 'Eat in'),
        description: t('ORDERTYPE_DESCRIPTION_EATIN', 'Eat in description'),
        image: theme.images?.deliveryTypes?.eatIn
      },
      {
        value: 4,
        text: 'CURBSIDE',
        textDisplay: t('CURBSIDE', 'Curbside'),
        description: t('ORDERTYPE_DESCRIPTION_CURBSIDE', 'Curbside description'),
        image: theme.images?.deliveryTypes?.curbside
      },
      {
        value: 5,
        text: 'DRIVE_THRU',
        textDisplay: t('DRIVE_THRU', 'Drive thru'),
        description: t('ORDERTYPE_DESCRIPTION_DRIVETHRU', 'Drive Thru description'),
        image: theme.images?.deliveryTypes?.driveThru
      },
      {
        value: 7,
        text: 'CATERING_DELIVERY',
        textDisplay: t('CATERING_DELIVERY', 'Catering Delivery'),
        description: t('ORDERTYPE_DESCRIPTION_CATERING_DELIVERY', 'Catering Delivery description'),
        image: theme.images?.deliveryTypes?.cateringDelivery
      },
      {
        value: 8,
        text: 'CATERING_PICKUP',
        textDisplay: t('CATERING_PICKUP', 'Catering Pickup'),
        description: t('ORDERTYPE_DESCRIPTION_CATERING_PICKUP', 'Catering Pickup description'),
        image: theme.images?.deliveryTypes?.cateringPickup
      },
      {
        value: 9,
        text: 'RESERVATION',
        textDisplay: t('RESERVATION', 'Reservation'),
        description: t('ORDERTYPE_DESCRIPTION_RESERVATION', 'Reservation description'),
        image: theme.images?.deliveryTypes?.reservation
      }
    ]
  }

  return <OrderTypeControl {...orderTypeProps} />
}
