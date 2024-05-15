import React from 'react'
import styled, { css } from 'styled-components'

export const ContainerCard = styled.div`
  box-sizing: border-box;
  border-radius: 7.6px;
  border-radius: 10px;
  margin: 15px 20px;
  padding-bottom: 30px;
  ${({ isBusinessMap }) => !isBusinessMap && css`
    border-bottom: 1px solid #E9ECEF;
  `}
  ${({ minWidthEnabled }) => minWidthEnabled && css`
    min-width: calc(65% - 40px);
  `}

  ${({ typeButton }) => typeButton && css`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      padding: 10px 30px;
    }
  `}

  ${({ firstCard }) => firstCard && css`
    margin-left: 0;
  `}

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
  `}

  ${({ businessRows }) => css`
    width: calc(100% - 40px);

    @media (min-width: 481px) {
      max-height: ${({ isCustomerMode }) => isCustomerMode ? '360px' : '320px'};
    }

    @media (min-width: 681px) {
      width: ${({ isBusinessMap }) => isBusinessMap ? 'calc(100% - 40px)' : 'calc(50% - 40px)'};
    }

    @media (min-width: 1200px) {
      width: calc(100% - 40px);
    }
  `}

`

export const WrapperBusinessCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  cursor: ${({ isSkeleton }) => isSkeleton ? 'default' : 'pointer'};
  ${({ disabled }) => disabled && css`
    pointer-events: none;
    cursor: not-allowed;
  `}

  button {
    height: 44px;
    min-height: 44px;
    width: 100%;
    margin-top: 15px;
    align-self: flex-end
  }
`

export const BusinessHero = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  > div {
    display: flex;
  }
`

export const BusinessHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  min-height: 145px;
  justify-content: center;
  align-items: center;
  border-radius: 7.6px 7.6px 0px 0px;

  h1, h2 {
    color: #FFF;
    opacity: 0.7;
  }

  .closed, .disabled {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 22px;
    line-height: 35px;
    opacity: 1;
    position: relative;
    z-index: 2;
  }

  .disabled {
    font-size: 16px;
    text-align: center;

  }

  @media (min-width: 481px) {
    min-height: 165px;
  }
`

export const BusinessHeaderClosedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    div {
      text-align: center;
      width: 100%;
      line-break: anywhere;
    }

`

export const BusinessTags = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  top: 0;
  margin: 15px;
  width: calc(100% - 35px);

  span.crown {
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #FFC917;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  span {
    font-size: 11px;
    padding: 3px 8px;
    color: #748194;
    background: #DEE2E6;
    border-radius: 50px;
    margin-right: 10px;
    ${props => props.theme?.rtl && css`
      margin-left: 10px;
      margin-right: 0;
    `}
    &:last-child {
      ${props => props.theme?.rtl
? css`
        margin-left: 0px;
    `
: css`
        margin-right: 0px;
    `}
    }
  }
`

export const BusinessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin: 0;
  }


`

export const WrapperBusinessLogo = styled.div`
  align-self: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 7.6px;

  ${({ isCustomerMode }) => isCustomerMode && css`
    width: 65px;
    height: 65px;
    min-height: 65px;
    min-width: 65px;
  `}

  ${({ isSkeleton }) => isSkeleton && css`
    height: auto;
    width: auto;
    > span {
      display: flex;
    }
    @media (min-width: 481px){
      ${({ isCustomerMode }) => isCustomerMode && css`
        min-width: 75px;
        min-height: 75px;
        height: 75px;
        width: 75px;
      `}
    }
  `}
`

const BusinessLogoStyled = styled.div`
  display: flex;
  width: 65px;
  height: 65px;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  min-height: 65px;
  border-radius: 7.6px;

  @media (min-width: 481px){
    min-width: 75px;
    min-height: 75px;
    height: 75px;
    width: 75px;
    min-height: 75px;
    ${({ isCustomerMode }) => isCustomerMode && css`
      width: 100%;
      height: 100%;
    `}
  }
`

export const BusinessLogo = (props) => {
  const style = {}
  if (props.bgimage) {
    style.backgroundImage = `url(${props.bgimage})`
  }

  return (
    <BusinessLogoStyled {...props} style={style}>
      {props.children}
    </BusinessLogoStyled>
  )
}

export const BusinessInfo = styled.div`
  display: flex;
  ${({ isCustomerMode }) => isCustomerMode
? css`
    width: 90%;
  `
: css`
    width: 100%;
  `}
