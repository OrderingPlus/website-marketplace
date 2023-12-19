import React, { useEffect } from 'react'
import { useTheme } from 'styled-components'
import { HelmetTags } from '../../components/HelmetTags'
import { IntercomWrapper } from '../../components/IntercomWrapper'

import { useConfig } from '~components'
import { UserProfileForm as UserProfileFormOriginal, useWindowSize } from '~ui'
import { UserProfileForm as UserProfileFormOld } from '../../ui/src/components/UserProfileForm/layouts/Old'

export const Profile = (props) => {
  const windowSize = useWindowSize()

  const profileProps = {
    ...props,
    refreshSessionUser: true,
    showLogout: true,
    hideOptions: windowSize.width < 576
  }

  const theme = useTheme()
  const [{ configs }] = useConfig()
  const isIntercomEnabled = configs?.intercom_enabled?.value === '1'
  const layout = theme?.profile?.components?.layout?.type

  useEffect(() => {
    if (isIntercomEnabled) {
      window?.Intercom?.('boot', window.intercomSettings)
    } else {
      window?.Intercom?.('shutdown')
    }

    return () => {
      window?.Intercom?.('shutdown')
    }
  }, [isIntercomEnabled])

  return (
    <IntercomWrapper>
      <HelmetTags page='profile' />
      {layout === 'old'
        ? (
            <UserProfileFormOld {...profileProps} />
          )
        : (
            <UserProfileFormOriginal {...profileProps} />
          )}
    </IntercomWrapper>
  )
}

export default Profile
