import React from 'react'
import { AddressMapBoxListContainer, AddressSuggestContainer } from './styles'
import EnLocationPin from '@meronex/icons/en/EnLocationPin'

export const AddressMapBoxList = (props) => {
  const {
    mapBoxSuggests,
    retrieveSuggestResult,
    handleChangeAddress,
    onBlurInput,
    setAddressValue,
    handleChangeInput,
    forwardRef
  } = props

  const handleClick = (suggest) => {
    retrieveSuggestResult(suggest?.mapbox_id, handleChangeAddress)
    handleChangeInput({ target: { name: 'address', value: suggest?.full_address || suggest?.name } })
    setAddressValue(suggest?.full_address || suggest?.name)
    if (forwardRef?.current) {
      forwardRef.current.value = suggest?.full_address || suggest?.name
    }
    onBlurInput()
  }

  return (
    <AddressMapBoxListContainer>
      {mapBoxSuggests?.map(suggest => (
        <AddressSuggestContainer
          key={suggest?.mapbox_id}
          onClick={() => handleClick(suggest)}
        >
          <EnLocationPin />
          <p>{suggest?.full_address || suggest?.name}</p>
        </AddressSuggestContainer>
      ))}
    </AddressMapBoxListContainer>
  )
}
