import React from 'react'
import { useLocation } from 'react-router-dom'
import { HelmetTags } from '../../components/HelmetTags'

import { useEvent } from '~components'
import { ResetPassword as ResetPasswordController } from '~ui'

export const ResetPassword = (props) => {
  const [events] = useEvent()
  const { search } = useLocation()
  let code, random

  if (search) {
    const data = search.substring(1).split('&')
    code = data[0]
    random = data[1]
  }

  const codeString = code && code.split('=')[1]
  const randomString = random && random.split('=')[1]

  const resetPasswordProps = {
    ...props,
    code: codeString,
    random: randomString,
    redirectResetPassword: ({ code, random }) => {
      events.emit('go_to_page', {
        page: 'reset_password',
        search: `?code=${code}&random=${random}`
      })
    }
  }
  return (
    <>
      <HelmetTags page='resetpassword' />
      <ResetPasswordController {...resetPasswordProps} />
    </>
  )
}

export default ResetPassword
