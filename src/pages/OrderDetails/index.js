import React from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'

import { HelmetTags } from '../../components/HelmetTags'

import { useSite, useEvent } from '~components'
import { checkSiteUrl, OrderDetails } from '~ui'

export const OrderDetailsPage = (props) => {
  const history = useHistory()
  const { orderId } = useParams()
  const hashKey = new URLSearchParams(useLocation()?.search)?.get('hash') || null
  const [events] = useEvent()
  const [{ site }] = useSite()
  const businessUrlTemplate = checkSiteUrl(site?.business_url_template, '/store/:business_slug')

  const orderDetailsProps = {
    ...props,
    orderId,
    hashKey,
    urlToShare: (hashKey) => hashKey ? `${window.location.origin}/orders/${orderId}?hash=${hashKey}` : null,
    handleOrderRedirect: () => {
      history.push('/profile/orders')
    },
    handleBusinessRedirect: (slug) => {
      if (businessUrlTemplate === '/store/:business_slug' || businessUrlTemplate === '/:business_slug') {
        events.emit('go_to_page', { page: 'business', params: { business_slug: slug } })
      } else {
        events.emit('go_to_page', { page: 'business', search: `?${businessUrlTemplate.split('?')[1].replace(':business_slug', '')}${slug}` })
      }
    }
  }
  return (
    <>
      <HelmetTags page='order_details' helmetTitle={`Order #${orderId}`} />
      <OrderDetails {...orderDetailsProps} />
    </>
  )
}

export default OrderDetailsPage
