import styled, { css } from 'styled-components'
import React from 'react'

export const OrderTypeSelectorContainer = styled.div`
  padding: 0px 10px;
  display: flex;
  justify-content: center;

  > *:first-child {
    margin-right: 20px;
  }
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme?.colors?.black};
    background: transparent;
    border-color: ${({ theme }) => theme?.colors?.black};
    height: 50px;
    flex: 1;
    font-weight: 600;
    padding-right: 20px;
    p {
      text-align: center;
      margin: 0 auto
    }
  }
  .selected {
    background: ${({ theme }) => theme?.colors?.primary};
    border-color: ${({ theme }) => theme?.colors?.primary};
    color: ${({ theme }) => theme?.colors?.white};
    img {
      filter: invert(1);
    }
  }
`

export const OrderTypeListItemContainerStyled = styled.div`
  border-radius: 7.6px;
  margin-bottom: 25px;
  padding: 30px;
  cursor: pointer;
  position: relative;
  opacity: 0.3;

  ${({ bgimage }) => bgimage && css`
    background-repeat: no-repeat, repeat;
    background-size: cover;
    object-fit: cover;
    background-position: center;
  `}

  ${({ active }) => active && css`
    opacity: 1;
  `}
`

export const OrderTypeListItemContainer = (props) => {
  const style = {}
  style.backgroundImage = `url(${props.bgimage})`

  return (
    <OrderTypeListItemContainerStyled {...props} style={style}>
      {props.children}
    </OrderTypeListItemContainerStyled>
  )
}

export const OrderTypeOverlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 7.6px;
  background: #000000;
  opacity: 0.3;
  z-index: initial;
`

export const OrderTypeTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 0;
  margin-bottom: 5px;
  z-index: 2;
  position: relative;
`

export const OrderTypeDescription = styled.p`
  font-size: 14px;
  color: #FFFFFF;
  margin-top: 0;
  margin-bottom: 17px;
  z-index: 2;
  position: relative;
`

export const OrderStartWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 2;
  position: relative;

  span {
    font-size: 14px;
    color: #FFFFFF;
    color: #FFFFFF;
    ${props => props.theme?.rtl
    ? css`
      margin-left: 10px;
    `
    : css`
      margin-right: 10px;
    `}
  }

  svg {
    font-size: 16px;
    color: #FFFFFF;
  }
`

export const OrderTypeListTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  color: ${props => props.theme.colors.darkTextColor};
  margin: 0 0 30px;

  @media (max-width: 450px) {
    padding-left: 30px;
    ${props => props.theme.rtl && css`
      padding-right: 30px;
      padding-left: 0;
    `}
  }
`

export const OrderTypesContainer = styled.div`
  padding: 10px 0px;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0px;
  }
  h3 {
    margin-top: 0px;
    font-size: 18px;
    font-weight: 400;
  }
  @media (min-width: 1200px){
    display: flex;
    flex-direction: ${({ openBusinessList }) => openBusinessList ? 'row' : 'column'};
    align-items: ${({ openBusinessList }) => openBusinessList ? 'flex-start' : 'center'};
    position: relative;
    h2{
      font-size: 46px;
    }
    h3 {
      font-size: 24px;
    }
  }
`

export const OrderTypesButtonsContainer = styled.div`
  @media (min-width: 1200px){
    width: 50%;
  }
`

export const ArrowContainer = styled.div`
  display: none;
  @media (min-width: 1200px){
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    cursor: pointer;
    svg {
      color: ${({ theme }) => theme?.colors?.primary};
    }
    p{
      text-decoration: underline;
      color: ${({ theme }) => theme?.colors?.primary};
    }
  }
`