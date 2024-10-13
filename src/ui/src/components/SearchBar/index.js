import React, { useRef, useEffect } from 'react'
import { useTheme } from 'styled-components'

import {
  BusinessSearch,
  DeleteContent
} from './styles'

import { useLanguage } from '~components'
import { Input } from '~ui'

export const SearchBar = (props) => {
  const {
    onSearch,
    search,
    placeholder,
    lazyLoad,
    isCustomLayout,
    handleCustomEnter,
    forwardRef,
    starbucksStyle
  } = props
  const theme = useTheme()
  const [, t] = useLanguage()
  let timeout = null
  let previousSearch
  const el = useRef()
  const onChangeSearch = e => {
    if (e.keyCode === 13) {
      handleCustomEnter && handleCustomEnter(e.target.value)
      return
    }

    if (previousSearch !== e.target.value) {
      if (!lazyLoad) {
        onSearch && onSearch(e.target.value)
        if (el.current) {
          el.current.value = e.target.value
        }
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(function () {
          onSearch && onSearch(e.target.value)
          if (el.current) {
            el.current.value = e.target.value
          }
        }, 750)
      }
    }
    previousSearch = e.target.value
  }

  const handleClear = () => {
    onSearch('')
    el.current.value = ''
  }

  useEffect(() => {
    el.current.onkeyup = onChangeSearch
  }, [])

  useEffect(() => {
    if (!search || search === '') {
      el.current.value = ''
    }
  }, [search])

  useEffect(() => {
    if (props.forceFocus) {
      el.current.focus()
    }
  }, [props.forceFocus])

  return (
    <BusinessSearch
      className={!isCustomLayout && 'search-bar'}
      isCustomLayout={isCustomLayout}
      hasValue={el.current?.value}
      starbucksStyle={starbucksStyle}
    >
      <Input
        ref={(ref) => {
          el.current = ref
          if (forwardRef) {
            forwardRef.current = ref
          }
        }}
        name='search'
        aria-label='search'
        placeholder={placeholder}
        autoComplete='off'
        maxLength='500'
        style={{ backgroundImage: `url(${theme?.images?.general?.searchIcon})` }}
        defaultValue={search}
        onClick={(e) => handleCustomEnter && handleCustomEnter(e)}
      />
      <DeleteContent className='clear'>
        {el.current?.value && <span onClick={handleClear}>{t('CLEAR', 'Clear')}</span>}
      </DeleteContent>
    </BusinessSearch>
  )
}
