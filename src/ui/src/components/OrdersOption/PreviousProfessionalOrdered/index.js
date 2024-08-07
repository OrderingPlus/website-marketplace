import React from 'react'

import {
  ProductsList,
  ProductsListContainer
} from './styles'

import { AutoScroll, SingleProfessionalCard } from '~ui'

export const PreviousProfessionalOrdered = (props) => {
  const {
    professionals,
    handleUpdateProfessionals
  } = props

  return (
    <ProductsListContainer isLoading={professionals?.length < 1}>
      <ProductsList>
        <AutoScroll>
          {professionals?.map(professional => (
            <SingleProfessionalCard
              key={professional?.id}
              professional={professional}
              handleUpdateProfessionals={handleUpdateProfessionals}
            />
          ))}
        </AutoScroll>
      </ProductsList>
    </ProductsListContainer>
  )
}
