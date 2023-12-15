import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { SessionsList as SessionsListController } from '~ui'

export const SessionsList = (props) => {
  return (
    <>
      <HelmetTags page='sessions' />
      <SessionsListController {...props} />
    </>
  )
}

export default SessionsList
