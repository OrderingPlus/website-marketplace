import React from 'react'
import { useTheme } from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BsDot from '@meronex/icons/bs/BsDot'

import {
  CardContainer,
  CardLogo,
  CardInfo
} from './styles'

import { useLanguage, useUtils, useEvent } from '~components'

export const SingleGiftCard = (props) => {
  const {
    card,
    isSkeleton
  } = props

  const theme = useTheme()
  const [, t] = useLanguage()
  const [events] = useEvent()
  const [{ parsePrice, optimizeImage, parseDate }] = useUtils()

  const getGiftCardStatus = (status) => {
    switch (status) {
      case 'pending':
        return t('PENDING', 'Pending')
      case 'activated':
        return t('REDEEMED')
      default:
        return status
    }
  }

  const handleClickGiftCardOrder = (card) => {
    events.emit('go_to_page', { page: 'order_detail', params: { orderId: card.order_product?.order_id } })
  }

  return (
    <CardContainer
      className='product-card'
      onClick={() => handleClickGiftCardOrder(card)}
    >
      {isSkeleton
        ? <Skeleton height={86} width={86} />
        : <CardLogo
            bgimage={optimizeImage(card?.order_product?.images || theme?.images?.dummies?.product, 'h_86,c_limit')}
          />}
      <CardInfo>
        <div>
          {isSkeleton
            ? <Skeleton height={16} width={100} />
            : <span className='name'>{card?.order_product?.name}</span>}
        </div>
        {isSkeleton
          ? <Skeleton height={16} width={80} />
          : <span>{parsePrice(card?.order_product?.price)}</span>}
        {isSkeleton
          ? <p className='date'><Skeleton width={150} height={14} /></p>
          : <p className='date'>
              {t('ORDER_NUM', 'Order No.')} {card?.order_product?.order_id}<BsDot />{parseDate(card?.created_at)}
            </p>}
        {isSkeleton
          ? <p className='status'><Skeleton width={80} height={14} /></p>
          : <p className='status'>{getGiftCardStatus(card?.status)}</p>}
      </CardInfo>
    </CardContainer>
  )
}
