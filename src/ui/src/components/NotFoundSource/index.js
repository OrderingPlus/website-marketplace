import React from 'react'
import FdPageSearch from '@meronex/icons/fd/FdPageSearch'

import {
  NotFound,
  NotFoundImage,
  ButtonWrapper
} from './styles'

import { Button } from '~ui'

export const NotFoundSource = (props) => {
  const {
    content,
    btnTitle,
    conditioned,
    onClickButton
  } = props

  return (
    <NotFound id='not-found-source'>
      <NotFoundImage>
        <FdPageSearch />
      </NotFoundImage>
      {content && conditioned && <h1>{content}</h1>}
      {content && !conditioned && <h1>{content}</h1>}
      {!onClickButton && props.children && (
        props.children
      )}
      {onClickButton && (
        <ButtonWrapper>
          <Button
            outline
            color='primary'
            onClick={() => onClickButton()}
          >
            {btnTitle}
          </Button>
        </ButtonWrapper>
      )}
    </NotFound>
  )
}
