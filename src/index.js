import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { Router } from './router'
import theme from './theme.json'
import smoothscroll from 'smoothscroll-polyfill'

import { OrderingProvider } from '~components'
import { Alert, ThemeProvider, Toast } from '~ui'

/**
 * Theme images
 */
import chewLogo from './assets/images/chew_logo.svg'
import chewLogoReverse from './assets/images/chew_logo_reverse.svg'
import logotype from './assets/images/logotype.svg'
import logotypeInvert from './assets/images/logotype-invert.svg'
import isotype from './assets/images/isotype.svg'
import isotypeInvert from './assets/images/isotype-invert.svg'

import delivered from './assets/icons/delivered.png'
import driver from './assets/icons/driver.png'
import home from './assets/icons/home.png'
import store from './assets/icons/store.png'

import homeHero from './assets/images/home-hero.jpg'
import homeHeroMobile from './assets/images/home-hero-mobile.jpg'
import businessHero from './assets/images/business-hero.jpg'
import notFound from './assets/images/not-found.svg'
import notNetwork from './assets/images/not-network.svg'
import notFound404 from './assets/images/not-found-404.svg'
import notFoundLighting from './assets/images/not-found-lighting.svg'
import searchIcon from './assets/images/search-icon.svg'
import emptyActiveOrders from './assets/images/empty-active-orders.svg'
import emptyPastOrders from './assets/images/empty-past-orders.svg'
import visa from './assets/images/visa.jpg'
import mastercard from './assets/images/mastercard.jpg'
import credit from './assets/images/credit.jpg'
import businessSignUpHero from './assets/images/business_signup.jpg'
import amex from './assets/images/amex.svg'
import diners from './assets/images/diners.svg'
import discover from './assets/images/discover.svg'
import jcb from './assets/images/jcb.svg'
import unionpay from './assets/images/unionpay.svg'
import businessSignUpBG from './assets/images/business-signup-background.jpg'
import CongratulationApproval from './assets/images/congratulation_approval.jpg'
import CongratulationNoApproval from './assets/images/congratulation_no_approval.jpg'
import driverSignUpBG from './assets/images/driver-signup-background.jpg'
import driverCongratulationApproval from './assets/images/driver_congratulation_approval.jpg'
import driverCongratulationNoApproval from './assets/images/driver_congratulation_no_approval.jpg'
import driverSignUpHero from './assets/images/driver-signup-hero.jpg'
import loyaltyLevel from './assets/images/loyalty_level.jpg'
import driverPng from './assets/images/driver.png'

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

import categoryFood from './assets/images/categories/category-food.jpg'
import categoryGroceries from './assets/images/categories/category-groceries.jpg'
import categoryAlcohol from './assets/images/categories/category-alcohol.jpg'
import categoryLaundry from './assets/images/categories/category-laundry.jpg'
import categoryAll from './assets/images/categories/category-all.jpg'

import productDummy from './assets/images/dummies/product.jpg'
import storeDummy from './assets/images/dummies/store.jpg'

import leftArrow from './assets/left-arrow.svg'
import rightArrow from './assets/right-arrow.svg'

import delivery from './assets/images/delivery-types/delivery.jpg'
import curbside from './assets/images/delivery-types/curbside.jpg'
import driveThru from './assets/images/delivery-types/drive_thru.jpg'
import eatIn from './assets/images/delivery-types/eat_in.jpg'
import pickUp from './assets/images/delivery-types/pickup.jpg'
import cateringDelivery from './assets/images/delivery-types/catering_delivery.png'
import cateringPickup from './assets/images/delivery-types/catering_pickup.png'
import deliveryIco from './assets/images/delivery.svg'
import pickupIco from './assets/images/pickup.svg'
import eatinIco from './assets/images/eatin.svg'
import curbsideIco from './assets/images/curbside.svg'
import drivethruIco from './assets/images/drivethru.svg'
import cateringIco from './assets/images/catering.svg'
import { SubdomainComponent } from './components/SubdomainComponent'

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: 'https://a63b9a3c8fdd5f9728117c2c87eef919@o460529.ingest.sentry.io/4507052207636480',
  release: process.env.npm_package_version ? 'react-ordering-website@' + process.env.npm_package_version : 'react-ordering-website@' + '1.0.0',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.2,
  // Release health
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  ignoreErrors: [
    'TypeError: Failed to fetch',
    'TypeError: NetworkError when attempting to fetch resource.',
    'TypeError: Cancelled',
    'TypeError: cancelado',
    'is not defined',
    "Can't find variable",
    'NotAllowedError',
    'SecurityError',
    'Element type is invalid',
    'undefined is not an object',
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage',
    // Generic error code from errors outside the security sandbox
    // You can delete this if using raven.js > 1.0, which ignores these automatically.
    'Script error.',
    // Avast extension error
    '_avast_submit'
  ],
  denyUrls: [
    // Google Adsense
    /pagead\/js/i,
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
  ]
})

const logos = {
  logotype,
  logotypeInvert,
  isotype,
  isotypeInvert,
  chewLogo,
  chewLogoReverse
}

theme.images = {
  logos,
  general: {
    homeHero,
    homeHeroMobile,
    businessHero,
    notFound,
    notFound404,
    notFoundLighting,
    searchIcon,
    notNetwork,
    emptyActiveOrders,
    emptyPastOrders,
    visa,
    amex,
    diners,
    discover,
    jcb,
    unionpay,
    mastercard,
    credit,
    businessSignUpHero,
    businessSignUpBG,
    CongratulationApproval,
    CongratulationNoApproval,
    driverSignUpBG,
    driverCongratulationApproval,
    driverCongratulationNoApproval,
    driverSignUpHero,
    leftArrow,
    rightArrow,
    deliveryIco,
    pickupIco,
    eatinIco,
    curbsideIco,
    drivethruIco,
    cateringIco,
    driverPng
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

smoothscroll.polyfill()

const root = ReactDOM.createRoot(document.getElementById('app'))
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
