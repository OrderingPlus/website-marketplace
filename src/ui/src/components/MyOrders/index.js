import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import {
  Container,
  Divider,
  NoOrdersWrapper,
  MyOrdersMenuContainer,
  TabsContainer
} from './styles'

import { useLanguage } from '~components'

import { Tab, Button, OrdersOption, FavoriteList } from '~ui'

export const MyOrders = (props) => {
  const {
    hideOrders,
    isFromBusinessListingSearch,
    businessesSearchList,
    onProductRedirect,
    onRedirectPage
  } = props

  const [, t] = useLanguage()
  const history = useHistory()
  const theme = useTheme()
  const layout = theme?.orders?.components?.layout?.type || 'original'

  const [isEmptyActive, setIsEmptyActive] = useState(false)
  const [isEmptyPast, setIsEmptyPast] = useState(false)
  const [isEmptyPreorder, setIsEmptyPreorder] = useState(false)
  const [isEmptyBusinesses, setIsEmptyBusinesses] = useState(false)
  const [businessOrderIds, setBusinessOrderIds] = useState([])
  const [tabSelected, setTabSelected] = useState(1)

  const allEmpty = (isEmptyActive && isEmptyPast && isEmptyPreorder) || ((isEmptyBusinesses || businessOrderIds?.length === 0) && hideOrders)

  const handleChangeTab = (val) => {
    setTabSelected(val)
  }

  return (
    <>
      {hideOrders && !allEmpty && (
        <h2>{t('PREVIOUSLY_ORDERED', 'Previously ordered')}</h2>
      )}
      <Container hideOrders={hideOrders} initialHeight={isFromBusinessListingSearch}>
        {!hideOrders && (
          <h1>{layout === 'appointments' ? t('MY_APPOINTMENTS', 'My appointments') : t('MY_ORDERS', 'My orders')}</h1>
        )}
        {!allEmpty && (
          <MyOrdersMenuContainer className='category-lists'>
            <TabsContainer>
              <Tab
                className={tabSelected === 1 ? 'selected' : ''}
                onClick={() => handleChangeTab(1)}
              >
                <p
                  size={14}
                  color={
                    tabSelected === 1
                      ? theme.colors.primary
                      : theme.colors.black
                  }
                >
                  {t('ORDERS', 'ORDERS')}
                </p>
              </Tab>
              <Tab
                className={tabSelected === 2 ? 'selected' : ''}
                onClick={() => handleChangeTab(2)}
              >
                <p
                  size={14}
                  color={
                    tabSelected === 2
                      ? theme.colors.primary
                      : theme.colors.black
                  }
                >
                  {t('FAVORITE_ORDERS', 'FAVORITE ORDERS')}
                </p>
              </Tab>
            </TabsContainer>
          </MyOrdersMenuContainer>
        )}
        {tabSelected === 1 && (
          <>
            {(isEmptyActive && isEmptyPast && isEmptyPreorder)
              ? (
                <NoOrdersWrapper>
                  <p>{t('YOU_DONT_HAVE_ORDERS', 'You don\'t have any orders')}</p>
                  <Button
                    color='primary'
                    onClick={() => history.push('/')}
                  >
                    {t('ORDER_NOW', 'Order now')}
                  </Button>
                </NoOrdersWrapper>
                )
              : (
                <>
                  <OrdersOption
                    {...props}
                    preOrders
                    setIsEmptyPreorder={setIsEmptyPreorder}
                  />
                  {!isEmptyPreorder && <Divider />}
                  <OrdersOption
                    {...props}
                    activeOrders
                    setIsEmptyActive={setIsEmptyActive}
                  />
                  {!isEmptyActive && <Divider />}
                  <OrdersOption
                    {...props}
                    pastOrders
                    setIsEmptyPast={setIsEmptyPast}
                    handleRedirectToCheckout={uuid => {
                      onRedirectPage && onRedirectPage({ page: 'checkout', params: { cartUuid: uuid } })
                    }}
                  />
                  {!isEmptyPast && <Divider />}
                </>
                )}
          </>
        )}
        {tabSelected === 1 && (
          <OrdersOption
            {...props}
            titleContent={t('PREVIOUSLY_ORDERED', 'Previously ordered')}
            hideOrders
            horizontal
            activeOrders
            pastOrders
            preOrders
            businessesSearchList={businessesSearchList}
            setIsEmptyBusinesses={setIsEmptyBusinesses}
            businessOrderIds={businessOrderIds}
            setBusinessOrderIds={setBusinessOrderIds}
            onProductRedirect={onProductRedirect}
          />
        )}
        {tabSelected === 2 && (
            <FavoriteList
              favoriteURL='favorite_orders'
              originalURL='orders'
              isOrder
              handleRedirectToList={() => handleChangeTab(1)}
            />
        )}
      </Container>
    </>
  )
}
