import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #E9ECEF;
  cursor: pointer;

  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
`

export const IconControl = styled.div`
  display: flex;
  color: ${props => props.theme.colors.primary};
  margin-right: 5px;
  ${props => props.theme?.rtl && css`
    margin-left: 5px;
    margin-right: 0px;
  `}
  svg {
    font-size: 24px;
  }

  svg[disabled] {
    color: ${props => props.theme.colors.lightGray};
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
  cursor: pointer;

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

export const SubOptionThumbnail = styled.div`
  display: inline-block;
  border-radius: 8px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat, repeat;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
`

export const QuantityControl = styled.div`
  display: flex;
  color: ${props => props.theme.colors.darkGray};
  align-items: center;
  font-weight: 300;
  font-size: 18px;
  margin: 0 5px;

  svg {
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    margin-right: 6px;
    ${props => props.theme?.rtl && css`
      margin-left: 6px;
      margin-right: 0px;
    `}
    @media (min-width: 425px) {
      margin-right: 3px
      ${props => props.theme?.rtl && css`
        margin-right: 3px;
        margin-left: 0px;
    `}
    }
  }

  svg[disabled] {
    color: #CBCBCB;
  }

  svg:last-child {
    margin-left: 6px;
    margin-right: 0;
    ${props => props.theme?.rtl && css`
      margin-right: 6px;
      margin-left: 0px;
  `}
    @media (min-width: 425px) {
      margin-left: 3px;
      margin-right: 0;
      ${props => props.theme?.rtl && css`
        margin-right: 3px;
        margin-left: 0px;
    `}
    }
  }
`

export const PositionControl = styled.div`
  display: flex;
  align-items: center;
  color: #909BA9;
  font-weight: 300;
  font-size: 18px;
  margin: 0 5px;

  svg {
    font-size: 20px;
    margin-right: 5px;
    ${props => props.theme?.rtl && css`
      margin-left: 5px;
      margin-right: 0px;
    `}
    &.reverse {
      transform: rotate(180deg);
    }

    &.selected {
      color: ${props => props.theme.colors.primary};
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.2
    }
    &.disable-clicks {
      pointer-events: none;
    }

    &:last-child {
      margin-right: 0;
      ${props => props.theme?.rtl && css`
        margin-left: 0;
      `}
    }
  }
`

export const SuboptionPrice = styled.div`
  display: flex;
  white-space: nowrap;
  font-weight: 300;
  font-size: 14px;
  color: ${props => props.theme.colors.darkGray};
  margin-left: 5px;
  min-width: 60px;
  ${props => props.theme?.rtl && css`
    margin-right: 5px;
    margin-left: 0px;
  `}
`

export const LeftOptionContainer = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
`

export const RightOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 425px) {
    flex-direction: row;
  }
`

export const ExtraControl = styled.div`
  display: flex;
  align-items: center;
  color: #CBCBCB;
  font-weight: 300;
  font-size: 18px;
  margin: 0 5px;

  svg {
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    margin-right: 3px;
    ${props => props.theme?.rtl && css`
      margin-left: 3px;
      margin-right: 0px;
    `}
  }
  svg[disabled] {
    color: ${props => props.theme.colors.lightGray};
  }
`

export const ExtraItem = styled.div`
  display: flex;
  &.disabled {
      pointer-events: none;
      opacity: 0.2
    }
`

export const HeaderSuboption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
