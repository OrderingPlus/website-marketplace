import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const FormActions = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  button {
    height: 44px;
    width: 100%;
    text-transform: lowercase;
    &:first-letter {
      text-transform: uppercase;
    }
  }
`

export const FormControl = styled.form`
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  input {
    box-sizing: border-box;
    margin: 10px 0px;
    height: 50px;
    width: 100%;
    &.internal_number,
    &.zipcode {
      flex: auto;
    }
    &::placeholder{
      color: #CBCBCB
    }
  }

  textarea {
    width: 100%;
    margin: 10px 0;
    border-radius: 7.6px;
  }

  .input-autocomplete {
    width: 100%;
    background: #FFF;
    border: 1px solid #BBB;
    border-radius: 30px;
    font-size: 16px;
    padding: 7px 15px !important;
    height: 50px;
    outline: none;
    ::placeholder {
      color: #DBDCDB;
    }

    &:-ms-input-placeholder {
      color: #DBDCDB;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
      color: #DBDCDB;
    }
    &:focus {
      border-color: ${() => darken(0.07, '#CCC')};
    }
  }

  .google-control {
    .gps-button {
      border-radius: 7.6px;
    }

    input {
      border-radius: 7.6px;
      border: 1px solid ${props => props.theme.colors.primary};

      &:focus {
        border: 1px solid ${props => props.theme.colors.primary};
      }
    }
  }

  .internal_number {
    width: 45%;
    ${props => props.theme?.rtl
? css`
      margin-left: 15px;
    `
: css`
      margin-right: 15px;
    `}
  }

  .zipcode {
    width: 45%;
  }

  @media (min-width: 481px) {
    padding: 10px;
  }
`

export const AddressWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: -11px;

  button {
    height: 41px;
    right: 1px;
    border: none;

    ${props => props.theme?.rtl && css`
      left: 1px;
      right: initial;
    `}

    svg {
      font-size: 18px;
    }
  }
`

export const WrapAddressInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  i {
    padding: 0px 10px;
  }

  svg {
    position: absolute;
    color: ${props => props.theme.colors.primary};
    top: 21px;
    left: 10px;
    font-size: 20px;
    ${props => props.theme?.rtl && css`
      right: 10px;
      left: initial;
    `}
  }

  input {
    background-position: left 10px center !important;
    background-repeat: no-repeat !important;
    background-size: 13px !important;
    padding: 7px 30px 7px 15px !important;
    ${props => props.theme?.rtl && css`
      padding: 7px 15px 7px 30px !important;
    `}
  }
`

export const AddressTagSection = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    border: none;
    color: #B1BCCC;

    img {
      width: 25px;
      height: 25px;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 30px;
      }
    }
  }

  button.active {
    color: ${props => props.theme.colors.primary};
  }
`

export const WrapperMap = styled.div`
  width: 100%;
  height: 400px;
  > div {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    border-radius: 15px;
  }
`

export const WrapperSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9px 10px;

  span {
    width: 100%;
  }
`

export const Container = styled.div`
  margin-top: 20px;
  padding: 10px;
`

export const AddressSummary = styled.div`
  width: 100%;
  span{
    color: ${({ theme }) => theme?.colors?.primary};
    font-size: 16px;
    font-weight: 500;
  }
  h4 {
    margin-bottom: 10px;
  }
`

export const PinInfo = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #B1BCCC;
`

export const AddressOrderDetails = styled.div`
  border-radius: 10px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.10);
  h4 {
    color: ${({ theme }) => theme?.colors?.primary};
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    text-align: left;
    padding: 20px;
  }
`

export const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  border-bottom: 1px solid #E9ECEF;
  padding: 10px 20px;
  p {
    font-size: 12px;
    font-weight: 400;
    margin: 0px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  svg {
    color: ${props => props.theme.colors.primary};
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
  svg[disabled] {
    color: ${props => props.theme.colors.lightGray};
  }
`

export const AddressOrderDetailsTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`

export const Divider = styled.div`
  height: 4px;
  width: 100%;
  background: #F8F9FA;
`