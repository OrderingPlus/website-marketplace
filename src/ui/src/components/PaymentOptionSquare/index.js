import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Container, Spinner, PaymentSquareContainer } from './styles'

import { PaymentOptionSquare as PaymentOptionSquareController, useLanguage } from '~components'
import {
  Tabs,
  Tab,
  Alert,
  SpinnerLoader,
  Button
} from '~ui'

const PaymentOptionSquareUI = (props) => {
  const {
    paymentMethods,
    methodSelected,
    handleChangeMethodSelected,
    isLoading,
    isLoadingMethod,
    alertState,
    setAlertState,
    isLoadingPlace
  } = props

  const [, t] = useLanguage()

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  return (
    <PaymentSquareContainer>
      {isLoading && (
        [...Array(3).keys()].map(i => (
          <div key={i}>
            <Skeleton height={50} />
          </div>
        ))
      )}
      {!isLoading && (
        <>
          <Tabs>
            {paymentMethods.map(method => (
              <Tab key={method?.value} disabled={methodSelected === method?.value} active={methodSelected === method?.value} onClick={() => handleChangeMethodSelected(method?.value)}>
                {method?.name}
              </Tab>
            ))}
          </Tabs>
          {isLoadingMethod && methodSelected && (
            [...Array(3).keys()].map(i => (
              <div key={i}>
                <Skeleton height={50} />
              </div>
            ))
          )}
          <Container isLoading={isLoadingMethod || isLoadingPlace}>
            {methodSelected === 'card_payments' && (
              <>
                <div id='card-container' />
                <Button color='primary' id='card-button' type='button'>{t('ACCEPT', 'Accept')}</Button>
              </>
            )}
            {methodSelected === 'ach_bank_transfer' && (
              <Button color='primary' id='ach-button' type='button'>{t('PAY_WITH_BANK_ACCOUNT', 'Pay with Bank Account')}</Button>
            )}
            {methodSelected === 'gift_cards' && (
              <form>
                <div id='gift-card-container' />
                <button id='gift-card-button' type='button'>{t('PAY_WITH_GIFT_CARD', 'Pay with Gift Card')}</button>
              </form>
            )}
            {isLoadingPlace && (
              <Spinner>
                <SpinnerLoader
                  style={{ height: 100 }}
                />
              </Spinner>
            )}
          </Container>
        </>
      )}
      <Alert
        title={t('SQUARE_ERROR', 'Square Error')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </PaymentSquareContainer>
  )
}

export const PaymentOptionSquare = (props) => {
  const paymentPaypalProps = {
    ...props,
    UIComponent: PaymentOptionSquareUI
  }
  return (
    <PaymentOptionSquareController {...paymentPaypalProps} />
  )
}
