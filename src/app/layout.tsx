import type { Metadata } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: 'Reef Woodworks | עבודות עץ בהתאמה אישית',
  description:
    'רהיטים, שולחנות ופתרונות עץ בעבודת יד מקצועית. התאמה אישית מלאה, חומרים איכותיים, ניסיון של שנים.',
  keywords: 'נגרות, רהיטים, עץ, שולחנות, ארונות, עבודת יד, התאמה אישית, נגר, Reef Woodworks',
  openGraph: {
    title: 'Reef Woodworks | עבודות עץ בהתאמה אישית',
    description: 'רהיטים ופתרונות עץ בעבודת יד מקצועית.',
    type: 'website',
    locale: 'he_IL',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${heebo.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
