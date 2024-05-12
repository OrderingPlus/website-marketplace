import styled from 'styled-components'

export const CategoriesContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  * {
    box-sizing: border-box;
  }
`

export const CategoriesListing = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const CategoryContainer = styled.div`
  border-radius: 10px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.10);
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  cursor: pointer;
  .category-img, img {
    width: 105px;
    min-width: 105px;
    height: 68px;
    min-width: 105px;
    border-radius: 10px;
    margin-right: 15px;
  }
`

export const CategoryInfomation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;

  h3, p {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  h3 {
    color: ${({ theme }) => theme?.colors?.primary};
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
  }
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-clamp: 2;
    -webkit-line-clamp: 2;
  }
  .category-title {
    width: 45vw;
  }
  .category-description {
    width: 25vw;
  }
`
