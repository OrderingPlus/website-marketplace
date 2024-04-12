import styled from 'styled-components'

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
  border: 1px solid #E9ECEF;
  border-radius: 10px;
`

export const Header = styled.div``

export const WrappMap = styled.div`
  width: 100%;
  margin: auto;
`

export const Map = styled.div`
  font-size: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    -webkit-user-drag: none;
    aspect-ratio: attr(width) / attr(height)
  }
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 15px 10px;
  h1{
    white-space: normal;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    margin: 0;
  }

  span {
    font-size: 13px!important;
    cursor: pointer;
    user-select: none;
    color: ${props => props.theme.colors.primary};
    font-weight: normal;
    text-decoration: underline;
  }
`

export const ToggleMap = styled.div`
  span {
    margin: 0;
  }
`
