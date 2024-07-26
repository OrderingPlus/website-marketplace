import React from 'react'
import { useTheme } from 'styled-components'

import { PageNotFoundContainer, PageNotFoundText, PageNotFoundImage } from './styles'

import { useLanguage } from '~components'
import { useWindowSize } from '~ui'

export const PageNotFound = (props) => {
  const [, t] = useLanguage()
  const theme = useTheme()
  const { width } = useWindowSize()
  return (
    <PageNotFoundContainer width={width}>
      <PageNotFoundText>
        <h1>{t('PAGE_NOT_FOUND', 'PAGE NOT FOUND')}</h1>
        {theme.images?.general?.notFoundLighting && (
          <img src={theme.images?.general?.notFoundLighting} alt='lighting' height='40' width='40' loading='lazy' />
        )}
      </PageNotFoundText>
      {theme.images?.general?.notFound404 && (
        <PageNotFoundImage>
          <img src={theme.images?.general?.notFound404} alt='error404' width='300' height='300' loading='lazy' />
        </PageNotFoundImage>
      )}
    </PageNotFoundContainer>
  )
}
