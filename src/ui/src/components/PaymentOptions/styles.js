import styled, { css } from 'styled-components'

export const PaymentMethodsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const PaymentMethodsList = styled.div`
  display: flex;
  width: calc(100% + 15px);
  overflow: auto;
  margin-left: -15px;
`

export const Container = styled.div`
  margin: 0 auto;
`

export const PayCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px;
  text-align: center;
  border: 1px solid #E9ECEF;
  border-radius: 7.6px;
  padding: 10px;
  ${props => props.isDisabled && css`
    pointer-events: none;
  `}

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-right: 10px;
    > svg {
      font-size: 16px;
      path {
        fill: #000;
      }
    }
  }

  p {
    margin: 0px;
    font-size: 13px;
    text-align: center;
    white-space: nowrap;
  }

  &.active {
    border: 1px solid ${props => props.theme.colors.primary};
    > div {
      border: 1px solid ${props => props.theme.colors.primary};
      svg path {
        fill: ${props => props.theme.colors.primary};
      }
    }
    p {
      color: ${props => props.theme.colors.primary};
    }
  }

  /* &:not(.active) {
    border: ${({ isSkeleton }) => isSkeleton ? '0' : '1px solid #EAEAEA'};
  } */
`

export const PayCardSelected = styled.div`
  padding: 30px 0px 0px;
`

export const CardItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: bold;

  span {
    display: flex;
  }

  .checks svg {
    color: ${props => props.theme.colors.primary};
    font-size: 22px;
  }

  img {
      width: 24px;
      height: 20px;
  }

  .brand svg {
    font-size: 26px;
  }

  > * {
    margin-right: 10px
    ${props => props.theme?.rtl && css`
      margin-left: 10px;
      margin-right: 0;
    `}
  }
`
