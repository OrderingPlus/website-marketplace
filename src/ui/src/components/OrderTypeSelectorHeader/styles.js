import styled from 'styled-components'

export const HeaderItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.theme?.colors.darkGray};
  min-width: 70px;
  text-align: center;
  white-space: nowrap;
`
