import styled, { css } from 'styled-components'

export const WrapperMap = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 20px;
  position: relative;
  > div {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
  }

  ${({ disabled }) => disabled && css`
    pointer-events: none;
  `}

  @media (min-width: 1200px){
    position: absolute;
    margin-top: 0px;
    height: 100%;
  }
`

export const BusinessContainer = styled.span`
  position: absolute;
  bottom: 25px;
  background: #fff;
  border-radius: 10px;
  max-width: 95%;
  min-width: 95%;
  @media (min-width: 681px){
    width: calc(70% - 40px);
    min-width: calc(70% - 40px);
    max-width: calc(70% - 40px);
  }
`
