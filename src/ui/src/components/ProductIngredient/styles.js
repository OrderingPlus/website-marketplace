import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;

  span {
    display: flex;
  }

  span:nth-child(1) {
    margin-right: 10px;
    ${props => props.theme?.rtl && css`
      margin-left: 10px;
      margin-right: 0px;
    `}
    svg {
      color: ${props => props.isSoldOut ? props.theme.colors.lightGray : props.theme.colors.primary};
      font-size: 24px;
      &[disabled] {
        color: ${props => props.theme.colors.lightGray};
      }
    }
  }
`

export const AddRemoveControl = styled.div`
  flex-direction: row;
  align-items: center;
  div {
    color: ${({ theme }) => theme?.colors?.primary};
    font-size: 15px;
    font-weight: 600;
  }
`

export const Text = styled.div`
  flex: 1;
  display: flex;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 8px;
  font-size: 15px;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: ${props => props.theme.colors.darkGray};
  }

  span {
    margin-left: 10px;
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${props => props.theme?.rtl && css`
      margin-left: 0;
      margin-right: 10px;
    `}
  }

  ${({ noMargin }) => noMargin && css`
    span {
      margin: 0;
    }
  `}
`
