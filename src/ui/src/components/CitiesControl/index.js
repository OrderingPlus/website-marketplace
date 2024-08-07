import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IosRadioButtonOff from '@meronex/icons/ios/IosRadioButtonOff'
import RiRadioButtonFill from '@meronex/icons/ri/RiRadioButtonFill'
import BsArrowRight from '@meronex/icons/bs/BsArrowRight'
import MdClose from '@meronex/icons/md/MdClose'

import { ButtonWrapper, CityItem, Container, SearchBarContainer } from './styles'
import { useLanguage, useOrder } from '~components'
import { Button, SearchBar } from '~ui'
import { ModalHeader, ModalIcon, ModalIconWrapper, ModalTitle } from '../Modal/styles'

export const CitiesControl = (props) => {
  const {
    cities,
    onClose,
    handleChangeCity
  } = props

  const [, t] = useLanguage()
  const [orderState] = useOrder()

  const [cityState, setCityState] = useState(orderState?.options?.city_id)
  const [cityFilter, setCityFilter] = useState('')
  const handleClick = () => {
    cityState !== orderState?.options?.city_id && handleChangeCity(cityState)
    onClose && onClose()
  }

  return (
    <>
      <Container>
        <ModalIconWrapper>
          <ModalIcon>
            {
              <MdClose onClick={() => onClose()} />
            }
          </ModalIcon>
        </ModalIconWrapper>
        <ModalHeader>
          <ModalTitle>
            {t('SELECT_A_STORE', 'Select a store')}
          </ModalTitle>
        </ModalHeader>
        {
          orderState?.loading
            ? (
            <Skeleton height={40} count={3} style={{ marginBottom: '10px' }} />
              )
            : (
            <>
              <SearchBarContainer>
                <SearchBar
                  name='city-filter'
                  placeholder={t('SEARCH_CITIES', 'Search Cities')}
                  onSearch={(val) => setCityFilter(val)}
                  search={cityFilter}
                />
              </SearchBarContainer>
              {cities?.filter(city => city?.name?.toLowerCase?.()?.includes(cityFilter?.toLowerCase?.()))?.map(city => city?.enabled && (
                <CityItem key={city?.id} onClick={() => setCityState(city?.id === cityState ? null : city?.id)}>
                  <span className='radio'>
                    {city?.id === cityState
                      ? <RiRadioButtonFill className='city-checked' />
                      : <IosRadioButtonOff />}
                  </span>
                  {city?.name}
                </CityItem>
              ))}

            </>
              )
        }
      </Container>
      <ButtonWrapper>
        <Button color='primary' onClick={() => handleClick()}>
          {t('CONTINUE', 'Continue')}
        </Button>
        <BsArrowRight />
      </ButtonWrapper>
    </>
  )
}
