import styled, { css } from 'styled-components'

export const RevervationContainer = styled.div`
  button {
    width: 100%;
  }

  ${({ isCheckout }) => isCheckout && css`
    margin-top: 20px;
  `}
`

export const Block = styled.div`
  border-radius: 7.6px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.10);
  padding: 10px 20px;
  margin-bottom: 20px;
  h2 {
    font-size: 18px;
  }
  > div {
    margin-bottom: 10px;
  }
  #list {
    width: 100%;
  }
`

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 24px;
    color: ${props => props.theme.colors.primary};
    margin-right: 20px;
  }

  svg[disabled] {
    color: ${props => props.theme.colors.lightGray};
  }
`

export const Option = styled.div`
  white-space: nowrap;
  color: ${props => props.theme?.colors.darkGray};
  font-size: 13px;
`

export const EmptyCart = styled.div`
  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      font-size: 45px;
      color: #B1BCCC;
      margin-top: 10px;
    }

    p {
      font-size: 14px;
      color: #B1BCCC;
      margin: 23px 0 0 0;
    }
  }
`

export const EmptyBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  span {
    font-weight: 600;
    font-size: 16px;
    color: ${props => props.theme.colors.darkTextColor};
  }

  button {
    color: #748194;
    background: #F8F9FA;
    border: 1px solid #F8F9FA;
    border-radius: 7.6px;
    height: 44px;
    font-size: 14px;
    padding-left: 25px;
    padding-right: 25px;
  }
`

export const ToleranceText = styled.p`
  color: #909BA9;
`
