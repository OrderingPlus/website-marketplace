import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { SignUpDriver as SignUpDriverController } from '~ui'

export const SignUpDriver = (props) => {
  const SignUpDriverProps = {
    ...props,
    isDriverSignup: true
  }
  return (
    <>
      <HelmetTags page='signup_driver' />
      <SignUpDriverController {...SignUpDriverProps} />
    </>
  )
}

export default SignUpDriver
