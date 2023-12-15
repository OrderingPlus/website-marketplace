import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'

import { Favorite as FavoriteController } from '~ui'

export const Favorite = (props) => {
  return (
    <>
      <HelmetTags page='favorite' />
      <FavoriteController {...props} />
    </>
  )
}

export default Favorite
