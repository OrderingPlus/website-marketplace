import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from 'styled-components'
import BsArrowRight from '@meronex/icons/bs/BsArrowRight'
import {
  OrderProgressContainer,
  OrderInfoWrapper,
  ProgressLogo,
  ProgressDescriptionWrapper,
  ProgressBarWrapper,
  ProgressContentWrapper,
  ProgressBar,
  ProgressTextWrapper,
  StatusWrapper,
  TimeWrapper,
  OrderProgressWrapper
} from './styles'

import {
  useLanguage,
  useUtils,
  useEvent,
  useConfig,
  OrderList as OrderListController
} from '~components'

import { OrderEta } from '../OrderDetails/OrderEta'
import { Button, generalUtilities } from '~ui'

const OrderProgressUI = (props) => {
  const { orderList } = props

  const [, t] = useLanguage()
  const [{ optimizeImage, parseTime, parseDate }] = useUtils()
  const [{ configs }] = useConfig()
  const theme = useTheme()
  const [events] = useEvent()
  const { getStatusPrefix } = generalUtilities()
  const statusToShow = [0, 3, 4, 7, 8, 9, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26]
  const deliveryTypes = [1, 7]

  const lastOrder = orderList.orders?.length ? orderList.orders?.find(order => !!order.business_id) : null
  const isPickup = lastOrder?.delivery_type && lastOrder?.delivery_type === 2

  const handleGoToPage = (index) => events.emit('go_to_page', { page: index })

  return (
    <>
      {orderList?.loading && (
        <OrderProgressWrapper>
          <Skeleton height={150} />
        </OrderProgressWrapper>
      )}
      {!orderList?.loading && lastOrder && (
        <OrderProgressWrapper>
          <OrderProgressContainer>
            <OrderInfoWrapper>
              <ProgressLogo
                bgimage={orderList?.orders.length === 1
                  ? optimizeImage(lastOrder?.business?.logo || theme.images?.dummies?.businessLogo, 'h_91,c_limit')
                  : theme.images.logos.logotype}
              />
              <ProgressDescriptionWrapper>
                <h2>{statusToShow.includes(lastOrder?.status) ? t('ORDER_IN_PROGRESS', 'Order in progress') : t('ORDER', 'Order')}</h2>
                {statusToShow.includes(lastOrder?.status) && (
                  <p>{t('RESTAURANT_PREPARING_YOUR_ORDER', 'The restaurant is preparing your order')}</p>
                )}
                <Button
                  color='primaryContrast'
                  naked
                  onClick={() => handleGoToPage('orders')}
                >
                  {t('GO_TO_MY_ORDERS', 'Go to my orders')}
                  <BsArrowRight />
                </Button>
              </ProgressDescriptionWrapper>
            </OrderInfoWrapper>
            <ProgressBarWrapper>
              <ProgressContentWrapper>
                <ProgressBar
                  style={{
                    width: getStatusPrefix({ status: lastOrder.status, isPickup })?.percentage
                      ? `${getStatusPrefix({ status: lastOrder.status, isPickup }).percentage}%`
                      : 0
                  }}
                />
              </ProgressContentWrapper>
              <ProgressTextWrapper>
                <StatusWrapper>{getStatusPrefix({ status: lastOrder?.status, isPickup })?.value}</StatusWrapper>
                <TimeWrapper>
                  <span>{deliveryTypes?.includes(lastOrder?.delivery_type) ? t('ESTIMATED_DELIVERY', 'Estimated delivery') : t('ESTIMATED_TIME', 'Estimated time')}:&nbsp;</span>
                  <span>
                    {lastOrder?.delivery_datetime_utc
                      ? parseTime(lastOrder?.delivery_datetime_utc, { outputFormat: configs?.general_hour_format?.value || 'HH:mm' })
                      : parseTime(lastOrder?.delivery_datetime, { utc: false })}
                    &nbsp;-&nbsp;
                    {statusToShow.includes(lastOrder?.status)
                      ? <OrderEta order={lastOrder} outputFormat={configs?.general_hour_format?.value || 'HH:mm'} />
                      : parseDate(lastOrder?.reporting_data?.at[`status:${lastOrder.status}`], { outputFormat: configs?.general_hour_format?.value })}
                  </span>
                </TimeWrapper>
              </ProgressTextWrapper>
            </ProgressBarWrapper>
          </OrderProgressContainer>
        </OrderProgressWrapper>
      )}
    </>

  )
}

export const OrderProgress = (props) => {
  const propsToFetchBusiness = ['name', 'logo', 'slug', 'id']
  const propsToFetch = ['cart', 'business', 'status', 'id', 'uuid', 'cart_group_id', 'business_id', 'delivery_datetime', 'delivery_datetime_utc', 'total', 'summary', 'eta_current_status_time', 'eta_previous_status_times', 'eta_time', 'delivered_in', 'prepared_in', 'eta_drive_time']
  const orderProgressProps = {
    ...props,
    UIComponent: OrderProgressUI,
    orderStatus: [0, 3, 4, 7, 8, 9, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    useDefualtSessionManager: true,
    noGiftCardOrders: true,
    propsToFetchBusiness,
    propsToFetch,
    paginationSettings: {
      initialPage: 1,
      pageSize: props.isCustomerMode ? 1 : 10,
      controlType: 'infinity'
    }
  }
  return <OrderListController {...orderProgressProps} />
}
