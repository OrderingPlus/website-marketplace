import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { SignUpBusiness as SignUpBusinessController } from '~ui'

export const SignUpBusiness = (props) => {
  return (
    <>
      <HelmetTags page='signup_business' />
      <SignUpBusinessController {...props} />
    </>
  )
}

export default SignUpBusiness
