import React, { useEffect, useRef, useState } from 'react'
import BsChevronDown from '@meronex/icons/bs/BsChevronDown'
import {
  Select as SelectInput,
  Selected,
  Options,
  Option,
  Chevron,
  Header
} from '../Selects'

import { useOrder } from '~components'

export const Select = (props) => {
  const {
    placeholder,
    options,
    defaultValue,
    onChange,
    notAsync,
    notReload,
    CustomArrow,
    isHomeStyle,
    disableOneOption,
    zIndex
  } = props

  const isHome = window.location.pathname === '/' || window.location.pathname === '/home' || isHomeStyle
  const [open, setOpen] = useState(false)
  const defaultOption = options?.find(option => option.value === defaultValue)
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  const [value, setValue] = useState(defaultValue)
  const dropdownReference = useRef()
  const selectedOptionRef = useRef()
  const [orderState] = useOrder()
  const isOneOption = options?.length === 1

  const handleSelectClick = () => setOpen(!open)

  const closeSelect = (e) => {
    if (open) {
      const outsideDropdown = !dropdownReference.current?.contains(e.target) && !selectedOptionRef.current?.contains(e.target)
      if (outsideDropdown) {
        setOpen(false)
      }
    }
  }

  useEffect(() => {
    if (!open) return
    document.addEventListener('click', closeSelect)
    return () => document.removeEventListener('click', closeSelect)
  }, [open])

  useEffect(() => {
    if (!notAsync) {
      const _defaultOption = options?.find(option => option.value === defaultValue)
      setSelectedOption(_defaultOption)
      setValue(defaultValue)
    }
  }, [defaultValue, options])

  const handleChangeOption = (option) => {
    if (value !== option.value) {
      setSelectedOption(option)
      setValue(option.value)
      onChange && onChange(option.value)
    }
    setOpen(false)
  }

  return (
    isOneOption && !disableOneOption
      ? (
      <SelectInput id='select-input' isHome={isHome}>
        <Selected ref={selectedOptionRef} onClick={() => handleSelectClick()}>
          <Header>
            {options[0].content}
          </Header>
        </Selected>
      </SelectInput>
        )
      : (
      <SelectInput
        id='select-input'
        isHome={isHome}
        disabled={(orderState.loading && !notReload) || props.isDisabled}
      >
        {!selectedOption && <Selected><Header>{placeholder || ''}</Header><Chevron>{CustomArrow ? <CustomArrow id='arrow' /> : <BsChevronDown />}</Chevron></Selected>}
        {selectedOption && (
          <Selected ref={selectedOptionRef} onClick={() => handleSelectClick()}>
            <Header>
              {selectedOption.showOnSelected ?? selectedOption.content}
            </Header>
            {!props.isDisabled && (
              <Chevron>
                {CustomArrow ? <CustomArrow id='arrow' /> : <BsChevronDown />}
              </Chevron>
            )}
          </Selected>
        )}
        {open && options && (
          <Options id='list' position='right' ref={dropdownReference} isHome={isHome} zIndex={zIndex}>
            {
              options.map((option, i) => (
                <Option
                  id='item'
                  key={i}
                  selected={value === option.value}
                  onClick={() => handleChangeOption(option)}
                >
                  {option.content}
                </Option>
              ))
            }
          </Options>
        )}
      </SelectInput>
        )
  )
}
