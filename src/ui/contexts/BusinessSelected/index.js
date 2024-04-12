import * as React from 'react'

export const BusinessSelectedContext = React.createContext(null)

export const BusinessSelectedProvider = ({ children }) => {
  const [
    businessSelected,
    setBusinessSelected
  ] = React.useState(null)

  const onChangeBusinessSelected = (business) => {
    setBusinessSelected(business)
  }

  return (
    <BusinessSelectedContext.Provider value={[businessSelected, { onChangeBusinessSelected }]}>
      {children}
    </BusinessSelectedContext.Provider>
  )
}

// hook context

export function useBusinessSelected () {
  const BusinessSelectedManager = React.useContext(BusinessSelectedContext)
  return BusinessSelectedManager || [{}, () => {}]
}
