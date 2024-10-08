import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useTheme } from 'styled-components'
import MdKeyboardArrowLeft from '@meronex/icons/md/MdKeyboardArrowLeft'
import MdKeyboardArrowRight from '@meronex/icons/md/MdKeyboardArrowRight'

import { AutoscrollContainer } from './styles'

export const AutoScroll = (props) => {
  const {
    children,
    modal,
    special,
    scrollId,
    onHandleRightEnd,
    isColumnMode
  } = props
  const [parentElement, setParentElement] = useState([])
  const [containerElement, setContainerElement] = useState([])
  const theme = useTheme()
  const autoScrollId = scrollId || 'autoscroll'
  let handleEndFired = false
  useLayoutEffect(() => {
    const element = document?.getElementById(`${autoScrollId}`)?.parentNode
    element && element.parentNode.addEventListener('scroll', handleScroll)
    const containerElement = element?.parentNode
    setParentElement(element)
    setContainerElement(containerElement)

    return () => {
      if (containerElement?.length) {
        containerElement.removeEventListener('scroll', handleScroll)
      }
    }
  })

  useEffect(() => {
    handleScroll()
  })

  const handleScroll = () => {
    const autoScrollContainer = document?.getElementById(`${autoScrollId}`)
    const botonRight = autoScrollContainer?.querySelector?.('.right-autoscroll')
    const botonLeft = autoScrollContainer?.querySelector?.('.left-autoscroll')
    if (botonLeft || botonRight) {
      if (theme?.rtl) {
        if ((containerElement?.scrollLeft * -1) < 40) {
          if (!botonRight.classList.contains('hidden') && onHandleRightEnd && !handleEndFired) {
            handleEndFired = true
            onHandleRightEnd()
          }
          botonRight && botonRight.classList.add('hidden')
        } else {
          botonRight && botonRight.classList.remove('hidden')
        }
        if ((containerElement?.scrollLeft * -1) > parentElement?.scrollWidth - containerElement?.offsetWidth - 40) {
          botonLeft && botonLeft.classList.add('hidden')
        } else {
          botonLeft && botonLeft.classList.remove('hidden')
        }
      } else {
        if (containerElement?.scrollLeft < 40) {
          botonLeft && botonLeft.classList.add('hidden')
        } else {
          botonLeft && botonLeft.classList.remove('hidden')
        }
        if (containerElement?.scrollLeft > parentElement?.scrollWidth - containerElement?.offsetWidth - 40) {
          if (!botonRight.classList.contains('hidden') && onHandleRightEnd && !handleEndFired) {
            handleEndFired = true
            onHandleRightEnd()
          }
          botonRight && botonRight.classList.add('hidden')
        } else {
          handleEndFired = false
          botonRight && botonRight.classList.remove('hidden')
        }
      }
    }
  }

  const scrolling = (left) => {
    if (left) {
      containerElement.scrollBy({
        top: 0,
        left: (((-parentElement.offsetWidth / 10) > -200) ? -200 : -parentElement.offsetWidth / 10),
        behavior: 'smooth'
      })
    } else {
      containerElement.scrollBy({
        top: 0,
        left: (((+parentElement.offsetWidth / 10) < 200) ? 200 : +parentElement.offsetWidth / 10),
        behavior: 'smooth'
      })
    }
  }

  return (
    <AutoscrollContainer modal={modal} id={`${autoScrollId}`} isColumnMode={isColumnMode}>
      {
        (!special ? containerElement?.offsetWidth < parentElement?.offsetWidth + 50 : containerElement?.offsetWidth < parentElement?.offsetWidth) && !isColumnMode ? <MdKeyboardArrowLeft className='left-autoscroll' onMouseDown={() => scrolling(true)} /> : ''
      }
      {children}
      {
        (!special ? containerElement?.offsetWidth < parentElement?.offsetWidth + 50 : containerElement?.offsetWidth < parentElement?.offsetWidth) && !isColumnMode ? <MdKeyboardArrowRight className='right-autoscroll' onMouseDown={() => scrolling()} /> : ''
      }
    </AutoscrollContainer>
  )
}
