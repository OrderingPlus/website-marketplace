import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useParams, useLocation } from 'react-router-dom'

import settings from '../../config'
import { HelmetTags } from '../../components/HelmetTags'

import { useEvent, useOrder, useLanguage, useSite } from '~components'
import { checkSiteUrl, Checkout } from '~ui'

export const CheckoutPage = (props) => {
  const { cartUuid } = useParams()
  const [events] = useEvent()
  const [errors, setErrors] = useState([])
  const [orderState, { confirmCart, changeMoment }] = useOrder()
  const [, t] = useLanguage()
  const [{ site }] = useSite()
  const theme = useTheme()
  const websiteThemeType = theme?.my_products?.components?.website_theme?.components?.type
  const websiteThemeBusinessSlug = theme?.my_products?.components?.website_theme?.components?.business_slug
  const updatedBusinessSlug = (websiteThemeType === 'single_store' && websiteThemeBusinessSlug) || settings?.businessSlug

  const stripePayments = ['stripe', 'stripe_connect', 'google_pay', 'apple_pay']
  const businessUrlTemplate = checkSiteUrl(site?.business_url_template, '/store/:business_slug')

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const actionsBeforePlace = async (paymethod, cart) => {
    if (stripePayments.includes(paymethod.gateway)) {
      try {
        const stripe = await loadStripe(paymethod.paymethod?.credentials?.publishable || paymethod?.paymethod?.credentials?.publishable_key)
        const result = await stripe.confirmCardPayment(cart.paymethod_data.result.client_secret)
        if (result?.paymentIntent?.status === 'succeeded') {
          try {
            const confirmCartRes = await confirmCart(cartUuid)
            if (confirmCartRes.error) {
              setErrors([confirmCartRes.error.message])
            }
            if (confirmCartRes.result.order?.uuid) {
              events.emit('go_to_page', { page: 'order_detail', params: { orderId: confirmCartRes.result.order.uuid }, replace: true })
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
    } else if (paymethod.gateway === 'stripe_checkout') {
      window.location.replace(cart?.paymethod_data.result?.redirect_url)
    }
  }

  const checkoutProps = {
    ...props,
    cartUuid,
    actionsBeforePlace,
    query: useQuery(),
    errors,
    clearErrors: () => setErrors([]),
    useValidationFields: true,
    validationFieldsType: 'checkout',
    useKioskApp: settings?.use_kiosk,
    businessSlug: updatedBusinessSlug,
    returnUrl: `${window.location.origin}/checkout/${cartUuid}`,
    onPlaceOrderClick: (data, paymethod, cart) => {
      if (cart?.order?.uuid) {
        if (orderState?.options?.moment) {
          changeMoment(null)
        }
        events.emit('go_to_page', { page: 'order_detail', params: { orderId: cart.order?.uuid }, replace: true })
      }
    },
    handleOrderRedirect: (uuid) => {
      events.emit('go_to_page', { page: 'order_detail', params: { orderId: uuid }, replace: true })
    },
    handleCheckoutRedirect: (uuid) => {
      events.emit('go_to_page', { page: 'checkout', params: { cartUuid: uuid } })
    },
    handleSearchRedirect: () => {
      events.emit('go_to_page', { page: 'search' })
    },
    handleCheckoutListRedirect: () => {
      events.emit('go_to_page', { page: 'checkout_list' })
    },
    handleStoreRedirect: (slug) => {
      if (businessUrlTemplate === '/store/:business_slug' || businessUrlTemplate === '/:business_slug') {
        events.emit('go_to_page', { page: 'business', params: { business_slug: slug } })
      } else {
        events.emit('go_to_page', { page: 'business', search: `?${businessUrlTemplate.split('?')[1].replace(':business_slug', '')}${slug}` })
      }
    }
  }
  return (
    <>
      <HelmetTags page='checkout' />
      <Checkout {...checkoutProps} />
    </>
  )
}

export default CheckoutPage
