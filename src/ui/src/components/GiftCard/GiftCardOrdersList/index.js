import React, { useState } from 'react'
import {
  Container,
  NoOrdersWrapper
} from './styles'

import { useLanguage } from '~components'
import { HorizontalGiftCardOrdersLayout } from '../HorizontalGiftCardOrdersLayout'

export const GiftCardOrdersList = (props) => {
  const [, t] = useLanguage()
  const [isEmptyPending, setIsEmptyPending] = useState(false)
  const [isEmptySent, setIsEmptySent] = useState(false)
  const [isEmptyRedeemed, setIsEmptyRedeemed] = useState(false)

  return (
    <Container>
      <HorizontalGiftCardOrdersLayout
        title={t('PENDING', 'Pending')}
        defaultStatus='pending'
        setIsEmpty={setIsEmptyPending}
        scrollId='pendingGifts'
      />

      <HorizontalGiftCardOrdersLayout
        title={t('SENT', 'Sent')}
        defaultStatus='sent'
        setIsEmpty={setIsEmptySent}
        scrollId='sentGifts'
      />

      <HorizontalGiftCardOrdersLayout
        title={t('REDEEMED', 'Redeemed')}
        defaultStatus='activated'
        setIsEmpty={setIsEmptyRedeemed}
        scrollId='redeemedgGifts'
      />

      {isEmptyPending && isEmptySent && isEmptyRedeemed && (
        <NoOrdersWrapper>
          <p>{t('YOU_DONT_HAVE_CARDS', 'You don\'t have cards')}</p>
        </NoOrdersWrapper>
      )}
    </Container>
  )
}
