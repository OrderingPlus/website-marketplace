import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  svg {
    margin: 0 10px;
  }
`
export const ActionWrapper = styled.div`
  display: flex;
  gap: 10px;
  > button {
    height: 44px;

    &.light {
      border: 1px solid ${props => props.theme.colors.primaryContrast};
      background: ${props => props.theme.colors.primaryContrast};
      &:hover {
        background: ${props => props.theme.colors.primary};
      }
    }
    @media (max-width: 853px) {
      font-size: 12px;
    }
  }

  @media (min-width: 768px) {
    justify-content: space-between;
  }
  @media (max-width: 400px) {
    justify-content: space-between;
  }
`
