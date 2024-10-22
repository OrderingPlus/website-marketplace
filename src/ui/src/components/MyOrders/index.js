import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import {
  Container,
  NoOrdersWrapper,
  MyOrdersMenuContainer
} from './styles'

import { useConfig, useLanguage } from '~components'

import { Tab, Tabs, Button, OrdersOption } from '~ui'
import { GiftCardOrdersList } from '../GiftCard/GiftCardOrdersList'

export const MyOrders = (props) => {
  const {
    hideOrders,
    isFromBusinessListingSearch,
    businessesSearchList,
    onProductRedirect,
    onRedirectPage,
    businessUrlTemplate
  } = props

  const [, t] = useLanguage()
  const history = useHistory()
  const theme = useTheme()
  const [{ configs }] = useConfig()
  const layout = theme?.orders?.components?.layout?.type || 'original'

  const [isEmptyActive, setIsEmptyActive] = useState(false)
  const [isEmptyPast, setIsEmptyPast] = useState(false)
  const [isEmptyPreorder, setIsEmptyPreorder] = useState(false)
  const [selectedOption, setSelectedOption] = useState(!hideOrders ? 'orders' : 'business')
  const [isEmptyBusinesses, setIsEmptyBusinesses] = useState(false)
  const [businessOrderIds, setBusinessOrderIds] = useState([])

  const hidePreviousOrders = theme?.orders?.components?.past_orders?.hidden
  const hideProductsTab = theme?.orders?.components?.products_tab?.hidden
  const hideBusinessTab = theme?.orders?.components?.business_tab?.hidden
  const isWalletEnabled = configs?.cash_wallet?.value && configs?.wallet_enabled?.value === '1' && (configs?.wallet_cash_enabled?.value === '1' || configs?.wallet_credit_point_enabled?.value === '1')

  const MyOrdersMenu = [
    { key: 'orders', value: t('ORDERS', 'Orders'), disabled: false },
    { key: 'business', value: t('BUSINESS', 'Business'), disabled: hideBusinessTab },
    { key: 'products', value: t('PRODUCTS', 'Products'), disabled: hideProductsTab },
    { key: 'giftCards', value: t('GIFT_CARD', 'Gift card'), disabled: !isWalletEnabled }
  ]

  const notOrderOptions = ['business', 'products', 'professionals']
  const allEmpty = (isEmptyActive && isEmptyPast && isEmptyPreorder) || ((isEmptyBusinesses || businessOrderIds?.length === 0) && hideOrders)

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
            <Tabs variant='primary'>
              {MyOrdersMenu.filter(option => (!hideOrders || option.key !== 'orders') && !option.disabled).map(option => (
                <Tab
                  key={option.key}
                  onClick={() => setSelectedOption(option.key)}
                  active={selectedOption === option.key}
                  borderBottom
                >
                  {option?.value}
                </Tab>
              ))}
              {layout === 'appointments' && (
                <Tab
                  onClick={() => setSelectedOption('professionals')}
                  active={selectedOption === 'professionals'}
                  borderBottom
                >
                  {t('PROFESSIONALS', 'Professionals')}
                </Tab>
              )}
            </Tabs>
          </MyOrdersMenuContainer>
        )}
        {selectedOption === 'orders' && (
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
                  horizontal
                  setIsEmptyPreorder={setIsEmptyPreorder}
                />
                <OrdersOption
                  {...props}
                  activeOrders
                  horizontal
                  setIsEmptyActive={setIsEmptyActive}
                />
                <OrdersOption
                  {...props}
                  pastOrders
                  setIsEmptyPast={setIsEmptyPast}
                  handleRedirectToCheckout={uuid => {
                    onRedirectPage && onRedirectPage({ page: 'checkout', params: { cartUuid: uuid } })
                  }}
                />
              </>
                )}
          </>
        )}
        {notOrderOptions.includes(selectedOption) && !hidePreviousOrders
          ? (<OrdersOption
              {...props}
              titleContent={t('PREVIOUSLY_ORDERED', 'Previously ordered')}
              hideOrders
              horizontal
              isBusiness={selectedOption === 'business'}
              isProducts={selectedOption === 'products'}
              isProfessionals={selectedOption === 'professionals'}
              activeOrders
              pastOrders
              preOrders
              businessesSearchList={businessesSearchList}
              setIsEmptyBusinesses={setIsEmptyBusinesses}
              businessOrderIds={businessOrderIds}
              setBusinessOrderIds={setBusinessOrderIds}
              onProductRedirect={onProductRedirect}
              businessUrlTemplate={businessUrlTemplate}
            />)
          : selectedOption !== 'giftCards'
            ? <NoOrdersWrapper>
                <p>{t('NOTHING_TO_SHOW', 'Nothing to show')}</p>
              </NoOrdersWrapper>
            : null}
        {selectedOption === 'giftCards' && (
          <GiftCardOrdersList />
        )}
      </Container>
    </>
  )
}
