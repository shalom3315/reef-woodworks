'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_ID = 'G-JHYEVWJL0Q'
const CONSENT_EVENT = 'cookie-consent-granted'

type Gtag = (...args: unknown[]) => void
const getGtag = () => (window as unknown as { gtag?: Gtag }).gtag

// Google Consent Mode v2 (advanced). gtag loads for every visitor, but until the
// cookie banner is accepted it runs with storage denied: no cookies are written
// and Google receives only anonymous, cookieless pings. Accepting the banner
// flips analytics_storage to granted. Ads storage stays denied, the site runs no ads.
export default function Analytics() {
  useEffect(() => {
    const grant = () => getGtag()?.('consent', 'update', { analytics_storage: 'granted' })
    window.addEventListener(CONSENT_EVENT, grant)
    return () => window.removeEventListener(CONSENT_EVENT, grant)
  }, [])

  // Every WhatsApp or phone tap is a lead. One delegated listener covers all
  // contact links on every page, including ones added later. It runs regardless
  // of consent; without consent the event goes out as a cookieless ping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link || link.hasAttribute('data-no-lead')) return
      const href = link.getAttribute('href') || ''
      const method = href.includes('wa.me') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : null
      if (!method) return
      getGtag()?.('event', 'generate_lead', {
        method,
        page_path: window.location.pathname,
        link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 60),
        transport_type: 'beacon',
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return (
    <>
      {/* Consent defaults must run before gtag.js and before config */}
      <Script id="ga4-consent" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        var granted = false;
        try { granted = localStorage.getItem('cookie_consent') === '1'; } catch (e) {}
        gtag('consent', 'default', {
          analytics_storage: granted ? 'granted' : 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  )
}
