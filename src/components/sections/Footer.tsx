import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'
import type { SiteSettings } from '@/types'

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const s = settings || {}
  const businessName = s.business_name || 'בן-דוד נגרות'
  const phone = s.phone || '050-123-4567'
  const whatsapp = s.whatsapp || '972501234567'
  const email = s.email || 'info@bendavid-woodwork.co.il'
  const address = s.address || 'כפר סבא, מרכז הארץ'
  const instagram = s.instagram || '#'
  const facebook = s.facebook || '#'
  const year = new Date().getFullYear()
  const [first, ...rest] = businessName.split(' ')

  return (
    <footer id="contact" className="bg-charcoal border-t border-cream/8">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <h3 className="font-heading text-2xl text-cream mb-2">
              <span className="text-gold">{first}</span>{rest.length ? ' ' + rest.join(' ') : ''}
            </h3>
            <p className="text-cream/40 text-sm leading-relaxed mb-6">
              {s.footer_desc || 'עבודות עץ בהתאמה אישית – רהיטים, שולחנות ופתרונות עץ בעבודת יד מקצועית, עם תשומת לב לכל פרט.'}
            </p>
            <div className="flex gap-3">
              <a href={instagram} className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="Instagram">
                <Instagram size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
              </a>
              <a href={facebook} className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="Facebook">
                <Facebook size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="WhatsApp">
                <MessageCircle size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-5">ניווט מהיר</h4>
            <ul className="space-y-2.5">
              {[['#gallery', 'עבודות שלנו'], ['#process', 'תהליך העבודה'], ['#about', 'אודות'], ['#testimonials', 'המלצות לקוחות'], ['#contact', 'צור קשר']].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-cream/40 hover:text-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-5">יצירת קשר</h4>
            <ul className="space-y-4">
              {[
                { href: `tel:+${whatsapp}`, icon: Phone, label: phone },
                { href: `https://wa.me/${whatsapp}`, icon: MessageCircle, label: 'WhatsApp', external: true },
                { href: `mailto:${email}`, icon: Mail, label: email },
              ].map(({ href, icon: Icon, label, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <span className="text-cream/55 group-hover:text-cream transition-colors text-sm">{label}</span>
                  </a>
                </li>
              ))}
              <li>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <span className="text-cream/40 text-sm">{address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-cream/25 text-xs">© {year} {businessName}. כל הזכויות שמורות.</p>
          <a href="/admin/login" className="text-cream/15 hover:text-cream/35 text-xs transition-colors">כניסה לניהול</a>
        </div>
      </div>
    </footer>
  )
}
