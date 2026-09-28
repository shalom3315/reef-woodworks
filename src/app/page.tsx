export const revalidate = 3600

import { createClient } from '@/lib/supabase'
import { safeJsonLd } from '@/lib/safeJsonLd'
import EditProvider from '@/components/EditProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Gallery from '@/components/sections/Gallery'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import FooterEditable from '@/components/sections/FooterEditable'
import Videos from '@/components/sections/Videos'
import FAQ from '@/components/sections/FAQ'
import ColorSwatches from '@/components/sections/ColorSwatches'
import type { Project, Testimonial, SiteSettings, FAQ as FAQType } from '@/types'

const DEFAULT_SETTINGS: SiteSettings = {
  business_name: 'Reef Woodworks',
  logo_url: '/logo.png',
  hero_title: 'עבודות עץ בהתאמה אישית',
  hero_subtitle: 'פרגולות, דקים, גדרות וריהוט גן, מהמדידה הראשונה ועד ההתקנה.',
  hero_badge: 'נגרות חוץ · מרכז הארץ',
  stat_years: '7',
  stat_projects: '150+',
  stat_handmade: '100%',
  about_text: 'אני אלי מרקוס, בן 26, ואני עובד עם עץ מאז שאני זוכר את עצמי.\n\nכל פרויקט מתחיל בשיחה, ממשיך בתכנון ונגמר בעבודה שתשרת אתכם שנים.',
  about_name: 'אלי מרקוס',
  about_title: 'נגר ובעל הסדנה · ריף וודוורקס',
  cta_title: 'ספרו לנו מה אתם רוצים לבנות',
  cta_badge: 'יש לכם רעיון?',
  cta_subtitle: 'השיחה הראשונה בחינם ובלי התחייבות. שלחו תמונה של המקום ונגיד לכם מה אפשר לעשות שם.',
  cta_btn_whatsapp: 'שלחו הודעה בוואטסאפ',
  phone: '053-221-3939',
  whatsapp: '972532213939',
  email: 'reefww3939@gmail.com',
  address: 'מרכז הארץ',
  instagram: '#',
  facebook: '#',
  footer_desc: 'פרגולות, דקים, גדרות וריהוט גן מעץ, בהתאמה אישית. מרכז הארץ.',
  benefits_label: 'למה לבחור בנו',
  benefits_heading: 'מה מקבלים כשעובדים איתנו',
  benefits_desc: 'כל פרויקט נמדד ונבנה לפי המידות והסגנון של הבית שלכם.',
  benefits_0_accent: 'בנוי ביד',
  benefits_0_title: 'עבודת יד מקצועית',
  benefits_0_desc: 'כל פריט נבנה ביד ולפי מידה, בלי פס ייצור.',
  benefits_1_accent: 'העץ הנכון לחוץ',
  benefits_1_title: 'חומרים איכותיים',
  benefits_1_desc: 'אורן, אלון, דוגלס, איפאה, במבוק ועוד. העץ עובר ייבוש מבוקר ועיבוד לפני הבנייה, כדי שיחזיק שנים בחוץ.',
  benefits_2_accent: 'לפי המידות שלכם',
  benefits_2_title: 'התאמה אישית מלאה',
  benefits_2_desc: 'המידות, הצורה וגוון העץ נקבעים לפי החצר והבית שלכם.',
  benefits_3_accent: 'זמינים לאורך העבודה',
  benefits_3_title: 'שירות אישי',
  benefits_3_desc: 'מהשיחה הראשונה ועד סוף ההתקנה אפשר לשאול כל שאלה, ותקבלו עדכונים תוך כדי העבודה.',
}

async function getData() {
  try {
    const supabase = createClient()

    const [settingsRes, projectsRes, testimonialsRes, videosRes, faqsRes] = await Promise.all([
      supabase.from('site_settings').select('key, value'),
      supabase.from('projects').select('*').order('order_index'),
      supabase.from('testimonials').select('*').order('created_at'),
      supabase.from('videos').select('*').order('order_index'),
      supabase.from('faqs').select('*').order('order_index'),
    ])

    const settings: SiteSettings = { ...DEFAULT_SETTINGS }
    if (settingsRes.data) {
      settingsRes.data.forEach((row) => {
        settings[row.key] = row.value
      })
    }

    return {
      settings,
      projects: (projectsRes.data as Project[]) || [],
      testimonials: (testimonialsRes.data as Testimonial[]) || [],
      videos: (videosRes.data as { id: string; title: string; description: string; video_url: string; order_index: number }[]) || [],
      faqs: (faqsRes.data as FAQType[]) || [],
    }
  } catch {
    return { settings: DEFAULT_SETTINGS, projects: [], testimonials: [], videos: [], faqs: [] }
  }
}

export default async function Home() {
  const { settings, projects, testimonials, videos, faqs } = await getData()

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <main className="overflow-x-hidden">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <EditProvider initialSettings={settings}>
        <Navbar businessName={settings.business_name ?? 'Reef Woodworks'} logoUrl={settings.logo_url} />
        <Hero />
        <Benefits />
        <Gallery projects={projects} />
        <Videos videos={videos} />
        <Process />
        <ColorSwatches />
        <About />
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
        <CTA />
        <FooterEditable />
      </EditProvider>
    </main>
  )
}
