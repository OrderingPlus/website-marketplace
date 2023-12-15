import React from 'react'
import { useTheme } from 'styled-components'

import { SingleProductCardOriginal, SingleProductCardStarbucks } from '~ui'

export const SingleProductCard = (props) => {
  const theme = useTheme()
  const layout = theme?.business_view?.components?.products?.components?.layout?.type || 'original'

  return (
    <>
      {layout === 'original' && <SingleProductCardOriginal {...props} />}
      {layout === 'starbucks' && <SingleProductCardStarbucks {...props} />}
    </>
  )
}
