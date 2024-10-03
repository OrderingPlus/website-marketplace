import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useParams } from 'react-router-dom'
import { HelmetTags } from '../../components/HelmetTags'

import { useEvent, useLanguage, useOrder } from '~components'
import { MultiCheckout as MultiCheckoutController } from '~ui'

export const MultiCheckout = (props) => {
  const [events] = useEvent()
  const { cartUuid } = useParams()
  const [, { confirmMultiCarts }] = useOrder()
  const [, t] = useLanguage()
  const stripePayments = ['stripe', 'stripe_connect', 'google_pay', 'apple_pay']
  const [errors, setErrors] = useState([])

  const actionsBeforePlace = async (paymethod, cart) => {
    if (stripePayments.includes(paymethod.gateway)) {
      try {
        const stripe = await loadStripe(paymethod.paymethod?.credentials?.publishable || paymethod?.paymethod?.credentials?.publishable_key)
        const result = await stripe.confirmCardPayment(cart.paymethod_data.result.client_secret)
        if (result?.paymentIntent?.status === 'succeeded') {
          try {
            const confirmCartRes = await confirmMultiCarts(cartUuid)
            if (confirmCartRes.error) {
              setErrors([confirmCartRes.error.message])
            }
            if (confirmCartRes.result.order?.uuid) {
              events.emit('go_to_page', { page: 'multi_orders', params: { orderId: confirmCartRes.result.order.uuid }, replace: true })
            }
          } catch (error) {
            setErrors([error.message])
          }
        }
        if (result?.error?.code === 'payment_intent_authentication_failure') {
          setErrors([t('CART_STATUS_CANCEL_MESSAGE', 'The payment has not been successful, please try again')])
        }
        return true
      } catch (error) {
        setErrors([error.message])
      }
    }
  }
  const multiCheckoutProps = {
    ...props,
    cartUuid,
    errors,
    clearErrors: () => setErrors([]),
    handleSearchRedirect: () => {
      events.emit('go_to_page', { page: 'search' })
    },
    onRedirectPage: (data) => events.emit('go_to_page', data),
    onPlaceOrderClick: (order) => {
      events.emit('go_to_page', { page: 'multi_orders', params: { orderId: order?.id } })
    },
    actionsBeforePlace
  }

  return (
    <>
      <HelmetTags page='multi_checkout' />
      <MultiCheckoutController {...multiCheckoutProps} />
    </>
  )
}

export default MultiCheckout
