import React from 'react'
import MdCheckBox from '@meronex/icons/md/MdCheckBox'
import MdCheckBoxOutlineBlank from '@meronex/icons/md/MdCheckBoxOutlineBlank'

import { Container } from './styles'
import { ProductIngredient as ProductIngredientController } from '~components'

const ProductIngredientUI = (props) => {
  const {
    state,
    ingredient,
    toggleSelect,
    isSoldOut
  } = props

  return (
    <Container isSoldOut={isSoldOut} onClick={() => toggleSelect()}>
      <span>
        {state?.selected && !isSoldOut
          ? (
          <MdCheckBox />
            )
          : (
          <MdCheckBoxOutlineBlank disabled />
            )}
      </span>
      <span>
        {ingredient.name}
      </span>
    </Container>
  )
}

export const ProductIngredient = (props) => {
  const productIngredientProps = {
    ...props,
    UIComponent: ProductIngredientUI
  }

  return (
    <ProductIngredientController {...productIngredientProps} />
  )
}
