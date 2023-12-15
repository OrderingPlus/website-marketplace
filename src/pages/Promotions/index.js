import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Promotions as PromotionsController } from '~ui'

export const Promotions = (props) => {
  const promotionsProps = {
    ...props
  }
  return (
    <>
      <HelmetTags page='promotions' />
      <PromotionsController {...promotionsProps} />
    </>
  )
}

export default Promotions
