import React, { useRef } from 'react'
import { OrderTypeControl, useLanguage, useConfig, useOrder } from '~components'
import { Select } from '~ui'

import FaCarSide from '@meronex/icons/fa/FaCarSide'
import FaTruckPickup from '@meronex/icons/fa/FaTruckPickup'
import MdcTruckDeliveryOutline from '@meronex/icons/mdc/MdcTruckDeliveryOutline'
import AiFillShop from '@meronex/icons/ai/AiFillShop'
import GiFoodTruck from '@meronex/icons/gi/GiFoodTruck'

import { Option, OrderTypeWrapper, SelectedOption, ContentOption, HeaderItem } from './styles'

const OrderTypeSelectorHeaderUI = (props) => {
  const {
    handleChangeOrderType,
    typeSelected,
    defaultValue,
    configTypes,
    orderTypes,
    customView,
    isFullClick,
    orderTypeList,
    autoCloseWhenScroll
  } = props

  const [{ configs }] = useConfig()
  const [orderStatus] = useOrder()
  const [, t] = useLanguage()
  const referenceElement = useRef()
  const defaultType = configTypes?.includes(typeSelected) ? null : configTypes?.[0]

  return (
    <>
      {customView
        ? <OrderTypeWrapper>
            <Select
              autoCloseWhenScroll={autoCloseWhenScroll}
              options={configTypes
                ? orderTypes.filter(type => configTypes?.includes(type.value))
                : orderTypes
              }
              defaultValue={defaultType || typeSelected || defaultValue}
              onChange={(orderType) => handleChangeOrderType(orderType)}
            />
          </OrderTypeWrapper>
        : <div
            className='order-type'
            style={{
              ...props.containerStyle,
              ...(isFullClick && { width: '100%', padding: 0 })
            }}
            onClick={isFullClick && props.onClick}
          >
            <HeaderItem
              ref={referenceElement}
              onClick={configs?.max_days_preorder?.value === -1 || configs?.max_days_preorder?.value === 0 || isFullClick
                ? null
                : props.onClick}
            >
              {(orderTypeList && orderTypeList[orderStatus?.options.type - 1]) || t('DELIVERY', 'Delivery')}
            </HeaderItem>
          </div>}
    </>
  )
}

export const OrderTypeSelectorHeader = (props) => {
  const [, t] = useLanguage()

  const orderTypeProps = {
    ...props,
    UIComponent: OrderTypeSelectorHeaderUI,
    orderTypes: props.orderTypes || [
      {
        value: 1,
        content: <Option><MdcTruckDeliveryOutline /><ContentOption>{t('DELIVERY', 'Delivery')}</ContentOption></Option>,
        showOnSelected: <Option><MdcTruckDeliveryOutline /><SelectedOption>{t('DELIVERY', 'Delivery')}</SelectedOption></Option>
      },
      {
        value: 2,
        content: <Option><FaTruckPickup /><ContentOption>{t('PICKUP', 'Pickup')}</ContentOption></Option>,
        showOnSelected: <Option><FaTruckPickup /><SelectedOption>{t('PICKUP', 'Pickup')}</SelectedOption></Option>
      },
      {
        value: 3,
        content: <Option><AiFillShop /><ContentOption>{t('EAT_IN', 'Eat in')}</ContentOption></Option>,
        showOnSelected: <Option><AiFillShop /><SelectedOption>{t('EAT_IN', 'Eat in')}</SelectedOption></Option>
      },
      {
        value: 4,
        content: <Option><GiFoodTruck /><ContentOption>{t('CURBSIDE', 'Curbside')}</ContentOption></Option>,
        showOnSelected: <Option><GiFoodTruck /><SelectedOption>{t('CURBSIDE', 'Curbside')}</SelectedOption></Option>
      },
      {
        value: 5,
        content: <Option><FaCarSide /><ContentOption>{t('DRIVE_THRU', 'Drive thru')}</ContentOption></Option>,
        showOnSelected: <Option><FaCarSide /><SelectedOption>{t('DRIVE_THRU', 'Drive thru')}</SelectedOption></Option>
      }
    ]
  }

  return <OrderTypeControl {...orderTypeProps} />
}
