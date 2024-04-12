import React from 'react'
import { useTheme } from 'styled-components'

import { HelmetTags } from '../../components/HelmetTags'
import { useEvent, useSession, useSite } from '~components'
import { OrderTypeSelector as OrderTypesController, ProfileOptions } from '~ui'

export const OrderTypes = (props) => {
  const [{ user }] = useSession()
  const theme = useTheme()
  const [{ site }] = useSite()
  const [events] = useEvent()

  const businessUrlTemplate = site?.business_url_template || '/store/:business_slug'

  const addressListParams = {
    ...props,
    addressList: user?.addresses,
    isProfile: true,
    isModal: true,
    onBusinessClick: (business) => {
      if (businessUrlTemplate === '/store/:business_slug' || businessUrlTemplate === '/:business_slug') {
        events.emit('go_to_page', { page: 'business', params: { business_slug: business.slug } })
      } else {
        events.emit('go_to_page', { page: 'business', search: `?${businessUrlTemplate.split('?')[1].replace(':business_slug', '')}${business.slug}` })
      }
    }
  }
  const showProfileOptions = theme?.profile?.components?.address_list?.components?.layout?.position === 'new_page'

  return (
    <>
      <HelmetTags page='order_types' />
      {showProfileOptions && (
        <ProfileOptions value='order_types' />
      )}
        <OrderTypesController {...addressListParams} />
    </>
  )
}

export default OrderTypes
