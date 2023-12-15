import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { UserVerification as UserVerificationController } from '~ui'

export const UserVerification = (props) => {
  return (
    <>
      <HelmetTags page='user-verification' />
      <UserVerificationController {...props} />
    </>
  )
}

export default UserVerification
