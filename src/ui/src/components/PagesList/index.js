import React, { useEffect, useState } from 'react'
import { PagesListContainer } from './styles'
import { useApi, useLanguage } from '~components'

export const PagesList = ({ routes }) => {
  const [ordering] = useApi()
  const [roots, setRoots] = useState(routes)
  const [, t] = useLanguage()

  useEffect(() => {
    getPages()
  }, [])

  const getPages = async () => {
    try {
      const { response } = await ordering.pages().get()
      setRoots([...roots, ...response.data.result])
    } catch {}
  }

  return (
    <PagesListContainer>
      <h2>{t('SITEMAP', 'Site Map')}</h2>
      {roots.map((route, i) => (
        <span key={i}>
          <a href={route?.id ? `pages/${route.slug}` : route.slug}>{route.name}</a>
        </span>
      ))}
    </PagesListContainer>
  )
}
