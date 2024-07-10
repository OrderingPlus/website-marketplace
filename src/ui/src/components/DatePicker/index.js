import React from 'react'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { DateContainer } from './styles'

export const DatePickerUI = props => {
  props = { ...defaultProps, ...props }
  const { value, onChange, name } = props

  return (
    <DateContainer>
      <Calendar
        date={value}
        name={name}
        onChange={onChange}
        maxDate={new Date()}
      />
    </DateContainer>
  )
}

const defaultProps = {
  name: 'date'
}
