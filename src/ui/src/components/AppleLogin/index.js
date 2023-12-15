import React from 'react'
import FaApple from '@meronex/icons/fa/FaApple'
import { AppleButton } from './styles'

import { AppleLogin as AppleLoginController, useLanguage } from '~components'

const AppleLoginUI = (props) => {
  const {
    initLoginApple
  } = props

  const [, t] = useLanguage()

  return (
    <AppleButton
      initialIcon
      color='secondary'
      onClick={() => initLoginApple()}
    >
      <FaApple />
      <div>{t('CONTINUE_WITH_APPLE', 'Continue with Apple')}</div>
    </AppleButton>
  )
}

export const AppleLogin = (props) => {
  const propss = {
    ...props,
    UIComponent: AppleLoginUI
  }
  return <AppleLoginController {...propss} />
}
