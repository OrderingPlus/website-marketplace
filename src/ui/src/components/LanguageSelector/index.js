import React from 'react'
import BisDownArrow from '@meronex/icons/bi/BisDownArrow'
import { Container } from './styles'

import { LanguageSelector as LanguageSelectorController } from '~components'
import { Select } from '~ui'

const LanguageSelectorUI = (props) => {
  const {
    languagesState,
    currentLanguage,
    handleChangeLanguage,
    notReload,
    defaultLanguages,
    defaultCurrentLanguage
  } = props
  const _languages = languagesState?.languages?.map(language => {
    return {
      value: language?.code, content: language?.name, showOnSelected: ''
    }
  })
  _languages && _languages.sort((a, b) =>
    (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0)
  )

  const transformLanguageToCountry = (currentLanguage) => {
    const language = currentLanguage.slice(0, 2)?.toUpperCase()
    if (language === 'EN') return 'US'
    if (language === 'AR') return 'AE'
    if (language === 'CA') return 'ES'
    if (language === 'DA') return 'DK'
    if (language === 'ZH') return 'CN'
    return language
  }

  return (
    _languages && _languages.length > 1
      ? (
      <Container>
        <img
          alt={currentLanguage}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${transformLanguageToCountry(currentLanguage)}.svg`}
        />
        <Select
          zIndex={20000}
          isHomeStyle
          options={languagesState?.loading ? defaultLanguages : _languages}
          defaultValue={languagesState?.loading ? defaultCurrentLanguage : currentLanguage}
          onChange={(languageId) => handleChangeLanguage(languageId)}
          notReload={notReload}
          placeholder=''
          CustomArrow={BisDownArrow}
        />
      </Container>
        )
      : null
  )
}

export const LanguageSelector = (props) => {
  const DefaultChangeLanguage = () => { }
  const langProps = {
    ...props,
    UIComponent: LanguageSelectorUI,
    onChangeLanguage: props.onChangeLanguage || DefaultChangeLanguage,
    defaultLanguages: [{
      content: 'English',
      showOnSelected: 'EN',
      value: 'en'
    }],
    defaultCurrentLanguage: 'en'
  }
  return (
    <LanguageSelectorController {...langProps} />
  )
}