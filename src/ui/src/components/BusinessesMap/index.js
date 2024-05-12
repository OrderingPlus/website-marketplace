import React from 'react'
import { BusinessContainer, WrapperMap } from './styles'
import { useTheme } from 'styled-components'

import { BusinessesMap as BusinessesMapController, GoogleMapsMap, useConfig, useOrder } from '~components'
import { BusinessController } from '../BusinessController'
import { useBusinessSelected } from '~ui'

const BusinessesMapUI = (props) => {
  const {
    userLocation,
    businessLocations,
    onBusinessClick,
    setErrors,
    businessControllerProps
  } = props

  const theme = useTheme()
  const [configState] = useConfig()
  const [orderState] = useOrder()
  const [businessSelected] = useBusinessSelected()

  const googleMapsControls = {
    defaultZoom: 15,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: 'roadmap', // 'roadmap', 'satellite', 'hybrid', 'terrain'
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite']
    },
    isMarkerDraggable: true
  }

  const locations = businessLocations.map(business => ({
    ...business,
    icon: theme?.images?.general?.pizzahutpin
  }))

  return (
    <WrapperMap disabled={orderState.loading}>
      <GoogleMapsMap
        noDistanceValidation
        apiKey={configState?.configs?.google_maps_api_key?.value}
        location={userLocation}
        locations={locations}
        mapControls={googleMapsControls}
        maxLimitLocation={parseInt(configState?.configs?.meters_to_change_address?.value)}
        businessMap
        onBusinessClick={onBusinessClick}
        setErrors={setErrors}
      />
      {businessSelected && (
        <BusinessContainer>
          <BusinessController
            {...businessControllerProps}
            isBusinessMap
            business={businessSelected}
            isBusinessOpen={businessSelected.open && businessSelected?.enabled !== false}
          />
        </BusinessContainer>
      )}
    </WrapperMap>
  )
}

export const BusinessesMap = (props) => {
  const businessMapController = {
    ...props,
    UIComponent: BusinessesMapUI
  }
  return <BusinessesMapController {...businessMapController} />
}
