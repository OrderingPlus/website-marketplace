import React from 'react'

import { AddRemoveControl, Container, Text } from './styles'
import { ProductIngredient as ProductIngredientController, useLanguage } from '~components'

const ProductIngredientUI = (props) => {
  const {
    state,
    ingredient,
    toggleSelect,
    isSoldOut
  } = props

  const [, t] = useLanguage()
  return (
    <Container isSoldOut={isSoldOut} onClick={() => toggleSelect()}>
      <span>
        {ingredient.name}
      </span>
      <AddRemoveControl>
        {state?.selected && !isSoldOut
          ? (
            <Text>
              {t('TOUCH_FOR_DELETE', 'Touch for delete')}
            </Text>
            )
          : (
            <Text>
              {t('TOUCH_FOR_ADD', 'Touch for add')}
            </Text>
            )}
      </AddRemoveControl>
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
