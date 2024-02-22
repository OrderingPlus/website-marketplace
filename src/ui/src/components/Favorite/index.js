import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import {
  FavoritesContainer,
  Title,
  TabsContainer,
  Tab,
  ContentWrapper
} from './styles'

import { useLanguage, useOrder } from '~components'
import { FavoriteList, Tabs } from '~ui'

export const Favorite = (props) => {
  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const theme = useTheme()
  const layout = theme?.favorite?.components?.layout?.type || 'original'

  const [tabSelected, setTabSelected] = useState('businesses')

  const tabList = [
    { key: 'businesses', name: t('BUSINESSES', 'Businesses') },
    { key: 'products', name: t('PRODUCTS', 'Products') },
    { key: 'orders', name: t('ORDERS', 'Orders') }
  ]

  return (
    <FavoritesContainer>
      <Title>{t('FAVORITES', 'Favorites')}</Title>
      <TabsContainer>
        <Tabs variant='primary'>
          {tabList.map((item, i) => (
            <Tab
              key={i}
              borderBottom
              active={item.key === tabSelected}
              onClick={() => setTabSelected(item.key)}
            >
              {item?.name}
            </Tab>
          ))}
          {layout === 'appointments' && (
            <Tab
              borderBottom
              active={tabSelected === 'professionals'}
              onClick={() => setTabSelected('professionals')}
            >
              {t('PROFESSIONALS', 'Professionals')}
            </Tab>
          )}
        </Tabs>
      </TabsContainer>
      <ContentWrapper>
        {tabSelected === 'businesses' && (
          <FavoriteList
            isBusiness
            favoriteURL='favorite_businesses'
            originalURL='business'
            location={`${orderState.options?.address?.location?.lat},${orderState.options?.address?.location?.lng}`}
            propsToFetch={['id', 'name', 'header', 'logo', 'location', 'address', 'ribbon', 'timezone', 'schedule', 'open', 'delivery_price', 'distance', 'delivery_time', 'pickup_time', 'reviews', 'featured', 'offers', 'food', 'laundry', 'alcohol', 'groceries', 'slug']}
          />
        )}
        {tabSelected === 'products' && (
          <FavoriteList
            favoriteURL='favorite_products'
            originalURL='products'
            isProduct
          />
        )}
        {tabSelected === 'orders' && (
          <FavoriteList
            favoriteURL='favorite_orders'
            originalURL='orders'
            isOrder
          />
        )}
        {tabSelected === 'professionals' && (
          <FavoriteList
            favoriteURL='favorite_users'
            originalURL='users'
            isProfessional
          />
        )}
      </ContentWrapper>
    </FavoritesContainer>
  )
}
