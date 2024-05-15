import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  GeoAlt
} from 'react-bootstrap-icons'
import {
  BusinessContainer,
  BusinessList,
  AddressFormWrapper,
  AddressMenu,
  Divider,
  PaginationWrapper,
  BusinessListingContainer
} from './styles'

import {
  useOrder,
  useSession,
  useLanguage,
  useConfig,
  BusinessList as BusinessListController
} from '~components'

import {
  Button,
  NotFoundSource,
  Modal,
  Alert,
  getCateringValues,
  BusinessController,
  BusinessPreorder,
  CitiesControl,
  AddressList,
  AddressForm,
  Tab,
  Pagination,
  BusinessesMap,
  useBusinessSelected
} from '~ui'
import { TabsContainer } from '../../../RenderProductsLayout/styles'

const BusinessesListingUI = (props) => {
  const {
    businessesList,
    paginationProps,
    getBusinesses,
    isCustomLayout,
    isCustomerMode,
    handleBusinessClick,
    onBusinessClick,
    handleUpdateBusinessList,
    citiesState,
    getFavoriteList
  } = props
  const [, t] = useLanguage()
  const [orderState, { changeCityFilter }] = useOrder()
  const [{ auth }] = useSession()
  const [{ configs }] = useConfig()
  const [, { onChangeBusinessSelected }] = useBusinessSelected()

  const theme = useTheme()
  const [modals, setModals] = useState({ listOpen: false, formOpen: false, citiesOpen: false })
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [mapErrors, setMapErrors] = useState('')
  const [isPreorder, setIsPreorder] = useState(false)
  const [preorderBusiness, setPreorderBusiness] = useState(null)
  const userCustomer = JSON.parse(window.localStorage.getItem('user-customer'))
  const [favoriteIds, setFavoriteIds] = useState([])
  const [tabSelected, setTabSelected] = useState(2)

  const cateringTypeString = orderState?.options?.type === 7
    ? 'catering_delivery'
    : orderState?.options?.type === 8
      ? 'catering_pickup'
      : null
  const cateringValues = preorderBusiness?.configs && getCateringValues(cateringTypeString, preorderBusiness?.configs)

  const handleClickAddress = (e) => {
    if (auth) {
      setModals({ ...modals, listOpen: true })
    } else {
      setModals({ ...modals, formOpen: true })
    }
  }

  const handleCloseAlerts = () => {
    setAlertState({ open: false, content: [] })
    setMapErrors('')
  }

  const handleMapErrors = (errKey) => {
    setAlertState({
      open: true,
      content: [t(errKey, mapErrors[errKey])]
    })
  }

  useEffect(() => {
    if (mapErrors) {
      handleMapErrors(mapErrors)
    }
  }, [mapErrors])

  const handleClosePreorder = () => {
    setIsPreorder(false)
    setPreorderBusiness(null)
  }

  const handleChangeCity = (cityId) => {
    changeCityFilter(cityId === orderState?.options?.city_id ? null : cityId)
  }

  const handleChangeTab = (val) => {
    setTabSelected(val)
    val === 1 ? getFavoriteList(1, 5) : getBusinesses(true)
  }

  const businessControllerProps = {
    className: 'card',
    handleCustomClick: handleBusinessClick,
    orderType: orderState?.options?.type,
    onPreorderBusiness: setPreorderBusiness,
    handleUpdateBusinessList,
    favoriteIds,
    setFavoriteIds
  }

  useEffect(() => {
    if (preorderBusiness) setIsPreorder(true)
  }, [preorderBusiness])

  useEffect(() => {
    if (!businessesList?.businesses?.length) return
    if (businessesList?.businesses?.length === 1 && configs?.activate_single_store_automatically?.value === '1') {
      onBusinessClick(businessesList?.businesses[0])
      window.localStorage.setItem('single_business', true)
      return
    }
    window.localStorage.removeItem('single_business')
    const ids = [...favoriteIds]
    businessesList.businesses.forEach(business => {
      if (business?.favorite) {
        ids.push(business.id)
      }
    })
    setFavoriteIds([...new Set(ids)])
  }, [businessesList?.businesses?.length])

  useEffect(() => {
    if (!citiesState?.cities?.length || !orderState?.options?.city_id) return
    const selectedCity = citiesState?.cities?.find(city => city?.id === orderState?.options?.city_id)
    if (!selectedCity || !selectedCity?.enabled) changeCityFilter(null)
  }, [citiesState, orderState?.options?.city_id])

  return (
    <BusinessContainer>
      <BusinessListingContainer>

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
              {t('YOUR_STORES', 'YOUR STORES')}
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
              {t('NEAR_STORES', 'NEAR STORES')}
            </p>
          </Tab>
        </TabsContainer>
        <AddressMenu>
          <span>
            {<GeoAlt />}
            {orderState.options?.address?.address || t('WHERE_DO_WE_DELIVERY', 'Where do we delivery?')}
          </span>
        </AddressMenu>

        <>
          <BusinessList>
            <Divider />
            {
              !businessesList.loading && businessesList.businesses.length === 0 && businessesList?.fetched && (
                <NotFoundSource
                  content={t('NOT_FOUND_BUSINESSES', 'No businesses to delivery / pick up at this address, please change filters or change address.')}
                >
                  <Button
                    outline
                    color='primary'
                    onClick={() => handleClickAddress()}
                    style={{ height: '44px' }}
                  >
                    {t('CHANGE_ADDRESS', 'Select other Address')}
                  </Button>
                </NotFoundSource>
              )
            }
            {
              businessesList.businesses?.map((business) => (
                <BusinessController
                  key={business.id}
                  className='card'
                  business={business}
                  isBusinessOpen={business.open && business?.enabled !== false}
                  handleCustomClick={handleBusinessClick}
                  orderType={orderState?.options?.type}
                  isCustomLayout={isCustomLayout}
                  isCustomerMode={isCustomerMode}
                  onPreorderBusiness={setPreorderBusiness}
                  businessHeader={business?.header}
                  businessFeatured={business?.featured}
                  businessOffers={business?.offers}
                  businessLogo={business?.logo}
                  businessReviews={business?.reviews?.total}
                  businessDeliveryPrice={business?.delivery_price}
                  businessDeliveryTime={business?.delivery_time}
                  businessPickupTime={business?.pickup_time}
                  businessDistance={business?.distance}
                  handleUpdateBusinessList={handleUpdateBusinessList}
                  favoriteIds={favoriteIds}
                  setFavoriteIds={setFavoriteIds}
                />
              ))
            }
            {(businessesList.loading || !businessesList?.fetched) && (
              [...Array(paginationProps?.nextPageItems > 4 ? paginationProps.nextPageItems : 8).keys()].map(i => (
                <BusinessController
                  key={i}
                  className='card'
                  business={{}}
                  isSkeleton
                  orderType={orderState?.options?.type}
                />
              ))
            )}
          </BusinessList>
          <PaginationWrapper>
            <Pagination
              currentPage={paginationProps.currentPage}
              totalPages={Math.ceil(paginationProps?.totalPages)}
              handleChangePage={(page) => tabSelected === 1 ? getFavoriteList && getFavoriteList(page, 5) : getBusinesses(true, page)}
            />
          </PaginationWrapper>
        </>
      </BusinessListingContainer>
      <BusinessesMap
        businessControllerProps={businessControllerProps}
        businessList={businessesList.businesses}
        userLocation={orderState?.options?.address?.location}
        onBusinessCustomClick={(slug, business) => onChangeBusinessSelected(business)}
      />
      {isPreorder && (
        <Modal
          open={isPreorder}
          width='760px'
          onClose={() => handleClosePreorder()}
        >
          <BusinessPreorder
            business={preorderBusiness}
            handleClick={handleBusinessClick}
            showButton
            cateringPreorder={!!cateringTypeString}
            {...cateringValues}
          />
        </Modal>
      )}
      {modals.citiesOpen && (
        <Modal
          open={modals.citiesOpen}
          width='70%'
          onClose={() => setModals({ ...modals, citiesOpen: false })}
          padding='0px'
          hideCloseDefault
        >
          <CitiesControl
            cities={citiesState?.cities}
            handleChangeCity={handleChangeCity}
            onClose={() => setModals({ ...modals, citiesOpen: false })}
          />
        </Modal>
      )}
      {(modals.formOpen || modals.listOpen) && (
        <Modal
          {...(!auth && { title: t('WHAT_IS_YOUR_ADDRESS', 'What\'s your address?') })}
          open={modals.formOpen || modals.listOpen}
          width='70%'
          onClose={() => setModals({ ...modals, formOpen: false, listOpen: false })}
        >
          {modals.listOpen
            ? (
              <AddressList
                isModal
                changeOrderAddressWithDefault
                userId={isNaN(userCustomer?.id) ? null : userCustomer?.id}
                onCancel={() => setModals({ ...modals, listOpen: false })}
                isCustomerMode={isCustomerMode}
              />
              )
            : (
              <AddressFormWrapper>
                <AddressForm
                  useValidationFileds
                  address={orderState?.options?.address || {}}
                  onCancel={() => setModals({ ...modals, formOpen: false })}
                  onSaveAddress={() => setModals({ ...modals, formOpen: false })}
                  isCustomerMode={isCustomerMode}
                />
              </AddressFormWrapper>
              )}
        </Modal>
      )}

      <Alert
        title={!mapErrors ? t('SEARCH', 'Search') : t('BUSINESSES_MAP', 'Businesses Map')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => handleCloseAlerts()}
        onAccept={() => handleCloseAlerts()}
        closeOnBackdrop={false}
      />
    </BusinessContainer>
  )
}

