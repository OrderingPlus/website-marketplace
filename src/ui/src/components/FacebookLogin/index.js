import React from 'react'
import FaFacebook from '@meronex/icons/fa/FaFacebook'

import {
  FacebookLoginButton as FacebookLoginController,
  useLanguage
} from '~components'

import { FacebookButton } from './styles'

const FacebookLoginButtonUI = (props) => {
  const [, t] = useLanguage()
  const { handleFacebookLogin } = props
  return (
    <FacebookButton
      initialIcon
      color='secondary'
      onClick={() => handleFacebookLogin()}
    >
      <FaFacebook />
      <div>{t('CONTINUE_WITH_FACEBOOK', 'Continue with Facebook')}</div>
    </FacebookButton>
  )
}

export const FacebookLoginButton = (props) => {
  const facebookLoginProps = {
    ...props,
    UIComponent: FacebookLoginButtonUI
  }
  return <FacebookLoginController {...facebookLoginProps} />
}
