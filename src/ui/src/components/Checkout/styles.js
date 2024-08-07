import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: auto;

  @media (min-width: 769px) {
    flex-direction: row;
  }

  @media (min-width: 993px) {
    min-height: calc(100vh - 337px);
    box-sizing: border-box;
  }
`

export const WrapperLeftContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 30px;

  @media (min-width: 769px) {
    width: 55%;
    padding: 55px 60px 55px 40px;
  }

  @media (min-width: 820px) {
    padding: 30px 60px 55px 40px;
  }
`

export const WrapperRightContainer = styled.div`
  width: 100%;
  background: #F8F9FA;
  box-sizing: border-box;
  padding: 40px 20px;

  @media (min-width: 769px) {
    width: 45%;
    padding: 55px 40px;
  }
`

export const WrapperUserDetails = styled.div`
  width: 100%;
`

export const UserDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid #E9ECEF;
`

export const BusinessDetailsContainer = styled(UserDetailsContainer)`
  border: none;
  div {
    h1 {
      text-transform: capitalize;
      margin: 0px;
      font-weight: 600;
      font-size: 16px;
    }
    p {
      font-size: 14px;
      margin: 5px 0;
      color: ${props => props.theme.colors.darkTextColor};
    }
  }
`

export const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 0px;
  h1 {
    margin: 0px;
    font-weight: 500;
    font-size: 20px;
    color: ${props => props.theme.colors.darkTextColor};
  }
`

export const DriverTipContainer = styled(PaymentMethodContainer)`
  > p {
    margin: 0;
    font-size: 16px;
    color: ${props => props.theme?.colors.darkGray};
  }
`

export const CartContainer = styled(PaymentMethodContainer)`
  margin-bottom: 20px;
  position: relative;
`

export const WalletPaymentOptionContainer = styled(PaymentMethodContainer)`
  padding-top: 20px;
`

export const WrapperPlaceOrderButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 7.6px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const WarningMessage = styled.div`
  width: 100%;
  height: fit-content;
  max-height: fit-content;
  min-height: 150px;
  background-color: #F2BB40;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  border-radius: 10px;
  position: relative;

  svg {
    position: absolute;
    font-size: 30px;
    top: 0;
    left: 0;
    margin: 11px;
    ${props => props.theme?.rtl && css`
        right: 0;
        left: initial;
    `}
  }

  h1 {
    font-size: 20px;
    margin: 0px 60px;
    text-align: center;
  }
`

export const NotFoundImage = styled.div`
  max-width: 300px;

  img {
    width: 300px;
  }
`

export const CartsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;

  @media (min-width: 381px) {
    width: 80%;
  }
`

export const WarningText = styled.p`
  margin: 10px auto;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`

export const WrapperLeftContent = styled.div`
  width: 100%;

  .checkout-title {
    margin: 0;
    font-weight: 600;
    font-size: 32px;
    color: ${props => props.theme?.colors.darkTextColor};
  }
`
export const CheckOutDivider = styled.div`
  height: 8px;
  width: calc(100% + 40px);
  margin-left: -20px;
  background: #F8F9FA;

  @media(min-width: 769px) {
    width: calc(100% + 100px);
    margin-left: -40px;
  }
`

export const DriverTipDivider = styled.div`
  height: 8px;
  width: calc(100% + 40px);
  margin-left: -20px;
  background: #E9ECEF;

  @media(min-width: 769px) {
    width: calc(100% + 80px);
    margin-left: -40px;
  }
`

export const DeliveryOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  #select-input {
    margin-bottom: 10px;
  }
  #list {
    width: 100%;
  }

  > div {
    width: 100%;
    background-color: #F8F9FA!important;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    height: 44px;
    border: none;
    border-radius: 7.6px;
    color: ${props => props.theme?.colors.darkGray} !important;

    > div:first-child {
      padding-top: 5px;
      padding-bottom: 5px;
      justify-content: space-between;
    }
    > div#list {
      width: 100%;
      background-color: #F8F9FA!important;
      border: 1px solid #F8F9FA;
      border-radius: 7.6px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    }
  }
`

export const CartHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
  }

  span {
    font-size: 13px;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    user-select: none;
    &:hover {
        text-decoration: underline;
      }
  }

  h1, span {
    margin: 5px 0px;
  }

  @media (min-width: 300px) {
    flex-direction: row;
    align-items: center;
  }
`

export const SelectSpotContainer = styled.div``

export const WrapperActionsInput = styled.div`
  input {
    width: 100%;
  }
  h1 {
    font-size: 20px;
  }
`

export const MobileWrapperPlaceOrderButton = styled.div`
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: white;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1006;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 12%);

  span {
    font-weight: 600;
    font-size: 16px;

    @media (min-width: 1200px) {
      font-size: 18px;
      padding-left: 20px;
    }
  }

  button {
    min-height: 44px;
    border-radius: 7.6px;
  }
`

export const OrderContextUIWrapper = styled.div`
  flex: 1;
  margin-left: 15px;
  max-width: 85%;

  ${props => props.theme.rtl && css`
    margin-left: 0px;
    margin-right: 15px;
  `}

  @media (min-width: 480px) {
    max-width: 90%;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .back-arrow {
    font-size: 24px;
    cursor: pointer;
  }
`

export const AuthButtonList = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 3px;
  }
  button {
    width: 100%;
    height: 44px;
    margin-top: 22px;
  }
`
export const Flag = styled.span`
  font-size: 13px;
  margin: 0px;
  text-transform: capitalize;
  color: #E63757;
  font-weight: 500;

  @media (min-width: 381px) {
    font-size: 14px;
  }
`
export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px 20px;
`

export const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: -100%;
`
