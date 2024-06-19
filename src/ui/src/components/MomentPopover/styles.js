import styled, { css } from 'styled-components'

export const HeaderItem = styled.div`
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;

  ${props => props.$isHome && css`
    color: #FFF;
  `}

  svg {
    margin-right: 5px;
    ${props => props.theme?.rtl && css`
      margin-left: 5px;
      margin-right: 0px;
    `}
  }

  ${props => props.$customView && css`
    font-size: 13px;
    ${props => props.$isBanner && css`
      background: #F8F9FA;
      border-radius: 7.6px;
      padding: 4px 8px;
    `}
    svg {
      margin: 5px;
      font-size: 16px;
    }
  `}
`

export const PopoverBody = styled.div`
  background-color: #FFF;
  color: #333;
  padding: 15px;
  border-radius: 10px;
  max-width: 500px;
  z-index: 10002;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;

  ${props => props.$customView && css`
    padding-top: 30px;
    #moment_control h1 {
      margin-bottom: 30px;
    }
    @media (min-width: 576px) {
      z-index: 1001;
    }
  `}
`

export const PopoverArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 8px solid #FFF;
  top: -8px;
`
