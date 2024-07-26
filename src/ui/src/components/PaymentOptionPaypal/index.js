import React from 'react'

import { Container } from './styles'
import { useConfig, PaymentOptionPaypal as PaymentPaypalController, useLanguage } from '~components'

const PaymentOptionPaypalUI = (props) => {
  const {
    isSdkReady,
    PaypalButton,
    noAuthMessage,
    paypalButtonProps
  } = props

  const [, t] = useLanguage()

  return (
    <Container>
      {noAuthMessage
        ? (
        <p>{noAuthMessage}</p>
          )
        : (
            isSdkReady
              ? (
                  PaypalButton && <PaypalButton {...paypalButtonProps} />
                )
              : (
                <div>
                  <p style={{ textAlign: 'center' }}>{t('CREDENTIALS_MISSING', 'Credentials Missing')}</p>
                </div>
                )
          )
      }
    </Container>
  )
}

export const PaymentOptionPaypal = (props) => {
  const [{ configs }] = useConfig()
  const paymentPaypalProps = {
    ...props,
    UIComponent: PaymentOptionPaypalUI,
    currency: configs?.stripe_currency?.value
  }
  return (
    <PaymentPaypalController {...paymentPaypalProps} />
  )
}
