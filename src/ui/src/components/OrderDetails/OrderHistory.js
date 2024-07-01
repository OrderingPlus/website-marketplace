import React from 'react'
import { ArrowRight, CheckCircleFill } from 'react-bootstrap-icons'

import {
  OrderHistoryContainer,
  HistoryItemWrapper,
  DetailWrapper,
  ButtonWrapper
} from './styles'

import { useLanguage, useUtils, useConfig } from '~components'
import { formatSeconds, getTraduction, Button } from '~ui'

export const OrderHistory = (props) => {
  const {
    messages,
    order,
    handleOpenReview,
    onClose,
    enableReview
  } = props

  const [, t] = useLanguage()
  const [{ parseDate }] = useUtils()
  const [{ configs }] = useConfig()

  const excludedMessages = ['manual_driver_assignment_comment', 'driver_group_id', 'manual_driver_assignment_author_id']

  const getLogisticTagStatus = (status) => {
    switch (status) {
      case 0:
        return t('PENDING', 'Pending')
      case 1:
        return t('IN_PROGRESS', 'In Progress')
      case 2:
        return t('IN_QUEUE', 'In Queue')
      case 3:
        return t('EXPIRED', 'Logistic expired')
      case 4:
        return t('RESOLVED', 'Resolved')
      default:
        return status
    }
  }

  const handleReview = () => {
    onClose()
    setTimeout(() => {
      enableReview && handleOpenReview && handleOpenReview()
    }, 1)
  }

  const getStatus = (s) => {
    const status = parseInt(s)
    const statusMap = {
      0: 'ORDER_STATUS_PENDING',
      1: 'ORDERS_COMPLETED',
      2: 'ORDER_REJECTED',
      3: 'ORDER_STATUS_IN_BUSINESS',
      4: 'ORDER_READY',
      5: 'ORDER_REJECTED_RESTAURANT',
      6: 'ORDER_STATUS_CANCELLEDBYDRIVER',
      7: 'ORDER_STATUS_ACCEPTEDBYRESTAURANT',
      8: 'ORDER_CONFIRMED_ACCEPTED_BY_DRIVER',
      9: 'ORDER_PICKUP_COMPLETED_BY_DRIVER',
      10: 'ORDER_PICKUP_FAILED_BY_DRIVER',
      11: 'ORDER_DELIVERY_COMPLETED_BY_DRIVER',
      12: 'ORDER_DELIVERY_FAILED_BY_DRIVER',
      13: 'PREORDER',
      14: 'ORDER_NOT_READY',
      15: 'ORDER_PICKEDUP_COMPLETED_BY_CUSTOMER',
      16: 'ORDER_STATUS_CANCELLED_BY_CUSTOMER',
      17: 'ORDER_NOT_PICKEDUP_BY_CUSTOMER',
      18: 'ORDER_DRIVER_ALMOST_ARRIVED_BUSINESS',
      19: 'ORDER_DRIVER_ALMOST_ARRIVED_CUSTOMER',
      20: 'ORDER_CUSTOMER_ALMOST_ARRIVED_BUSINESS',
      21: 'ORDER_CUSTOMER_ARRIVED_BUSINESS',
      22: 'ORDER_LOOKING_FOR_DRIVER',
      23: 'ORDER_DRIVER_ON_WAY',
      24: 'ORDER_DRIVER_WAITING_FOR_ORDER',
      25: 'ORDER_ACCEPTED_BY_DRIVER_COMPANY',
      26: 'ORDER_DRIVER_ARRIVED_CUSTOMER'
    }
    return statusMap?.[status] ?? getTraduction(status)
  }

  return (
    <OrderHistoryContainer>
      {!messages?.loading && order && (
        <HistoryItemWrapper>
          <CheckCircleFill />
          <DetailWrapper>
            <h3>
              {t('ORDER_PLACED', 'Order placed')} {' '}
              {!props.hideViaText && (
                <>
                  {t('VIA', 'Via')}{' '}
                  {order.app_id ? t(order.app_id.toUpperCase(), order.app_id) : t('OTHER', 'Other')}
                </>
              )}
            </h3>
            <p>{parseDate(order.created_at, { outputFormat: `MMM DD, ${configs?.general_hour_format?.value}` })}</p>
          </DetailWrapper>
        </HistoryItemWrapper>
      )}
      {messages && messages?.messages.map((message, i) => (message.type === 1 && !excludedMessages.includes(message?.change?.attribute)) && (
        <HistoryItemWrapper
          key={i}
        >
          <CheckCircleFill />
          <DetailWrapper>
            {message.change?.attribute !== 'driver_id'
              ? <h3>
                  {message.change?.attribute === 'logistic_status'
                    ? getLogisticTagStatus(parseInt(message.change.new, 10))
                    : message.change?.attribute === 'delivered_in'
                      ? <h3>
                          <strong>{t('TIME_ADDED_BY_DRIVER', 'Time added by driver')}</strong><br />
                          {formatSeconds(parseInt(message.change.new, 10))}
                        </h3>
                      : message.change?.attribute === 'prepared_in'
                        ? <h3>
                            <strong>{t('TIME_ADDED_BY_BUSINESS', 'Time added by business')}</strong><br />
                            {formatSeconds(parseInt(message.change.new, 10))}
                          </h3>
                        : t(getStatus(message.change.new), getStatus(message.change.new).replace(/_/g, ' '))}
                </h3>
              : <h3>
                  {message.change.new
                    ? <>
                        <strong>{message.driver?.name} {' '} {message.driver?.lastname && message.driver.lastname} </strong>
                        {t('WAS_ASSIGNED_AS_DRIVER', 'Was assigned as driver')}
                      </>
                    : t('DRIVER_UNASSIGNED', 'Driver unassigned')}
                </h3>}
            <p>{parseDate(message.created_at, { outputFormat: `MMM DD, ${configs?.general_hour_format?.value}` })}</p>
          </DetailWrapper>
        </HistoryItemWrapper>
      ))}
      <ButtonWrapper>
        <Button
          onClick={handleReview}
          color='primary'
        >
          {enableReview ? t('REVIEW_ORDER', 'Review order') : t('CONTINUE', 'Continue')}
          <ArrowRight />
        </Button>
      </ButtonWrapper>
    </OrderHistoryContainer>
  )
}
