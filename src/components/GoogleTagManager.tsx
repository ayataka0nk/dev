import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const pageview = (url: string) => {
  console.log('pushed')
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}

const GoogleTagManager = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return <>{children}</>
}

export default GoogleTagManager
