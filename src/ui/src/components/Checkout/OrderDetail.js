import React from 'react'

import { OrderDetailContainer, WrapperPlaceOrderButton } from './styles'

import { useLanguage } from '~components'
import { OrderBillSection, ProductItemAccordion, Button } from '~ui'

export const OrderDetail = (props) => {
  const {
    item,
    placingOrder,
    orderType,
    customerAddress,
    onClick
  } = props

  const [, t] = useLanguage()
  const orderTypeList = [t('DELIVERY', 'Delivery'), t('PICKUP', 'Pickup'), t('EAT_IN', 'Eat in'), t('CURBSIDE', 'Curbside'), t('DRIVE_THRU', 'Drive thru')]

  return (
    <OrderDetailContainer>
      <h3>{customerAddress}</h3>
      <h3>
        {(orderTypeList[orderType - 1]) || t('DELIVERY', 'Delivery')}
      </h3>
      <div>
        {item?.products.filter(product => !product?.calendar_event).map(product => (
          <ProductItemAccordion
            key={product.id}
            product={product}
            isCartProduct
            showArrowIcon
            isDisabledEdit
            toppingsRemoved={item?.toppings_removed?.[product?.code]}
          />
        ))}
      </div>
      <OrderBillSection order={item} />
      <WrapperPlaceOrderButton>
        <Button
          color='primary'
          disabled={placingOrder}
          onClick={() => onClick()}
        >
          {placingOrder ? t('PLACING', 'Placing') : t('PLACE_ORDER', 'Place Order')}
        </Button>
      </WrapperPlaceOrderButton>
    </OrderDetailContainer>
  )
}
