import React, { useRef } from 'react'
import { useTheme } from 'styled-components'
import { Pencil, Trash } from 'react-bootstrap-icons'

import {
  AccordionSection,
  Accordion,
  WrapperProductImage,
  ProductImage,
  ContentInfo,
  ProductComment,
  ProductInfo,
  ProductError,
  ProductActions,
  ProductActionsEdit,
  ProductActionsDelete,
  ProductNotAvailable,
  ProductOptionsList,
  ProductQuantity,
  ProductSelectWrapper,
  ScheduleInfoWrapper,
  ScheduleInfo,
  ProductInfoQuantity,
  Price,
  ProductOption,
  ProductSubOption,
  ProductContentInfo
} from './styles'

import {
  ProductItemAccordion as ProductItemAccordionController,
  useUtils,
  useLanguage,
  useOrder,
  useConfig
} from '~components'

import { useWindowSize } from '~ui'
import BsPlusCircle from '@meronex/icons/bs/BsPlusCircle'

const ProductItemAccordionUI = (props) => {
  const {
    isDisabledEdit,
    isCartPending,
    isCartProduct,
    product,
    changeQuantity,
    getProductMax,
    onDeleteProduct,
    onEditProduct,
    isCheckout,
    isStore,
    isConfirmationPage,
    toppingsRemoved,
    productInfo,
    isOrderDetails
  } = props
  const theme = useTheme()
  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [{ parsePrice, parseDate }] = useUtils()
  const windowSize = useWindowSize()
  const [{ configs }] = useConfig()
  // const [setActive, setActiveState] = useState('')
  // const [setHeight, setHeightState] = useState('0px')
  // const [setRotate, setRotateState] = useState('accordion__icon')

  // const content = useRef(null)
  // const productSelect = useRef(null)
  const productActionsEdit = useRef(null)
  const productActionsDelete = useRef(null)

  const viewString = isConfirmationPage ? 'confirmation' : isStore ? 'business_view' : 'header'
  const showProductImage = !theme?.[viewString]?.components?.cart?.components?.products?.components?.image?.hidden
  const hideProductDummyLogo = theme?.business_view?.components?.products?.components?.product?.components?.dummy?.hidden

  // const showArrowIcon = props.showArrowIcon && (productInfo?.ingredients?.length > 0 || productInfo?.options?.length > 0 || product?.comment)

  // const toggleAccordion = (e) => {
  //   const isActionsClick = productSelect.current?.contains(e.target) || productActionsEdit.current?.contains(e.target) || productActionsDelete.current?.contains(e.target)
  //   if ((!product?.valid_menu && isCartProduct) || isActionsClick) return
  //   setActiveState(setActive === '' ? 'active' : '')
  //   setHeightState(
  //     setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
  //   )
  //   setRotateState(
  //     setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
  //   )
  // }

  // const handleChangeQuantity = (value) => {
  //   if (parseInt(value) === 0) {
  //     onDeleteProduct(product)
  //   } else {
  //     changeQuantity(product, parseInt(value))
  //   }
  // }

  const handleIncrement = () => {
    changeQuantity(product, product?.quantity + 1)
  }

  const getFormattedSubOptionName = ({ quantity, name, position, price }) => {
    const pos = position ? `(${position})` : ''
    return `${quantity} x ${name} ${pos} +${price}`
  }

  // useEffect(() => {
  //   if (setActive === 'active') {
  //     setHeightState(
  //       `${content.current.scrollHeight}px`
  //     )
  //   }
  // }, [product, setActive])

  return (
    <>

      <AccordionSection isCheckout={isCheckout}>
        <Accordion
          // className={`product accordion ${setActive}`}
          // onClick={(e) => toggleAccordion(e)}
        >
          <ProductInfo className='info' isValid={product?.valid ?? true}>

            {product?.calendar_event
              ? (
                <>
                  {(product?.images || (!hideProductDummyLogo && theme?.images?.dummies?.product)) && showProductImage && (
                    <WrapperProductImage>
                      <ProductImage bgimage={product?.images || theme?.images?.dummies?.product} />
                    </WrapperProductImage>
                  )}
                  <ScheduleInfoWrapper>
                    <h3>{product.name}</h3>
                    <ScheduleInfo>
                      <span>
                        {parseDate(product?.calendar_event?.start, { outputFormat: (configs?.format_time?.value === '12') ? 'hh:mm a' : 'HH:mm' })}
                        {' '}-{' '}
                        {parseDate(product?.calendar_event?.end, { outputFormat: (configs?.format_time?.value === '12') ? 'hh:mm a' : 'HH:mm' })}
                      </span>
                    </ScheduleInfo>
                  </ScheduleInfoWrapper>
                </>
                )
              : (
                <>
                  <ProductInfoQuantity $isOrderDetails={isOrderDetails}>
                    {onDeleteProduct && (
                      <span ref={productActionsDelete}>
                        <Trash color='#B1BCCC' onClick={() => onDeleteProduct(product)} />
                      </span>
                    )}
                    {!isDisabledEdit && isCartProduct && !isCartPending && getProductMax
                      ? (
                        <>
                          <ProductQuantity>
                            {product?.quantity}
                          </ProductQuantity>
                          <ProductSelectWrapper>
                            <BsPlusCircle
                              onClick={handleIncrement}
                            />
                          </ProductSelectWrapper>
                        </>
                        )
                      : (
                        <ProductQuantity>
                          {product?.quantity}
                        </ProductQuantity>
                        )}
                  </ProductInfoQuantity>
                  {(product?.images || (!hideProductDummyLogo && theme?.images?.dummies?.product)) && showProductImage && (
                    <WrapperProductImage>
                      <ProductImage bgimage={product?.images || theme?.images?.dummies?.product} />
                    </WrapperProductImage>
                  )}
                  <ContentInfo>
                    <div>
                      <ProductContentInfo>
                        <h3>{product.name}</h3>
                        {productInfo.ingredients.length > 0 && productInfo.ingredients.some(ingredient => !ingredient.selected) && (
                          <ProductOptionsList>
                            <p>{t('INGREDIENTS', 'Ingredients')}</p>
                            {productInfo.ingredients.map(ingredient => !ingredient.selected && (
                                <span key={ingredient.id}>{t('NO', 'No')} {ingredient.name}</span>
                            ))}
                          </ProductOptionsList>
                        )}
                        {productInfo.options.length > 0 && (
                          <ProductOptionsList>
                            {productInfo.options.map(option => (
                              <ProductOption key={option.id}>
                                <ProductOptionsList className='suboption'>
                                  {option?.suboptions?.sort((a, b) => a.rank - b.rank).map(suboption => (
                                    <ProductSubOption key={suboption.id}>
                                      <p>{option.name}:</p>
                                      <span>
                                        {getFormattedSubOptionName({
                                          quantity: suboption.quantity,
                                          name: suboption.name,
                                          position: (suboption?.position !== 'whole') ? t(suboption.position.toUpperCase(), suboption.position) : '',
                                          price: (['left', 'right'].includes(suboption.position)) ? parsePrice(suboption.half_price ?? suboption.price) : parsePrice(suboption.price)
                                        })}
                                      </span>
                                    </ProductSubOption>
                                  ))}
                                </ProductOptionsList>
                              </ProductOption>
                            ))}
                          </ProductOptionsList>
                        )}
                        {toppingsRemoved?.removed?.length > 0 && (
                          <ProductOptionsList>
                            <li>
                              <p>{t('TOPPINGS_REMOVED', 'Toppings removed')}</p>
                              <ProductOptionsList className='suboption'>
                                {toppingsRemoved?.removed.map(topping => (
                                  <li key={topping.code}>
                                    <span>{topping.name}</span>
                                  </li>
                                ))}
                              </ProductOptionsList>
                            </li>
                          </ProductOptionsList>
                        )}
                        {product.comment && (
                          <ProductComment>
                            <p>{t('SPECIAL_COMMENT', 'Special Comment')}:</p>
                            <p>{product.comment}</p>
                          </ProductComment>
                        )}
                      </ProductContentInfo>
                      <Price>
                        <p>{parsePrice(product.total || product.price)}</p>
                        {onEditProduct && !isDisabledEdit && isCartProduct && !isCartPending && windowSize.width <= 410 && (
                          <span ref={productActionsEdit}>
                            <Pencil color='#B1BCCC' onClick={() => onEditProduct(product)} />
                          </span>
                        )}
                      </Price>
                    </div>
                  </ContentInfo>

                </>
                )}
          </ProductInfo>

          {/* {showArrowIcon && <IosArrowDown className={`${setRotate}`} />} */}

          {isCartProduct && !isCartPending && product?.valid_menu && !product?.valid_quantity && (
            <ProductError>
              <ProductActions>
                {!isDisabledEdit && (
                  <ProductActionsEdit
                    ref={productActionsEdit}
                    onClick={() => onEditProduct(product)}
                    disabled={orderState.loading}
                  >
                    <Pencil color='#B1BCCC' />
                  </ProductActionsEdit>
                )}
                {onDeleteProduct && (
                  <ProductActionsDelete
                    ref={productActionsDelete}
                    onClick={() => onDeleteProduct(product)}
                    disabled={orderState.loading}
                  >
                    <Trash color='#B1BCCC' />
                  </ProductActionsDelete>
                )}
              </ProductActions>
              <ProductNotAvailable>
                {t('NOT_AVAILABLE', 'Not available')}
              </ProductNotAvailable>
            </ProductError>
          )}

          {!product?.valid_menu && isCartProduct && !isCartPending && (
            <ProductError>
              <ProductActions>
                {onDeleteProduct && (
                  <ProductActionsDelete
                    ref={productActionsDelete}
                    onClick={() => onDeleteProduct(product)}
                    disabled={orderState.loading}
                  >
                    <Trash color='#D81212' />
                  </ProductActionsDelete>
                )}
              </ProductActions>
              <ProductNotAvailable>
                {t('NOT_AVAILABLE', 'Not available')}
              </ProductNotAvailable>
            </ProductError>
          )}
        </Accordion>

        {/* <AccordionContent
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
        >
          {productInfo.ingredients.length > 0 && productInfo.ingredients.some(ingredient => !ingredient.selected) && (
            <ProductOptionsList>
              <p>{t('INGREDIENTS', 'Ingredients')}</p>
              {productInfo.ingredients.map(ingredient => !ingredient.selected && (
                <li className='ingredient' key={ingredient.id}>
                  <span>{t('NO', 'No')} {ingredient.name}</span>
                </li>
              ))}
            </ProductOptionsList>
          )}
          {productInfo.options.length > 0 && (
            <ProductOptionsList>
              {productInfo.options.map(option => (
                <li key={option.id}>
                  <p>{option.name}</p>
                  <ProductOptionsList className='suboption'>
                    {option?.suboptions?.sort((a, b) => a.rank - b.rank).map(suboption => (
                      <li key={suboption.id}>
                        <span>
                          {getFormattedSubOptionName({
                            quantity: suboption.quantity,
                            name: suboption.name,
                            position: (suboption?.position !== 'whole') ? t(suboption.position.toUpperCase(), suboption.position) : '',
                            price: (['left', 'right'].includes(suboption.position)) ? parsePrice(suboption.half_price ?? suboption.price) : parsePrice(suboption.price)
                          })}
                        </span>
                      </li>
                    ))}
                  </ProductOptionsList>
                </li>
              ))}
            </ProductOptionsList>
          )}
          {toppingsRemoved?.removed?.length > 0 && (
            <ProductOptionsList>
              <li>
                <p>{t('TOPPINGS_REMOVED', 'Toppings removed')}</p>
                <ProductOptionsList className='suboption'>
                  {toppingsRemoved?.removed.map(topping => (
                    <li key={topping.code}>
                      <span>{topping.name}</span>
                    </li>
                  ))}
                </ProductOptionsList>
              </li>
            </ProductOptionsList>
          )}
          {product.comment && (
            <ProductComment>
              <p>{t('SPECIAL_COMMENT', 'Special Comment')}</p>
              <h3>{product.comment}</h3>
            </ProductComment>
          )}
        </AccordionContent> */}
      </AccordionSection>
    </>
  )
}

export const ProductItemAccordion = (props) => {
  const productItemAccordion = {
    ...props,
    UIComponent: ProductItemAccordionUI
  }
  return (
    <ProductItemAccordionController {...productItemAccordion} />
  )
}
