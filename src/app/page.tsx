export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase'
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
import type { Project, Testimonial, SiteSettings, FAQ as FAQType } from '@/types'

const DEFAULT_SETTINGS: SiteSettings = {
  business_name: 'Reef Woodworks',
  hero_title: 'עבודות עץ בהתאמה אישית',
  hero_subtitle: 'רהיטים, שולחנות ופתרונות עץ בעבודת יד. מחומרים מהטבע, עם תשומת לב לכל פרט.',
  hero_badge: 'נגרות בהתאמה אישית · עבודת יד',
  stat_years: '15+',
  stat_projects: '200+',
  stat_handmade: '100%',
  about_text: 'אני אלי מרקוס, בן 26, ומאז שאני זוכר את עצמי — עץ תמיד היה שם. לא כחומר, אלא כשפה.\n\nכל פרויקט מתחיל בשיחה, מתפתח לרעיון, ומסתיים ביצירה שתשרת אתכם שנים קדימה. אני מאמין שרהיט טוב הוא לא רק פונקציה — הוא חלק מהבית, מהמשפחה, מהסיפור.',
  about_name: 'אלי מרקוס',
  about_title: 'נגר ובעל הסדנה · ריף וודוורקס',
  cta_title: 'נהפוך אותו לעץ אמיתי',
  cta_badge: 'יש לכם רעיון?',
  cta_subtitle: 'שיחה ראשונה היא תמיד חינם וללא התחייבות. ספרו לנו על החלום – ונגיד לכם איך להגשים אותו.',
  cta_btn_whatsapp: 'שלחו הודעה בוואטסאפ',
  phone: '053-313-9394',
  whatsapp: '972533139394',
  email: 'reefww3939@gmail.com',
  address: 'מרכז הארץ',
  instagram: '#',
  facebook: '#',
  footer_desc: 'עבודות עץ בהתאמה אישית – רהיטים, שולחנות ופתרונות עץ בעבודת יד מקצועית, עם תשומת לב לכל פרט.',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <EditProvider initialSettings={settings}>
        <Navbar businessName={settings.business_name ?? 'Reef Woodworks'} logoUrl={settings.logo_url} />
        <Hero />
        <Benefits />
        <Gallery projects={projects} />
        <Process />
        <Videos videos={videos} />
        <About />
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
        <CTA />
        <FooterEditable />
      </EditProvider>
    </main>
  )
}
