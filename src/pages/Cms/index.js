import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { HelmetTags } from '../../components/HelmetTags'

import { Cms as CmsController } from '~ui'

export const Cms = (props) => {
  const { pageSlug } = useParams()
  const history = useHistory()

  const cmsProps = {
    ...props,
    pageSlug,
    handleCmsRedirect: () => {
      history.push('/pages')
    }
  }

  return (
    <>
      <HelmetTags page='pages' />
      <CmsController {...cmsProps} />
    </>
  )
}

export default Cms
