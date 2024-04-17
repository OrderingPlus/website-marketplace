import React from 'react'
import {
  BrowserRouter
} from 'react-router-dom'

import { App } from './App'

export const Router = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
