import React from 'react'
import env from 'react-dotenv'

const MetaTags = () => {
  const {
    REACT_APP_OG_TITLE,
    REACT_APP_OG_DESCRIPTION,
    REACT_APP_OG_SITE_NAME,
    REACT_APP_OG_IMAGE
  } = env

  return (
    <>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={REACT_APP_OG_TITLE} />
      <meta property="og:description" content={REACT_APP_OG_DESCRIPTION} />
      <meta property="og:site_name" content={REACT_APP_OG_SITE_NAME} />
      <meta property="og:image" content={REACT_APP_OG_IMAGE} />
      <meta property="og:image:type" content="image/png" />
    </>
  )
}

export default MetaTags
