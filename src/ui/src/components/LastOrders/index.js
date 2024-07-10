import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from 'styled-components'

import {
  LastOrdersContainer,
  OrderInfoBlock,
  BusinessHeader
} from './styles'

import {
  useLanguage,
  useUtils,
  useEvent,
  OrderList as OrderListController
} from '~components'

export const LastOrdersUI = (props) => {
  const {
    orderList
  } = props

  const [, t] = useLanguage()
  const theme = useTheme()
  const [events] = useEvent()
  const [{ optimizeImage, parseDate }] = useUtils()

  const handleClickOrder = (uuid) => {
    events.emit('go_to_page', { page: 'order_detail', params: { orderId: uuid } })
  }

  return (
    <>
      {!orderList?.loading && orderList?.orders?.length > 0 && (
        <>
          <h2>{t('LAST_ORDER', 'Last order')}</h2>
          <LastOrdersContainer>
            {orderList?.loading && <Skeleton height={150} />}
            {!orderList?.loading && orderList?.orders?.length > 0 && orderList?.orders.map((order, i) => (
              <BusinessHeader key={i} bgimage={optimizeImage(order?.business?.header || theme.images?.dummies?.businessLogo, 'h_400,c_limit')}>
                <OrderInfoBlock onClick={() => handleClickOrder(order?.uuid)}>
                  {order?.business?.name && (
                    <h4>{order?.business?.name}</h4>
                  )}
                  {(order?.delivery_datetime_utc || order?.delivery_datetime) && (
                    <p>
                      <span>{t('TUTORIAL_ORDER_COMPLETED', 'Order Completed')} {('ON', 'on')} </span>
                      {order?.delivery_datetime_utc
                        ? parseDate(order?.delivery_datetime_utc)
                        : parseDate(order?.delivery_datetime, { utc: false })}
                    </p>
                  )}
                </OrderInfoBlock>
              </BusinessHeader>
            ))}
          </LastOrdersContainer>
        </>
      )}
    </>
  )
}

export const LastOrders = (props) => {
  const lastOrdersProps = {
    ...props,
    UIComponent: LastOrdersUI,
    orderStatus: [1, 11, 15],
    useDefualtSessionManager: true,
    paginationSettings: {
      initialPage: 1,
      pageSize: 1,
      controlType: 'infinity'
    },
    noGiftCardOrders: true
  }
  return <OrderListController {...lastOrdersProps} />
}
