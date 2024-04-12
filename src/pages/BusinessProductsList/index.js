/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useTheme } from 'styled-components'
import dayjs from 'dayjs'

import { HelmetTags } from '../../components/HelmetTags'
import settings from '../../config'

import { useApi, useConfig, useEvent, useLanguage, useOrder, useSite } from '~components'
import {
  capitalize,
  checkSiteUrl,
  BusinessProductsListing,
  useBusinessSelected
} from '~ui'

export const BusinessProductsList = (props) => {
  const [{ site }] = useSite()
  const { search } = useLocation()
  const [events] = useEvent()
  const [{ configs }] = useConfig()
  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const [businessSelected, { onChangeBusinessSelected }] = useBusinessSelected()

  const theme = useTheme()
  const [businessNearestState, setBusinessNearestState] = useState({ business: null, loading: false, error: null })
  const websiteThemeType = theme?.my_products?.components?.website_theme?.components?.type
  const websiteThemeBusinessSlug = theme?.my_products?.components?.website_theme?.components?.business_slug
  const [store, setStore] = useState((websiteThemeType === 'single_store' && websiteThemeBusinessSlug) || settings?.businessSlug || businessSelected?.slug)

  const [helmetMetaTags, setHelmetMetaTags] = useState({
    title: '',
    description: '',
    keywords: ''
  })

  let businessSlug = ''
  const businessUrlTemplate = checkSiteUrl(site?.business_url_template, '/store/:business_slug')
  const productUrlTemplate = checkSiteUrl(site?.product_url_template, '/store/:business_slug?category=:category_id&product=:product_id')

  if (businessUrlTemplate.includes('?')) {
    const businessParameter = businessUrlTemplate.replace('/store?', '').replace('=:business_slug', '')
    const params = new URLSearchParams(search)
    businessSlug = params.get(businessParameter)
  } else {
    const { business_slug } = useParams()
    businessSlug = business_slug || store
  }

  const [ordering] = useApi()

  let categoryId
  let productId
  let tableNumber

  if (productUrlTemplate === '/store/:business_slug/:category_slug/:product_slug' ||
    productUrlTemplate === '/:business_slug/:category_slug/:product_slug' ||
    productUrlTemplate.includes('/store/:category_slug/:product_slug')
  ) {
    const { category_slug, product_slug } = useParams()
    categoryId = category_slug
    productId = product_slug
  }

  if ((productUrlTemplate.includes('/store/:business_slug') && productUrlTemplate.includes('category_id')) ||
    (productUrlTemplate.includes('/:business_slug') && !productUrlTemplate.includes('store'))
  ) {
    if (search) {
      const ids = productUrlTemplate.split('?')[1].split('&')
      const categoryParameter = ids[0].replace('=:category_id', '')
      const productParameter = ids[1].replace('=:product_id', '')
      const params = new URLSearchParams(search)
      categoryId = params.get(categoryParameter)
      productId = params.get(productParameter)
    }
  }

  if (search) {
    const params = new URLSearchParams(search)
    tableNumber = params.get('table_number')
  }

  if (tableNumber) {
    const tableNumberFromStorage = window.localStorage.getItem('table_number')
    if (tableNumberFromStorage) {
      window.localStorage.removeItem('table_number')
    }

    window.localStorage.setItem(
      'table_number',
      JSON.stringify({
        tableNumber,
        slug: businessSlug
      })
    )
  }
  const isValidMoment = (date, format) => dayjs.utc(date, format).format(format) === date

  const getNearestBusiness = async () => {
    try {
      setBusinessNearestState({
        ...businessNearestState,
        loading: true
      })
      const defaultLatitude = Number(configs?.location_default_latitude?.value)
      const defaultLongitude = Number(configs?.location_default_longitude?.value)
      const isInvalidDefaultLocation = isNaN(defaultLatitude) || isNaN(defaultLongitude)
      const defaultLocation = {
        lat: !isInvalidDefaultLocation ? defaultLatitude : 40.7744146,
        lng: !isInvalidDefaultLocation ? defaultLongitude : -73.9678064
      }
      const propsToFetch = ['name', 'address', 'location', 'distance', 'open', 'schedule', 'slug']
      let parameters = {
        location: orderState?.options?.address?.location || defaultLocation,
        type: orderState?.options?.type || 1,
        orderBy: 'distance'
      }
      const paginationParams = {
        page: 1,
        page_size: 5
      }
      if (orderState?.options?.moment && isValidMoment(orderState?.options?.moment, 'YYYY-MM-DD HH:mm:ss')) {
        const moment = dayjs.utc(orderState?.options?.moment, 'YYYY-MM-DD HH:mm:ss').local().unix()
        parameters.timestamp = moment
      }
      parameters = { ...parameters, ...paginationParams }

      const { content: { error, result } } = await ordering.businesses().select(propsToFetch).parameters(parameters).get(/* { cancelToken: source } */)
      if (!error) {
        const firstNearestOpenBusiness = result?.find((business) => business?.open)
        setBusinessNearestState({
          business: firstNearestOpenBusiness,
          error: firstNearestOpenBusiness ? null : t('NO_BUSINESS_NEAR_LOCATION', 'No business near of you location') || error,
          loading: false
        })
        onChangeBusinessSelected(firstNearestOpenBusiness || null)
        setStore(firstNearestOpenBusiness?.slug)
        return
      }
      setBusinessNearestState({
        business: null,
        error,
        loading: false
      })
    } catch (err) {
      setBusinessNearestState({
        ...businessNearestState,
        error: err?.message,
        loading: false
      })
    }
  }

  useEffect(() => {
    if (businessSelected) return
    getNearestBusiness()
  }, [businessSelected])

  const businessProductsProps = {
    ...props,
    ordering,
    avoidBusinessLoading: true,
    isCustomLayout: settings?.use_marketplace || store,
    useKioskApp: settings?.use_kiosk,
    isSearchByName: true,
    isSearchByDescription: true,
    slug: store || businessSlug,
    categoryId,
    productId,
    businessNearestState,
    isSlugRequired: true,
    businessProps: [
      'id',
      'name',
      'header',
      'logo',
      'name',
      'open',
      'about',
      'ribbon',
      'description',
      'address',
      'address_notes',
      'location',
      'timezone',
      'schedule',
      'service_fee',
      'delivery_price',
      'distance',
      'delivery_time',
      'gallery',
      'pickup_time',
      'reviews',
      'featured',
      'offers',
      'food',
      'laundry',
      'alcohol',
      'groceries',
      'slug',
      'products',
      'zones',
      'front_layout',
      'professionals',
      'facebook_profile',
      'instagram_profile',
      'tiktok_profile',
      'pinterest_profile',
      'whatsapp_number',
      'snapchat_profile',
      'previously_products',
      'configs',
      'types'
    ],
    handleSearchRedirect: () => {
      events.emit('go_to_page', { page: 'search' })
    },
    onProductRedirect: ({ slug, category, product }) => {
      if (!category && !product) {
        if (businessUrlTemplate === '/store/:business_slug' || businessUrlTemplate === '/:business_slug') {
          return events.emit('go_to_page', { page: 'business', params: { business_slug: slug }, replace: true })
        } else {
          return events.emit('go_to_page', { page: 'business', search: `?${businessUrlTemplate.split('?')[1].replace(':business_slug', '')}${slug}`, replace: true })
        }
      }
      if (productUrlTemplate === '/store/:business_slug/:category_slug/:product_slug' || productUrlTemplate === '/:business_slug/:category_slug/:product_slug') {
        return events.emit('go_to_page', {
          page: 'product',
          params: {
            business_slug: slug,
            category_slug: category,
            product_slug: product
          },
          replace: true
        })
      }
      if (productUrlTemplate.includes('/store/:category_slug/:product_slug')) {
        const businessParameter = businessUrlTemplate.replace('/store?', '').replace('=:business_slug', '')
        return events.emit('go_to_page', {
          page: 'product',
          params: {
            category_slug: category,
            product_slug: product
          },
          search: `?${businessParameter}=${slug}`,
          replace: true
        })
      }
      if (productUrlTemplate.includes('/store/:business_slug') && productUrlTemplate.includes('category_id')) {
        const ids = productUrlTemplate.split('?')[1].split('&')
        const categoryParameter = ids[0].replace('=:category_id', '')
        const productParameter = ids[1].replace('=:product_id', '')
        return events.emit('go_to_page', {
          page: 'product',
          params: {
            business_slug: slug
          },
          search: `?${categoryParameter}=${category}&${productParameter}=${product}`,
          replace: true
        })
      }
      if (productUrlTemplate.includes('/:business_slug') && !productUrlTemplate.includes('store')) {
        const ids = productUrlTemplate.split('?')[1].split('&')
        const categoryParameter = ids[0].replace('=:category_id', '')
        const productParameter = ids[1].replace('=:product_id', '')
        return events.emit('go_to_page', {
          page: 'product',
          params: {
            business_slug: slug
          },
          search: `?${categoryParameter}=${category}&${productParameter}=${product}`,
          replace: true
        })
      }
    },
    onCheckoutRedirect: (cartUuid) => {
      events.emit('go_to_page', { page: 'checkout', params: { cartUuid } })
    },
    onChangeMetaTag: (title, description, keywords) => {
      setHelmetMetaTags({
        title,
        description,
        keywords
      })
    },
    onBusinessClick: (business) => {
      if (businessUrlTemplate === '/store/:business_slug' || businessUrlTemplate === '/:business_slug') {
        events.emit('go_to_page', { page: 'business', params: { business_slug: business.slug } })
      } else {
        events.emit('go_to_page', { page: 'business', search: `?${businessUrlTemplate.split('?')[1].replace(':business_slug', '')}${business.slug}` })
      }
    }
  }

  useEffect(() => {
    if (businessSlug) {
      const metaTitle = capitalize(businessSlug)
      setHelmetMetaTags({
        ...helmetMetaTags,
        title: metaTitle
      })
    }
  }, [businessSlug])

  return (
    <>
      <HelmetTags page='business' helmetMetaTags={helmetMetaTags} />
      <BusinessProductsListing {...businessProductsProps} />
    </>
  )
}

export default BusinessProductsList
