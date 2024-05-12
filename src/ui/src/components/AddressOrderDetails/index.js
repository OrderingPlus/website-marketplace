import React, { useState } from 'react'
import { AddressOrderDetailsTitle, BlockInfo, Divider, AddressOrderDetailsContainer } from '../AdvancedAddressForm/styles'
import { useConfig, useLanguage, useOrder, useUtils } from '~components'
import {
  Modal,
  MomentContent
} from '~ui'
import RiRadioButtonFill from '@meronex/icons/ri/RiRadioButtonFill'
import MdRadioButtonUnchecked from '@meronex/icons/md/MdRadioButtonUnchecked'

export const AddressOrderDetails = (props) => {
  const {
    businessNearestState
  } = props
  const [, t] = useLanguage()
  const [{ parseDate }] = useUtils()
  const [{ configs }] = useConfig()
  const [orderState] = useOrder()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isPreorderEnabled = (configs?.preorder_status_enabled?.value === '1' || configs?.preorder_status_enabled?.value === 'true')

  const handleOpenPreorder = () => {
    setModalIsOpen(true)
  }

  return (
    <>
      <AddressOrderDetailsContainer>
        <h4>
          {t('ORDER_DETAILS', 'ORDER DETAILS')}
        </h4>
        <Divider />
        <BlockInfo>
          <AddressOrderDetailsTitle>
            {t('YOUR_STORE', 'Your store')}
          </AddressOrderDetailsTitle>
          <div>
            <p>
              {businessNearestState?.business?.name}
            </p>
            <p>
              {businessNearestState?.business?.address}
            </p>
            {businessNearestState?.business?.cellphone && (
              <p>
                {businessNearestState?.business?.cellphone}
              </p>
            )}
          </div>
        </BlockInfo>
        <BlockInfo>
          <AddressOrderDetailsTitle>
            {t('SERVICE_METHOD', 'Service method')}
          </AddressOrderDetailsTitle>
          <div>
            <p>
              {orderState.options?.type === 1
                ? t('DELIVERY', 'Delivery')
                : orderState.options?.type === 2
                  ? t('PICKUP', 'Pickup')
                  : t('OTHER', 'Other')
              }
            </p>
          </div>
        </BlockInfo>
        <BlockInfo>
          <AddressOrderDetailsTitle>
            {t('WHEN_YOU_WANT_YOUR_ORDER', 'When you want your order?')}
          </AddressOrderDetailsTitle>
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <div onClick={() => handleOpenPreorder()}>
              <p>
                {!orderState.options?.moment ? <RiRadioButtonFill /> : <MdRadioButtonUnchecked disabled />}
                {t('ASAP', 'ASAP')}
              </p>
              {isPreorderEnabled && (
                <p>
                  {orderState.options?.moment ? <RiRadioButtonFill /> : <MdRadioButtonUnchecked disabled />}
                  {t('SCHEDULE_YOUR_ORDER', 'Schedule your order')}
                  {orderState.options?.moment && ` (${parseDate(orderState.options?.moment, { outputFormat: configs?.dates_moment_format?.value })})`}
                </p>
              )}
            </div>
          </div>
        </BlockInfo>
      </AddressOrderDetailsContainer>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        width='700px'
      >
        <MomentContent
          onClose={() => setModalIsOpen(false)}
        />
      </Modal>
    </>
  )
}
