import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import BsArrowRight from '@meronex/icons/bs/BsArrowRight'
import { Star, StarFill } from 'react-bootstrap-icons'
import {
  ReviewOrderContainer,
  StarWrapper,
  PlacedDate,
  Send,
  BusinessLogo,
  BusinessName,
  WrapperBusinessLogo,
  ReviewsProgressWrapper,
  LogoAndReviewWrapper,
  ContinueContainer
} from './styles'

import { useLanguage, useUtils } from '~components'
import { Button } from '~ui'

export const ReviewTrigger = (props) => {
  const { order, handleOpenOrderReview } = props
  const [star, setStar] = useState(5)
  const [, t] = useLanguage()
  const [{ optimizeImage, parseDate }] = useUtils()
  const theme = useTheme()
  const placedOnDate = parseDate(order?.delivery_datetime, { outputFormat: 'dddd MMMM DD, YYYY' })

  return (
    <>
      <LogoAndReviewWrapper>
        <WrapperBusinessLogo>
          {(order?.business?.logo || theme.images?.dummies?.businessLogo) && (
            <BusinessLogo bgimage={optimizeImage(order?.business?.logo || theme.images?.dummies?.businessLogo, 'h_200,c_limit')} />
          )}
        </WrapperBusinessLogo>
        {order?.business?.name && <BusinessName>{order?.business?.name}</BusinessName>}
        <ReviewsProgressWrapper>
          <StarWrapper>
            {[...Array(5).keys()].map((index) => (
              index <= (star - 1))
              ? <StarFill size={40} key={`star-symbol-${index}`} onClick={() => setStar(index + 1)} color={theme?.colors?.primary} />
              : <Star size={40} key={`star-symbol-${index}`} onClick={() => setStar(index + 1)} />
            )}
          </StarWrapper>
        </ReviewsProgressWrapper>
        <PlacedDate>{t('DONOT_FORGET_RATE_YOUR_ORDER', 'Do not forget to rate your order placed on ')} <strong>{placedOnDate}</strong></PlacedDate>
      </LogoAndReviewWrapper>
      <ReviewOrderContainer>
        <Send>
          <Button
            color='primary'
            type='button'
            className='review-sent'
            onClick={() => handleOpenOrderReview(star)}
          >
            <ContinueContainer><p>{t('GOTO_REVIEW', 'Go to review')}</p><BsArrowRight /></ContinueContainer>
          </Button>
        </Send>
      </ReviewOrderContainer>
    </>
  )
}

export default ReviewTrigger
