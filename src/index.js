import React from 'react'
import ReactDOM from 'react-dom/client'
import smoothscroll from 'smoothscroll-polyfill'
import * as Sentry from '@sentry/react'

import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { Router } from './router'
import theme from './theme.json'
import settings from './config'

import { OrderingProvider } from '~components'
import { Alert, ThemeProvider, Toast } from '~ui'
import { SubdomainComponent } from './components/SubdomainComponent'

/**
 * Theme images
 */

import leftArrow from './assets/left-arrow.svg'
import rightArrow from './assets/right-arrow.svg'

import delivered from './assets/icons/delivered.png'
import driver from './assets/icons/driver.png'
import home from './assets/icons/home.png'
import store from './assets/icons/store.png'

import categoryFood from './assets/images/categories/category-food.jpg'
import categoryGroceries from './assets/images/categories/category-groceries.jpg'
import categoryAlcohol from './assets/images/categories/category-alcohol.jpg'
import categoryLaundry from './assets/images/categories/category-laundry.jpg'
import categoryAll from './assets/images/categories/category-all.jpg'

import delivery from './assets/images/delivery-types/delivery.jpg'
import curbside from './assets/images/delivery-types/curbside.jpg'
import driveThru from './assets/images/delivery-types/drive_thru.jpg'
import eatIn from './assets/images/delivery-types/eat_in.jpg'
import pickUp from './assets/images/delivery-types/pickup.jpg'
import cateringDelivery from './assets/images/delivery-types/catering_delivery.png'
import cateringPickup from './assets/images/delivery-types/catering_pickup.png'

import productDummy from './assets/images/dummies/product.jpg'
import storeDummy from './assets/images/dummies/store.jpg'

import orderStatus0 from './assets/images/order/status-0.svg'
import orderStatus1 from './assets/images/order/status-1.svg'
import orderStatus2 from './assets/images/order/status-2.svg'
import orderStatus3 from './assets/images/order/status-3.svg'
import orderStatus4 from './assets/images/order/status-4.svg'
import orderStatus5 from './assets/images/order/status-5.svg'
import orderStatus6 from './assets/images/order/status-6.svg'
import orderStatus7 from './assets/images/order/status-7.svg'
import orderStatus8 from './assets/images/order/status-8.svg'
import orderStatus9 from './assets/images/order/status-9.svg'
import orderStatus10 from './assets/images/order/status-10.svg'
import orderStatus11 from './assets/images/order/status-11.svg'
import orderStatus12 from './assets/images/order/status-12.svg'
import orderStatus13 from './assets/images/order/status-13.svg'
import orderStatus14 from './assets/images/order/status-14.svg'
import orderStatus15 from './assets/images/order/status-15.svg'
import orderStatus16 from './assets/images/order/status-16.svg'
import orderStatus17 from './assets/images/order/status-17.svg'
import orderStatus18 from './assets/images/order/status-18.svg'
import orderStatus19 from './assets/images/order/status-19.svg'
import orderStatus20 from './assets/images/order/status-20.svg'
import orderStatus21 from './assets/images/order/status-21.svg'

import logotype from './assets/images/logotype.svg'
import logotypeInvert from './assets/images/logotype-invert.svg'
import isotype from './assets/images/isotype.svg'
import isotypeInvert from './assets/images/isotype-invert.svg'

import amex from './assets/images/amex.svg'
import businessSignUpHero from './assets/images/business_signup.jpg'
import businessHero from './assets/images/business-hero.jpg'
import businessSignUpBG from './assets/images/business-signup-background.jpg'
import CongratulationApproval from './assets/images/congratulation_approval.jpg'
import CongratulationNoApproval from './assets/images/congratulation_no_approval.jpg'
import credit from './assets/images/credit.jpg'
import deliveryIco from './assets/images/delivery.svg'
import diners from './assets/images/diners.svg'
import discover from './assets/images/discover.svg'
import driverCongratulationApproval from './assets/images/driver_congratulation_approval.jpg'
import driverCongratulationNoApproval from './assets/images/driver_congratulation_no_approval.jpg'
import driverSignUpBG from './assets/images/driver-signup-background.jpg'
import driverSignUpHero from './assets/images/driver-signup-hero.jpg'
import driverPng from './assets/images/driver.png'
import emptyActiveOrders from './assets/images/empty-active-orders.svg'
import emptyPastOrders from './assets/images/empty-past-orders.svg'
import homeHeroMobile from './assets/images/home-hero-mobile.jpg'
import homeHero from './assets/images/home-hero.jpg'
import jcb from './assets/images/jcb.svg'
import loyaltyLevel from './assets/images/loyalty_level.jpg'
import mastercard from './assets/images/mastercard.jpg'
import notFound404 from './assets/images/not-found-404.svg'
import notFoundLighting from './assets/images/not-found-lighting.svg'
import notFound from './assets/images/not-found.svg'
import notNetwork from './assets/images/not-network.svg'
import pickupIco from './assets/images/pickup.svg'
import searchIcon from './assets/images/search-icon.svg'
import unionpay from './assets/images/unionpay.svg'
import visa from './assets/images/visa.jpg'

