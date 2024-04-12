import styled, { css } from 'styled-components'

export const CategoriesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 5px 0px 0px 0px;
  background: #E9ECEF;
  z-index: 1000;
  position: absolute;
  top: 65px;
  border-bottom: 1px solid #D9D9D9;
  text-align: center;
  width: ${props => props.w || '98%'};
  box-sizing: border-box;
  div.category {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 13px 0px;
    margin: 0 15px;
    font-weight: 600;
    color: ${({ theme }) => theme?.colors?.primary};
    &:nth-of-type(1) {
      margin-left: 0;
      ${props => props.theme.rtl && css`
        margin-left: 15px;
        margin-right: 15px;
      `}
    }
  }

  div.special {
    ${props => !props.featured && css`
      display: none
    `}
  }

  /* @media (min-width: 381px) {
    padding: 15px 0px 0px 0px;
  } */
  @media (min-width: 769px) {
    ${({ isProfessional }) => isProfessional && css`
      width: 100%;
    `}
  }
  @media (min-width: 992px) {
    ${(props) => props.w && css`
      width: ${props.w};
    `}
  }
`
