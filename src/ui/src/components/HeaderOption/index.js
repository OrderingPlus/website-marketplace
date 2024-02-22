import React from 'react'
import { useTheme } from 'styled-components'
import AiOutlineShoppingCart from '@meronex/icons/ai/AiOutlineShoppingCart'
import FaMapMarkerAlt from '@meronex/icons/fa/FaMapMarkerAlt'

import { Container, DeliveryType } from './styles'

import { useUtils, useLanguage, useConfig, useOrder } from '~components'

export const HeaderOption = (props) => {
  const {
    variant,
    addressState,
    momentState,
    totalCarts,
    orderTypeList
  } = props

  const [{ configs }] = useConfig()
  const [{ parseDate }] = useUtils()
  const [, t] = useLanguage()
  const [orderStatus] = useOrder()
  const theme = useTheme()
  const isChew = theme?.header?.components?.layout?.type?.toLowerCase() === 'chew'

  return (
    <Container
      variant={variant}
      isChew={isChew}
      onClick={() => props.onClick(variant)}
      isHome={props.isHome}
      style={props.containerStyle}
    >
      {variant === 'cart' && (
        <span>
          <AiOutlineShoppingCart id='icon' />
          {totalCarts > 0 && <span>{totalCarts}</span>}
        </span>
      )}
      {variant === 'address' && (
        <span>
          <FaMapMarkerAlt id='icon' />
          {addressState || t('WHAT_IS_YOUR_ADDRESS', 'What\'s your address?')}
        </span>
      )}
      {variant === 'moment' && (
        <>
          {momentState
            ? parseDate(momentState, { outputFormat: configs?.dates_moment_format?.value })
            : t('ASAP_ABBREVIATION', 'ASAP')}
        </>
      )}
      {
        variant === 'delivery' && (
          <DeliveryType isChew={isChew}>
            {(orderTypeList && orderTypeList[orderStatus?.options.type - 1]) || t('DELIVERY', 'Delivery')}
          </DeliveryType>
        )
      }
    </Container>
  )
}
