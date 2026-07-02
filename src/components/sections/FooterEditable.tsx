'use client'

import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

export default function FooterEditable() {
  const { editing, draft } = useEditContext()

  const businessName = draft.business_name || 'Reef Woodworks'
  const phone = draft.phone || '053-313-9394'
  const whatsapp = draft.whatsapp || '972533139394'
  const email = draft.email || 'reefww3939@gmail.com'
  const address = draft.address || 'מרכז הארץ'
  const instagram = draft.instagram || '#'
  const facebook = draft.facebook || '#'
  const footerDesc = draft.footer_desc || 'עבודות עץ בהתאמה אישית – רהיטים, שולחנות ופתרונות עץ בעבודת יד מקצועית.'
  const year = new Date().getFullYear()
  const [first, ...rest] = businessName.split(' ')

  return (
    <footer id="contact" className="bg-charcoal border-t border-cream/8">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-cream mb-2">
              <span className="text-gold">{first}</span>{rest.length ? ' ' + rest.join(' ') : ''}
            </h3>
            <p className="text-cream/40 text-sm leading-relaxed mb-6">
              {editing
                ? <EditField fieldKey="footer_desc" className="text-cream/40 text-sm leading-relaxed" placeholder="תיאור קצר לפוטר" multiline />
                : footerDesc
              }
            </p>
            <div className="flex gap-3">
              {editing ? (
                <div className="space-y-2 w-full">
                  <div>
                    <label className="text-cream/30 text-xs block mb-1">Instagram URL</label>
                    <EditField fieldKey="instagram" className="text-cream/50 text-xs" placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="text-cream/30 text-xs block mb-1">Facebook URL</label>
                    <EditField fieldKey="facebook" className="text-cream/50 text-xs" placeholder="https://facebook.com/..." />
                  </div>
                </div>
              ) : (
                <>
                  <a href={instagram} className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="Instagram">
                    <Instagram size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
                  </a>
                  <a href={facebook} className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="Facebook">
                    <Facebook size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
                  </a>
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-cream/8 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all group" aria-label="WhatsApp">
                    <MessageCircle size={17} className="text-cream/50 group-hover:text-gold transition-colors" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick nav */}
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

          {/* Contact details */}
          <div>
            <h4 className="text-cream font-semibold mb-5">יצירת קשר</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={14} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    {editing
                      ? <>
                          <label className="text-cream/30 text-xs mb-1 block">טלפון (תצוגה)</label>
                          <EditField fieldKey="phone" className="text-cream/55 text-sm" placeholder="053-313-9394" />
                          <label className="text-cream/30 text-xs mt-2 mb-1 block">וואטסאפ (מספר בינלאומי)</label>
                          <EditField fieldKey="whatsapp" className="text-cream/40 text-xs" placeholder="972533139394" />
                        </>
                      : <a href={`tel:+${whatsapp}`} className="flex items-center gap-2 group">
                          <span className="text-cream/55 group-hover:text-cream transition-colors text-sm">{phone}</span>
                        </a>
                    }
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={14} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    {editing
                      ? <>
                          <label className="text-cream/30 text-xs mb-1 block">אימייל</label>
                          <EditField fieldKey="email" className="text-cream/55 text-sm" placeholder="email@example.com" />
                        </>
                      : <a href={`mailto:${email}`} className="text-cream/55 hover:text-cream transition-colors text-sm">{email}</a>
                    }
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    {editing
                      ? <>
                          <label className="text-cream/30 text-xs mb-1 block">כתובת / אזור</label>
                          <EditField fieldKey="address" className="text-cream/40 text-sm" placeholder="מרכז הארץ" />
                        </>
                      : <span className="text-cream/40 text-sm">{address}</span>
                    }
                  </div>
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
