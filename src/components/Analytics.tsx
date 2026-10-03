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

  // Every WhatsApp or phone tap is a lead. One delegated listener covers all
  // contact links on every page, including ones added later
  useEffect(() => {
    if (!consented) return
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link || link.hasAttribute('data-no-lead')) return
      const href = link.getAttribute('href') || ''
      const method = href.includes('wa.me') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : null
      if (!method) return
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      gtag?.('event', 'generate_lead', {
        method,
        page_path: window.location.pathname,
        link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 60),
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [consented])

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
