import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {
  ProductsListContainer,
  ProductsList,
  PaginationWrapper
} from './styles'

import { GiftCardOrdersList as GiftCardOrdersListController } from '~components'
import { AutoScroll, Pagination } from '~ui'
import { SingleGiftCard } from '../SingleGiftCard'

const HorizontalGiftCardOrdersLayoutUI = (props) => {
  const {
    giftCards,
    paginationProps,
    goToPage,
    title,
    setIsEmpty,
    scrollId
  } = props

  useEffect(() => {
    if (giftCards.loading) return
    if (giftCards.list?.length === 0) setIsEmpty(true)
  }, [giftCards])

  return (
    <>
      {giftCards.loading
        ? <Skeleton width={100} height={24} />
        : giftCards.list?.length > 0 && (
            <>
              <h2>{title}</h2>
              <ProductsListContainer>
                <ProductsList>
                  <AutoScroll scrollId={scrollId}>
                    {giftCards.loading
                      ? [...Array(10).keys()].map(i => (
                          <SingleGiftCard isSkeleton key={i} />))
                      : giftCards.list.map(card => (
                          <SingleGiftCard key={card.id} card={card} />))}
                  </AutoScroll>
                </ProductsList>
              </ProductsListContainer>
            </>)}
      {giftCards.list?.length > 0 && Math.ceil(paginationProps?.totalPages) > 1 && (
        <PaginationWrapper>
          <Pagination
            currentPage={paginationProps.currentPage}
            totalPages={Math.ceil(paginationProps?.totalPages)}
            handleChangePage={goToPage}
          />
        </PaginationWrapper>
      )}
    </>
  )
}

export const HorizontalGiftCardOrdersLayout = (props) => {
  const giftCardsProps = {
    ...props,
    UIComponent: HorizontalGiftCardOrdersLayoutUI
  }
  return <GiftCardOrdersListController {...giftCardsProps} />
}
