import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'

import { Wallets as WalletsController } from '~ui'

export const Wallets = (props) => {
  return (
    <>
      <HelmetTags page='wallets' />
      <WalletsController {...props} />
    </>
  )
}

export default Wallets
