import React from 'react'
import { useTheme } from 'styled-components'

import { OriginalBusinessesListing } from './layouts/OriginalBusinessesListing'
import { AppointmentsBusinessListing } from './layouts/AppointmentsBusinessListing'

export const BusinessesListing = (props) => {
  const { logosLayout } = props
  const theme = useTheme()

  const layout = theme?.business_listing_view?.components?.layout?.type || 'original'

  return (
    <>
      {(layout === 'original' || logosLayout) && <OriginalBusinessesListing {...props} />}
      {(layout === 'appointments') && !logosLayout && <AppointmentsBusinessListing {...props} />}
    </>
  )
}
