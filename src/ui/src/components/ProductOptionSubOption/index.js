import React, { useState, useEffect, useRef } from 'react'
import BsCircleFill from '@meronex/icons/bs/BsCircleFill'
import BsCircleHalf from '@meronex/icons/bs/BsCircleHalf'
import BsDashCircle from '@meronex/icons/bs/BsDashCircle'
import BsPlusCircle from '@meronex/icons/bs/BsPlusCircle'

import {
  Container,
  QuantityControl,
  PositionControl,
  Text,
  RightOptionContainer,
  HeaderSuboption,
  AddRemoveControl
} from './styles'

import {
  ProductOptionSuboption as ProductSubOptionController,
  useLanguage
} from '~components'

import { Alert } from '~ui'

const ProductOptionSubOptionPropsAreEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.state) === JSON.stringify(nextProps.state) &&
    JSON.stringify(prevProps.pizzaState) === JSON.stringify(nextProps.pizzaState) &&
    prevProps.balance === nextProps.balance &&
    JSON.stringify(prevProps.productCart) === JSON.stringify(nextProps.productCart)
}

const ProductOptionSubOptionUI = React.memo((props) => {
  const {
    state,
    increment,
    decrement,
    balance,
    option,
    suboption,
    toggleSelect,
    changePosition,
    isSoldOut,
    setIsScrollAvailable,
    usePizzaValidation,
    pizzaState,
    disabled
  } = props

  const disableIncrement =
    option?.with_half_option
      ? pizzaState?.[`option:${option?.id}`]?.value >= option?.max
      : option?.limit_suboptions_by_max
        ? (balance === option?.max || state.quantity === suboption.max)
        : state.quantity === suboption?.max || (!state.selected && balance === option?.max)

  const [, t] = useLanguage()
  const [showMessage, setShowMessage] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const dirtyRef = useRef(null)

  const handleIncrement = (e) => {
    e.stopPropagation()
    increment()
  }

  const handleDecrement = (e) => {
    e.stopPropagation()
    decrement()
  }

  const handlePosition = (e, position) => {
    e.stopPropagation && e.stopPropagation()
    changePosition(position)
  }

  const handleSuboptionClick = () => {
    dirtyRef.current = true
    toggleSelect()
    const minMaxValidation = option?.with_half_option ? usePizzaValidation : (balance === option?.max && option?.suboptions?.length > balance && !(option?.min === 1 && option?.max === 1))
    if (!state.selected && minMaxValidation) {
      setShowMessage(true)
      setShowAlert(true)
    }
  }

  useEffect(() => {
    const minMaxValidation = option?.with_half_option ? usePizzaValidation : (!state.selected && balance === option?.max && option?.suboptions?.length > balance && !(option?.min === 1 && option?.max === 1))
    if (!minMaxValidation) {
      setShowMessage(false)
    }
  }, [balance, pizzaState?.[`option:${option?.id}`]?.value])

  useEffect(() => {
    if (balance === option?.max && state?.selected && dirtyRef) {
      if (dirtyRef?.current !== null) {
        dirtyRef.current = false
        setIsScrollAvailable(true)
      }
    }
  }, [state?.selected])

  return (
    <>
      <Container onClick={() => handleSuboptionClick()}>
        <HeaderSuboption>
          <Text>
            {suboption?.name}
          </Text>
          <AddRemoveControl disabled={disabled} onPress={() => handleSuboptionClick()}>
            {state?.selected
              ? (
                <Text>
                  {t('TOUCH_FOR_DELETE', 'Touch for delete')}
                </Text>
                )
              : (
                <Text>
                  {t('TOUCH_FOR_ADD', 'Touch for add')}
                </Text>
                )}
          </AddRemoveControl>
        </HeaderSuboption>
        <RightOptionContainer>
          <PositionControl>
            {
              option?.with_half_option && state?.selected && (
                <>
                  <BsCircleHalf
                    className={[
                      'reverse',
                      state.selected && state.position === 'left' ? 'selected' : null].filter(classname => classname).join(' ')}
                    onClick={(e) => handlePosition(e, 'left')}
                  />
                  <BsCircleFill
                    className={[
                      (pizzaState?.[`option:${option?.id}`]?.value >= option?.max) && !(option?.max === 1 && option?.min === 1) ? 'disabled' : '',
                      state.selected && state.position === 'whole' ? 'selected' : null].filter(classname => classname).join(' ')}
                    onClick={(e) => handlePosition(e, 'whole')}
                  />
                  <BsCircleHalf
                    className={[
                      state.selected && state.position === 'right' ? 'selected' : null].filter(classname => classname).join(' ')}
                    onClick={(e) => handlePosition(e, 'right')}
                  />
                </>
              )
            }
          </PositionControl>
          <QuantityControl>
            {!(option?.max === 1 && option?.min === 1) && option?.allow_suboption_quantity && state?.selected && (
              <>
                <BsDashCircle
                  disabled={state.quantity === 0 || isSoldOut}
                  onClick={handleDecrement}
                />
                {state.quantity}
                <BsPlusCircle
                  disabled={disableIncrement || isSoldOut || usePizzaValidation}
                  onClick={handleIncrement}
                />
              </>
            )}
          </QuantityControl>
        </RightOptionContainer>

      </Container>
      {showMessage && (
        <Text noMargin>
          <span>{`${t('OPTIONS_MAX_LIMIT', 'Maximum options to choose')}: ${option?.max}`}</span>
        </Text>
      )}
      <Alert
        title={t('PRODUCT_FORM', 'Product form')}
        content={`${t('OPTIONS_MAX_LIMIT', 'Maximum options to choose')}: ${option?.max}`}
        open={showAlert && showMessage}
        acceptText={t('ACCEPT', 'Accept')}
        onClose={() => setShowAlert(false)}
        onAccept={() => setShowAlert(false)}
        closeOnBackdrop={false}
      />
    </>
  )
}, ProductOptionSubOptionPropsAreEqual)

export const ProductOptionSubOption = (props) => {
  const productOptionSubOptionProps = {
    ...props,
    UIComponent: ProductOptionSubOptionUI,
    isOrigin: true
  }

  return (
    <ProductSubOptionController {...productOptionSubOptionProps} />
  )
}
