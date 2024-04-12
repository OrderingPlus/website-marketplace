import React from 'react'
import styled, { css } from 'styled-components'

export const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 10px;
  background: #FFF;
  border-bottom: 1px solid #D9D9D9;
  box-sizing: border-box;
  background: ${isCheckout => isCheckout ? 'transparent' : '#FFF'};
`

const AccordionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: initial;
  transition: background-color 0.6s ease;

  .rotate {
    transform: rotate(180deg);
  }

  .accordion__icon {
    margin-left: auto;
    transition: transform 0.6s ease;
    ${props => props.theme?.rtl && css`
      margin-right: auto;
      margin-left: initial;
    `}
  }

  @media (min-width: 411px){
    flex-direction: row;
  }

`

export const Accordion = (props) => {
  const style = {}
  return (
    <AccordionStyled
      {...props}
      style={style}
    >
      {props.children}
    </AccordionStyled>
  )
}

export const WrapperProductImage = styled.div`
  max-width: 43px;
  max-height: 43px;
  height: 43px;
  width: 43px;
  min-width: 43px;
  min-height: 43px;
  border-radius: 10px;
  margin-right: 5px;
`

const ProductImageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  border-radius: 10px;
`

export const ProductImage = (props) => {
  return (
    <ProductImageStyled
      {...props}
      style={{ backgroundImage: `url(${props.bgimage})` }}
    >
      {props.children}
    </ProductImageStyled>
  )
}

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: capitalize;
  flex: 1;
  ${props => props.theme?.rtl && css`
    margin-right: 10px;
    margin-left: 0px;
  `}

  h3 {
    font-size: 14px;
    margin: 0px;
    font-weight: 600;
  }

  > div {
    display: flex;
    justify-content: space-between;
    > p {
      font-size: 10px;
      color: ${props => props.theme?.colors.darkGray};
      overflow-wrap: break-word;
    }
  }

  span {
    display: flex;
    justify-content: space-between;
    margin: 0px;

    p {
      margin: 0px;
      font-size: 14px;
    }

    div {
      display: flex;

      span {
        height: 20px;
        svg {
          font-size: 20px;
          &:nth-child(1) {
            margin-right: 3px;
            ${props => props.theme?.rtl && css`
              margin-left: 3px;
              margin-right: 0px;
            `}
          }
        }
      }
    }
  }
`

export const AccordionContent = styled.div`
  overflow: hidden;
  transition: max-height 0.6s ease;
  width: 100%;
  margin: auto;

  @media (min-width: 481px) {
    width: 80%;
  }
`

export const AccordionText = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding: 18px;
`

export const ProductComment = styled.div`
  p {
    margin: 0px;
    font-size: 10px;
  }

  h3 {
    font-size: 10px;
  }
`

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h1,
  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0px;
  }

  ${({ isValid }) => !isValid && css`
    opacity: 0.5;
  `}

`

export const ProductError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 18px;
    text-align: center;
  }

  @media (min-width: 411px){
    width: 35%;

    span{
      text-align: right;
    }
  }
`

export const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ProductActionsEdit = styled.span`
  svg {
    font-size: 16px;
    margin-right: 5px;
    cursor: pointer;
    ${props => props.theme?.rtl && css`
      margin-left: 5px;
      margin-right: 0px;
    `}
  }
`

export const ProductActionsDelete = styled(ProductActionsEdit)`
  display: none;
  svg {
    margin-right: 0px;
  }

  @media (min-width: 411px){
    display: block;
  }
`

export const ProductPriceSection = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    white-space: nowrap;
  }
`

export const ProductPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  p,
  span {
    font-size: 14px;
  }

  span {
    font-weight: 500;
  }

  svg {
    cursor: pointer;
  }
`

export const ProductSelectWrapper = styled.div`
  position: relative;
  top: 2px;
  > svg {
    color: ${({ theme }) => theme?.colors?.primary};
    font-size: 16px;
  }
`

export const ProductSelect = styled.select`
  ${({ isCheckout }) => isCheckout
? css`
    background: ${props => props.theme?.colors.backgroundPage};
  `
: css`
    background: ${props => props.theme?.colors.grayDividerColor};
  `}
  border-radius: 7.6px;
  max-width: 35px;
  height: 25px;
  border: none;
  font-size: 12px;
  outline: none;
  margin: 0 5px 0 15px;
  padding: 0 3px;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-progress-appearance: none;

  ${props => props.theme.rtl && css`
    margin: 0 15px 0 5px;
  `}
`

export const ProductNotAvailable = styled.span`
  color: #D81212;
`

export const ProductOptionsList = styled.div`
  list-style-type: none;
  font-size: 10px;
  p {
    font-size: 10px;
  }
  .suboption {
  }

  p:nth-child(1) {
    margin-bottom: 0;
  }

  p {
    font-weight: 400;
    margin: 0px;
  }

  li span {
    font-weight: 300;
  }

  li.ingredient {
  }
`

export const ProductQuantity = styled.span`
  margin: 0 5px;
  font-size: 14px;

`

export const ScheduleInfoWrapper = styled.div`
  width: calc(100% - 65px);
  box-sizing: border-box;
  h3 {
    margin: 0px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  padding-left: 10px;
  ${props => props.theme.rtl && css`
    padding-left: 0px;
    padding-right: 10px;
  `}
`

export const ScheduleInfo = styled.div`
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: ${props => props.theme.colors.darkGray};
  }
`

export const ProductInfoQuantity = styled.div`
  display: flex;
  justify-content: space-between;
  background: #F8F9FA;
  border-radius: 10px;
  padding: 5px;
  margin-right: 5px;
  width: ${({ $isOrderDetails }) => $isOrderDetails ? '15px' : '50px'};
  max-width: ${({ $isOrderDetails }) => $isOrderDetails ? '15px' : '50px'};
  span svg {
    position: relative;
    top: 2px;
  }
`

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p {
    font-size: 12px;
    font-weight: 500;
  }
  span svg {
    font-size: 15px;
  }
`

export const ProductOption = styled.div`

`

export const ProductSubOption = styled.div`
  display: flex;
  flex-direction: row;
`

export const ProductContentInfo = styled.div`
  width: 75%;

  p, span {
    font-weight: 400;
    font-size: 10px;
    color: #909BA9;
  }
  span {
    margin-left: 5px;
  }
`
