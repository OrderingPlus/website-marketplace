import React, { useEffect } from 'react'
import { useSession, useConfig } from '~components'

export const IntercomWrapper = (props) => {
  const [{ user, auth }] = useSession()
  const [{ configs }] = useConfig()
  const isIntercomEnabled = configs?.intercom_enabled?.value === '1'
  const intercomAppId = configs?.intercom_app_id?.value

  const userName = user?.lastname ? `${user?.name} ${user?.lastname}` : user?.name
  const phoneNumber = user?.country_phone_code && user?.cellphone
    ? `+${user?.country_phone_code} ${user?.cellphone}`
    : user?.cellphone

  const addIntercomScript = () => {
    const isBlockUpdate = user?.email?.includes('@ordering.co')
    if (!isBlockUpdate) {
      const _intercomSettings = {
        api_base: 'https://api-iam.intercom.io',
        app_id: intercomAppId,
        name: userName,
        user_id: user?.email,
        email: user?.email
      }
      if (phoneNumber) {
        _intercomSettings.phone = phoneNumber
      }
      window.intercomSettings = _intercomSettings
      const func = (function () { const w = window; const ic = w.Intercom; if (typeof ic === 'function') { ic('reattach_activator'); ic('update', w.intercomSettings) } else { const d = document; const i = function () { i.c(arguments) }; i.q = []; i.c = function (args) { i.q.push(args) }; w.Intercom = i; const l = function () { const s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = `https://widget.intercom.io/widget/${intercomAppId}`; const x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x) }; if (document.readyState === 'complete') { l() } else if (w.attachEvent) { w.attachEvent('onload', l) } else { w.addEventListener('load', l, false) } } })()
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = func
      script.id = 'intercom_widget'
      document.body.appendChild(script)
    }
  }

  useEffect(() => {
    if (!auth || !isIntercomEnabled || !intercomAppId) {
      window?.Intercom?.('shutdown')
    }
    if (window.document.getElementById('intercom_widget') || !auth || !isIntercomEnabled || !intercomAppId) {
      return
    }
    addIntercomScript()
  }, [user, auth, isIntercomEnabled, intercomAppId])

  return <>{props.children}</>
}
