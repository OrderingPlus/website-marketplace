import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { CategoriesContainer, CategoriesListing, CategoryContainer, CategoryInfomation } from './styles'

import { BusinessProductsCategories as ProductsCategories, useUtils } from '~components'

const BusinessProductsCategoriesUI = (props) => {
  const {
    isSkeleton,
    categories,
    business,
    handlerClickCategory,
    onClickCategory,
    setSelectedCategoryId
  } = props

  const [{ optimizeImage }] = useUtils()
  const scrollTopSpan = 60

  const handleChangeCategory = (category) => {
    setSelectedCategoryId(category?.id)
    const isBlockScroll = window.location.search.includes('category') &&
      window.location.search.includes('product')

    onClickCategory(category)
    if (business?.lazy_load_products_recommended) {
      handlerClickCategory({ ...category })
      return
    }
    let topPos = 0
    if (!category?.id) topPos = document.getElementById('businessProductList')?.offsetTop
    else topPos = document.getElementById(`category${category.id}`)?.offsetTop
    if (!isBlockScroll) {
      window.scroll({
        top: topPos - scrollTopSpan,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <CategoriesContainer>
      {!isSkeleton
        ? (
          <CategoriesListing>
            {categories && categories.length && categories.map((category, i) => (
              <CategoryContainer key={i} onClick={() => handleChangeCategory(category)}>
                <img
                  src={optimizeImage(category.image, 'h_1024,c_limit')}
                />
                <CategoryInfomation>
                  <h3>{category?.name}</h3>
                  {category?.description && (
                    <p>{category?.description}</p>
                  )}
                </CategoryInfomation>
              </CategoryContainer>
            ))}
          </CategoriesListing>
          )
        : (
          <div>
            <Skeleton height={50} />
            <CategoriesListing>
              {[...Array(5)].map((_, i) => (
                <CategoryContainer key={i} >
                  <Skeleton className='category-img' />
                  <CategoryInfomation>
                    <Skeleton className='category-title' />
                    <Skeleton className='category-description' />
                  </CategoryInfomation>
                </CategoryContainer>
              ))}
            </CategoriesListing>
          </div>
          )}
    </CategoriesContainer>
  )
}

export const BusinessProductsCategories = (props) => {
  const businessProductsCategoriesProps = {
    ...props,
    UIComponent: BusinessProductsCategoriesUI
  }

  return (
    <ProductsCategories {...businessProductsCategoriesProps} />
  )
}
