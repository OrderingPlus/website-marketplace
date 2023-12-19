import React from 'react'

import { SmartAppBanner as SmartAppBannerController } from '~components'

const SmartAppBanneUI = (props) => {
  /**
   * Options:
   * https://github.com/kudago/smart-app-banner
   * https://github.com/ain/smartbanner.js
   */

  return (
    <>
    </>
  )
}

export const SmartAppBanner = (props) => {
  const smartAppBannerProps = {
    ...props,
    UIComponent: SmartAppBanneUI
  }
  return <SmartAppBannerController {...smartAppBannerProps} />
}

export default SmartAppBanner
