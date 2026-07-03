import type { Metadata } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

const frank = Frank_Ruhl_Libre({
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
    'נגר מקצועי במרכז הארץ — שולחנות אוכל, ארונות, מיטות ורהיטים בהתאמה אישית מעץ מלא. אלי מרקוס, ריף וודוורקס. הצעת מחיר חינם.',
  keywords: 'נגר, נגרות, נגר פרטי, נגר לבית, רהיטים בהתאמה אישית, ריהוט עץ מלא, שולחן אוכל עץ, ארון עץ, מיטה מעץ, ספרייה מעץ, מדפים מעץ, שידה עץ, פינת אוכל עץ, עבודות נגרות, נגר מרכז הארץ, נגר גוש דן, נגר תל אביב, ריהוט בהתאמה אישית, עץ אלון, עבודת יד, ריף וודוורקס, אלי מרקוס',
  authors: [{ name: 'אלי מרקוס', url: SITE_URL }],
  creator: 'אלי מרקוס',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: SITE_URL,
    siteName: 'ריף וודוורקס',
    title: 'ריף וודוורקס | נגרות בהתאמה אישית',
    description: 'רהיטים, שולחנות וארונות עץ בעבודת יד — אלי מרקוס. הצעת מחיר חינם.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'ריף וודוורקס — עבודות עץ בהתאמה אישית' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ריף וודוורקס | נגרות בהתאמה אישית',
    description: 'רהיטים, שולחנות וארונות עץ בעבודת יד — אלי מרקוס.',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${heebo.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased">
        {children}
        <ChatWidget />
        <a
          href="https://wa.me/9720556752495"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 -rotate-90 origin-left translate-x-[calc(1.5rem)] text-[10px] tracking-widest text-charcoal/20 hover:text-charcoal/50 transition-colors duration-300 font-body uppercase select-none"
          style={{ writingMode: 'horizontal-tb' }}
        >
          Built by Shalom
        </a>
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 items-start">
          <a
            href="https://www.tiktok.com/@reef.woodworks"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok · @reef.woodworks"
            className="flex items-center gap-2 bg-[#010101] hover:bg-[#2a2a2a] text-white text-xs font-medium px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
            </svg>
            TikTok
          </a>
          <a
            href="https://wa.me/972533139394"
            target="_blank"
            rel="noopener noreferrer"
            title="אלי מרקוס · 053-313-9394"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-medium px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            אלי
          </a>
        </div>
      </body>
    </html>
  )
}
