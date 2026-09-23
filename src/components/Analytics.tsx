'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = 'G-JHYEVWJL0Q'
const CONSENT_EVENT = 'cookie-consent-granted'

export default function Analytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('cookie_consent') === '1') setConsented(true)
    } catch {}

    const onConsent = () => setConsented(true)
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  )
}
