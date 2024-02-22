import React from 'react'
import moment from 'moment'
import { useTheme } from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import BsFillStarFill from '@meronex/icons/bs/BsFillStarFill'
import { StarFill } from 'react-bootstrap-icons'

import {
  BusinessReviewsContainer,
  ReviewOf,
  Content,
  Review,
  ReviewsNotFound,
  SkeletonContainer,
  ReviewsHeaderWrapper,
  ReviewsProgressWrapper,
  ReviewsProgressContent,
  ReviewsProgressBar,
  ReviewsMarkPoint,
  ReviewTime,
  ReviewItemHeader,
  ReviewItemContent,
  SearchContainer,
  ReviewStars
} from './styles'

import { BusinessReviews as BusinessReviewController, useLanguage } from '~components'

export const BusinessReviewsUI = (props) => {
  const { stars, reviewsList, handleClickOption, onChangeReview } = props
  const [, t] = useLanguage()
  const theme = useTheme()
  const handleOnChange = (evt) => {
    if (evt.target.value) onChangeReview(evt.target.value)
    else onChangeReview('')
  }
  const handleClickRaiting = (raiting) => {
    if (raiting) handleClickOption(raiting)
  }

  const showRanking = !theme?.business_view?.components?.reviews?.components?.ranking?.hidden
  const showReviewDate = !theme?.business_view?.components?.reviews?.components?.review_date?.hidden
  const showCustomerComments = !theme?.business_view?.components?.reviews?.components?.customer_comments?.hidden
  const showSearch = !theme?.business_view?.components?.review?.components?.search?.hidden
  const hideElement = !(!showReviewDate && !showCustomerComments)

  const reviewPoints = [1, 2, 3, 4, 5]

  return (
    <BusinessReviewsContainer>
      {reviewsList.error
        ? <h2>{t('ERROR_UNKNOWN', 'An error has ocurred')}</h2>
        : (
        <>
          <ReviewsHeaderWrapper noReviews={reviewsList?.reviews.length === 0}>
            {
              !reviewsList.loading
                ? (
                <>
                  <BsFillStarFill />
                  <h2>{`${stars} (${reviewsList?.reviews.length} ${t('REVIEWS', 'Reviews')})`}</h2>
                </>
                  )
                : (
                <Skeleton width={100} height={30} />
                  )
            }
          </ReviewsHeaderWrapper>
          {showSearch && (
            <ReviewOf>
              {!reviewsList.loading
                ? (
                  <SearchContainer>
                    <input
                      type= 'text'
                      onChange={handleOnChange}
                      placeholder={t('SEARCH', 'Search')}
                      style={{ backgroundImage: `url(${theme?.images?.general?.searchIcon})` }}
                    />
                  </SearchContainer>
                  )
                : <Skeleton width={200} height={30} />}
            </ReviewOf>
          )}
          {showRanking && (
            <ReviewsProgressWrapper>
              <p>{t('CUSTOMER_REVIEWS', 'Customers reviews')}</p>
              <ReviewsProgressContent>
                <ReviewsProgressBar style={{ width: `${(stars / 5) * 100}%` }} />
                {reviewPoints.map((reviewPoint, i) => {
                  const isLastReviewPoint = i === reviewPoints?.length - 1
                  return (
                    <ReviewsMarkPoint
                      key={i}
                      onClick={() => handleClickRaiting(i + 1)}
                      style={{
                        left: theme.rtl !== isLastReviewPoint ? 'initial' : `${25 * (isLastReviewPoint ? 0 : i)}%`,
                        right: theme.rtl !== isLastReviewPoint ? `${25 * (isLastReviewPoint ? 0 : i)}%` : 'initial'
                      }}
                    >
                      <ReviewStars>
                        {reviewPoint}
                        <StarFill className='start' />
                      </ReviewStars>
                    </ReviewsMarkPoint>
                  )
                })}
              </ReviewsProgressContent>
            </ReviewsProgressWrapper>
          )}
          {hideElement && (
            <Content id='content'>
              {!reviewsList.loading
                ? reviewsList?.reviews.map((review) => (
                <Review key={review.id} id='review'>
                  {showReviewDate && (
                    <ReviewItemHeader>
                      <ReviewTime>{moment(review?.created_at).format('LLL')}</ReviewTime>
                    </ReviewItemHeader>
                  )}
                  {showCustomerComments && (
                    <ReviewItemContent>{review?.comment}</ReviewItemContent>
                  )}
                </Review>
                ))
                : (
                <>
                  {[...Array(2)].map((item, i) => (
                    <SkeletonContainer key={i}>
                      <div>
                        <Skeleton width={100} height={30} />
                        <Skeleton width={100} />
                      </div>
                      <div>
                        <Skeleton width={150} height={50} />
                      </div>
                    </SkeletonContainer>
                  ))}

                </>
                  )}
              {!reviewsList.loading && reviewsList?.reviews.length === 0 && (
                <ReviewsNotFound>{t('NO_REVIEWS', 'No reviews')}</ReviewsNotFound>
              )}
            </Content>
          )}

        </>
          )}
    </BusinessReviewsContainer>
  )
}

export const BusinessReviews = (props) => {
  const BusinessReviewProps = {
    ...props,
    UIComponent: BusinessReviewsUI
  }
  return <BusinessReviewController {...BusinessReviewProps} />
}