export const OriginalBusinessesListing = (props) => {
  const [, t] = useLanguage()
  const businessListingProps = {
    ...props,
    UIComponent: BusinessesListingUI,
    paginationSettings: { initialPage: 1, pageSize: 5, controlType: 'infinity' },
    orderTypes: props.orderTypes || [
      {
        value: 1,
        text: t('DELIVERY', 'Delivery'),
        description: t('ORDERTYPE_DESCRIPTION_DELIVERY', 'Delivery description')
      },
      {
        value: 2,
        text: t('PICKUP', 'Pickup'),
        description: t('ORDERTYPE_DESCRIPTION_PICKUP', 'Pickup description')
      },
      {
        value: 3,
        text: t('EAT_IN', 'Eat in'),
        description: t('ORDERTYPE_DESCRIPTION_EATIN', 'Eat in description')
      },
      {
        value: 4,
        text: t('CURBSIDE', 'Curbside'),
        description: t('ORDERTYPE_DESCRIPTION_CURBSIDE', 'Curbside description')
      },
      {
        value: 5,
        text: t('DRIVE_THRU', 'Drive thru'),
        description: t('ORDERTYPE_DESCRIPTION_DRIVETHRU', 'Drive Thru description')
      }
    ]
  }
  return <BusinessListController {...businessListingProps} />
}
