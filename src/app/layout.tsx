import type { Metadata } from 'next'
import { Rubik, Heebo } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import SiteWidgets from '@/components/SiteWidgets'

const frank = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-frank',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

const SITE_URL = 'https://reef-woodworks.vercel.app'
const OG_IMAGE = 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=80'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ריף וודוורקס | נגרות בהתאמה אישית — אלי מרקוס',
    template: '%s | ריף וודוורקס',
  },
  description:
    'נגרות חוץ בהתאמה אישית במרכז הארץ — פרגולות עץ, דקים, גדרות, ריהוט גן ופרויקטים מיוחדים בעבודת יד. אלי מרקוס, ריף וודוורקס. הצעת מחיר חינם.',
  keywords: 'פרגולה עץ, פרגולות עץ, נגרות חוץ, דק עץ, דקים, גדר עץ, גדרות עץ, ריהוט גן, ריהוט גן עץ, פרגולה הצללה, סוכת עץ, גזיבו עץ, נגר חוץ, נגר מרכז הארץ, נגר גוש דן, נגר תל אביב, פרגולה מרכז הארץ, עבודות עץ חוץ, עץ בהתאמה אישית, ריף וודוורקס, אלי מרקוס',
  authors: [{ name: 'אלי מרקוס', url: SITE_URL }],
  creator: 'אלי מרקוס',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: SITE_URL,
    siteName: 'ריף וודוורקס',
    title: 'ריף וודוורקס | נגרות חוץ בהתאמה אישית',
    description: 'פרגולות, דקים, גדרות וריהוט גן מעץ בעבודת יד — אלי מרקוס. הצעת מחיר חינם.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'ריף וודוורקס — עבודות עץ בהתאמה אישית' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ריף וודוורקס | נגרות חוץ בהתאמה אישית',
    description: 'פרגולות, דקים, גדרות וריהוט גן מעץ בעבודת יד — אלי מרקוס.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'Vgm6iSrVMI0fYgvON7V54dgteWLgOjIF09PD_dUiHuY',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: 'ריף וודוורקס',
  alternateName: 'Reef Woodworks',
  description: 'נגרות חוץ בהתאמה אישית — פרגולות, דקים, גדרות וריהוט גן מעץ מלא. אלי מרקוס, מרכז הארץ.',
  url: SITE_URL,
  telephone: '+972532213939',
  email: 'reefww3939@gmail.com',
  priceRange: '₪₪',
  image: OG_IMAGE,
  logo: `${SITE_URL}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IL',
    addressRegion: 'מרכז',
    addressLocality: 'גוש דן',
  },
  areaServed: [
    { '@type': 'City', name: 'תל אביב' },
    { '@type': 'City', name: 'רמת גן' },
    { '@type': 'City', name: 'פתח תקווה' },
    { '@type': 'City', name: 'ראשון לציון' },
    { '@type': 'City', name: 'חולון' },
    { '@type': 'AdministrativeArea', name: 'מרכז הארץ' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'שירותי נגרות חוץ',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'פרגולות עץ בהתאמה אישית' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'דקים מעץ' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'גדרות עץ' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ריהוט גן מעץ' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'הצללה וסוכות עץ' } },
    ],
  },
  sameAs: [
    'https://www.tiktok.com/@reef.woodworks',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+972532213939',
    contactType: 'customer service',
    availableLanguage: 'Hebrew',
    contactOption: 'TollFree',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${heebo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-body bg-cream text-charcoal antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JHYEVWJL0Q" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JHYEVWJL0Q');
        `}</Script>
        {children}
        <SiteWidgets />
      </body>
    </html>
  )
}