`

export const BusinessInfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;

  div {
    display: flex;
    p {
      margin-right: 5px;
      ${props => props.theme?.rtl && css`
        margin-left: 5px;
        margin-right: 0;
    `}
      text-transform: capitalize;
      display: flex;
      align-items: center;
      margin: 0px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p.bold {
      font-weight: bold;
    }
  }
`

export const BusinessName = styled.h6`
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  margin-block-start: 0;
  margin-block-end: 0;
  color: ${props => props.theme.colors.primary};
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

`

export const Categories = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #6C6C6C;

  @media (min-width: 481px) {
    font-size: 16px;
  }
`

export const Medadata = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 12px;
  color: #909BA9;
  flex-wrap: wrap;


  ${({ isCustomerMode }) => isCustomerMode && css`
    > div {
      flex-direction: column;
    }
  `}
  ${({ isSkeleton }) => isSkeleton && css`
    display: flex;
    justify-content: center;
  `}
  p {
    color: #909BA9;
    svg {
      font-size: 7px;
      min-width: 6px;
      margin: 0 3px;
    }

    span {
      margin-right: 10px;
      ${props => props.theme?.rtl && css`
        margin-left: 10px;
        margin-right: 0;
      `}
    }
  }

  @media (min-width: 481px) {
    font-size: 14px;
  }
`

export const CallCenterInformation = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  div{
    justify-content: space-evenly;
  }
`

export const CallCenterInformationBullet = styled.div`
  display: flex;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 16px;
  background: ${({ bgcolor }) => bgcolor};
  width: 50px;
  color: #fff;
  svg{
    font-size: 18px;
  }
`

export const BusinessLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -20px;
  margin-bottom: 10px;
`

export const BusinessStarInfo = styled.div`
  display: flex;
  align-items: center;

  .reviews {
    display: flex;
    align-items: center;
    svg {
      margin-right: 3px;
      font-size: 22px;
      color: #414954;
      ${props => props.theme?.rtl && css`
        margin-left: 3px;
        margin-right: 0;
    `}
    }
    span {
      font-size: 15px;
      color: #414954;
    }
  }
`

export const CardOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 7.6px;
  z-index: 1;
`

export const InfoLength = styled.p`
  font-size: 16px;
  font-weight: 600;
`

export const InfoDescription = styled.p`
  font-size: 12px;
`

export const RibbonBox = styled.div`
  position: absolute;
  padding: 2px 8px;
  box-sizing: border-box;
  z-index: 10;
  color: ${props => props.theme.colors.colorTextSignForm};
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  top: -15px;
  right: -3px;
  background-color: ${props => props.theme.colors.primary};
  max-width: 180px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  ${props => props.theme.rtl && css`
    left: -3px;
    right: initial;
  `}

  ${({ bgColor }) => bgColor && css`
    background-color: ${bgColor};
  `}

  ${({ isRoundRect }) => isRoundRect && css`
    border-radius: 7.6px;
  `}

  ${({ isCapsule }) => isCapsule && css`
    border-radius: 50px;
  `}

  ${({ colorText }) => colorText && css`
    color: ${colorText ? 'black' : 'white'};
  `}

  ${({ borderRibbon }) => borderRibbon && css`
    border: 1px solid ${borderRibbon ? 'black' : 'white'};
  `}
`

export const FavoriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
  ${props => props.theme.rtl && css`
    margin-right: 15px;
    margin-left: 0px;
  `}
  svg {
    position: relative;
    top: 6px;
    font-size: 20px;
    color: ${props => props.theme.colors.danger500};
  }
`

export const BusinessNameContainer = styled.div`
  width: 60%;
`

export const BusinessDistance = styled(BusinessName)`
  color: #000;
  text-align: right;
  font-weight: 600;
`

export const BusinessNameContainerRight = styled.div`
  max-width: 35%;
`

export const OpenAtContainer = styled.div`
  color: ${({ isClosed, theme }) => isClosed ? theme?.colors?.primary : '#000'};
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
`

export const BusinessAddress = styled.div`
  margin-bottom: 10px;
`

export const ButtonSkeleton = styled.div`
  width: 100%;
  margin-top: 15px;
`