const sentryDNS = settings.sentry_key
Sentry.init({
  environment: window?.location?.hostname === 'localhost' ? 'development' : process.env.NODE_ENV,
  release: process.env.npm_package_version ? 'react-ordering-website@' + process.env.npm_package_version : 'react-ordering-website@' + '1.0.1',
  dsn: sentryDNS,
  integrations: [
    Sentry.browserTracingIntegration()
  ],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: window?.location?.hostname === 'localhost' ? 0 : 0.5,
  // Release health
  autoSessionTracking: true
})

const logos = {
  logotype,
  logotypeInvert,
  isotype,
  isotypeInvert
}

theme.images = {
  logos,
  general: {
    leftArrow,
    rightArrow,
    amex,
    businessSignUpHero,
    businessHero,
    businessSignUpBG,
    CongratulationApproval,
    CongratulationNoApproval,
    credit,
    deliveryIco,
    diners,
    discover,
    driverCongratulationApproval,
    driverCongratulationNoApproval,
    driverSignUpBG,
    driverSignUpHero,
    driverPng,
    emptyActiveOrders,
    emptyPastOrders,
    homeHeroMobile,
    homeHero,
    jcb,
    loyaltyLevel,
    mastercard,
    notFound404,
    notFoundLighting,
    notFound,
    notNetwork,
    pickupIco,
    searchIcon,
    unionpay,
    visa
  },
  icons: {
    delivered,
    driver,
    home,
    store
  },
  order: {
    status0: orderStatus0,
    status1: orderStatus1,
    status2: orderStatus2,
    status3: orderStatus3,
    status4: orderStatus4,
    status5: orderStatus5,
    status6: orderStatus6,
    status7: orderStatus7,
    status8: orderStatus8,
    status9: orderStatus9,
    status10: orderStatus10,
    status11: orderStatus11,
    status12: orderStatus12,
    status13: orderStatus13,
    status14: orderStatus14,
    status15: orderStatus15,
    status16: orderStatus16,
    status17: orderStatus17,
    status18: orderStatus18,
    status19: orderStatus19,
    status20: orderStatus20,
    status21: orderStatus21
  },
  categories: {
    food: categoryFood,
    groceries: categoryGroceries,
    alcohol: categoryAlcohol,
    laundry: categoryLaundry,
    all: categoryAll
  },
  dummies: {
    product: productDummy,
    driverPhoto: 'https://res.cloudinary.com/demo/image/fetch/c_thumb,g_face,r_max/https://www.freeiconspng.com/thumbs/driver-icon/driver-icon-14.png',
    businessLogo: storeDummy,
    customerPhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,r_max/d_avatar.png/non_existing_id.png',
    loyaltyLevel
  },
  deliveryTypes: {
    delivery,
    curbside,
    driveThru,
    eatIn,
    pickUp,
    cateringDelivery,
    cateringPickup
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <SubdomainComponent>
      <OrderingProvider Alert={Alert}>
        <Router />
        <Toast />
      </OrderingProvider>
    </SubdomainComponent>
  </ThemeProvider>
)

/* `smoothscroll.polyfill()` is a method that adds smooth scrolling behavior to the webpage. This
polyfill is used to provide smooth scrolling functionality in browsers that do not support it
natively. It ensures that scrolling behavior is consistent across different browsers by adding the
necessary functionality to enable smooth scrolling. */
smoothscroll.polyfill()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
