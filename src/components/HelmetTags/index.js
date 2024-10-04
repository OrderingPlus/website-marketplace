import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useTheme } from 'styled-components'
import parse from 'html-react-parser'
import helmetData from '../../helmetdata.json'
import settings from '../../config'
import { useConfig } from '~components'

export const HelmetTags = (props) => {
  const {
    page
  } = props

  const {
    REACT_APP_OG_TITLE,
    REACT_APP_OG_DESCRIPTION,
    REACT_APP_OG_URL,
    REACT_APP_OG_SITE_NAME,
    REACT_APP_OG_IMAGE
  } = process.env

  const theme = useTheme()
  const [configs] = useConfig()
  const enabledPoweredByOrdering = configs?.powered_by_ordering_module?.value
  const metaTag = page ? helmetData[page] : helmetData.app
  const replaceFunction = useCallback((domNode) => {
    if (domNode?.type === 'script' && !!domNode?.children?.[0]?.data) {
      const scripts = Array.from(document.getElementsByTagName('script'))
      const found = scripts.find(script => script.innerHTML === domNode?.children?.[0]?.data)
      if (found) return
      const script = document.createElement('script')
      script.innerHTML = domNode.children[0].data
      document.head.appendChild(script)
    }
  }, [theme?.third_party_code?.head])

  return (
    <Helmet titleTemplate={!page ? '' : `${theme?.my_products?.components?.website_settings?.components?.values?.name || settings.app_name} - %s`}>
      <title id={`route-${page}`}>{props.helmetMetaTags?.title || metaTag.title} {enabledPoweredByOrdering ? '- Powered by Orderingplus' : ''}</title>
      <meta name='description' content={(theme?.my_products?.components?.website_settings?.components?.values?.description || props.helmetMetaTags?.description || metaTag.description) + (enabledPoweredByOrdering ? ' Powered by Orderingplus' : '')} />
      <meta name='keywords' content={props.helmetMetaTags?.keywords || metaTag.keywords} />
      {props.robots
        ? (
        <meta name='robots' content={props.robots} />
          )
        : (
            metaTag.robots && <meta name='robots' content={metaTag.robots} />
          )}
      {props.canonicalUrl
        ? (
        <link rel='canonical' href={props.canonicalUrl} />
          )
        : (
            metaTag.canonicalUrl && <link rel='canonical' href={metaTag.canonicalUrl} />
          )}
      {theme?.third_party_code?.head && parse(theme?.third_party_code?.head, { replace: replaceFunction })}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={REACT_APP_OG_TITLE} />
      <meta property="og:description" content={REACT_APP_OG_DESCRIPTION} />
      <meta property="og:url" content={REACT_APP_OG_URL} />
      <meta property="og:site_name" content={REACT_APP_OG_SITE_NAME} />
      <meta property="og:image" content={REACT_APP_OG_IMAGE} />
      <meta property="og:image:type" content="image/png" />
    </Helmet>
  )
}

export default HelmetTags
