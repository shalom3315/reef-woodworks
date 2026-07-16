import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'הצהרת נגישות | ריף וודוורקס',
  description: 'הצהרת נגישות של אתר ריף וודוורקס בהתאם לתקן ישראלי 5568 ורמה AA של WCAG 2.1',
}

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-gold hover:text-gold/70 text-sm transition-colors mb-8 inline-block">
          ← חזרה לאתר
        </Link>

        <h1 className="font-heading text-4xl text-charcoal mb-2">הצהרת נגישות</h1>
        <p className="text-charcoal/45 text-sm mb-10">עדכון אחרון: יולי 2026</p>

        <div className="space-y-8 text-charcoal/75 font-body">

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מחויבות לנגישות</h2>
            <p className="leading-relaxed">
              ריף וודוורקס מחויבת להנגשת אתר האינטרנט שלה לאנשים עם מוגבלות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ&quot;ח-1998, ולתקנות הנגישות לשירות (התאמות נגישות לשירות שניתן באמצעות האינטרנט), תשע&quot;ג-2013.
            </p>
            <p className="leading-relaxed mt-3">
              אתר זה עומד ברמת נגישות <strong>AA</strong> של תקן <strong>WCAG 2.1</strong> ובדרישות <strong>התקן הישראלי 5568</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">פעולות נגישות שבוצעו</h2>
            <ul className="space-y-2 list-none">
              {[
                'האתר מותאם לקריאה מימין לשמאל (RTL) בשפה העברית',
                'כל התמונות כוללות טקסט חלופי (alt text) המתאר את תוכן התמונה',
                'ניתן לנווט באתר באמצעות מקלדת בלבד (מקש Tab)',
                'גודל הגופן ורמת הניגודיות עומדים בדרישות התקן',
                'האתר מותאם לתצוגה במכשירים ניידים ובגדלי מסך שונים',
                'רכיב נגישות מובנה המאפשר הגדלת טקסט, ניגודיות גבוהה ועצירת אנימציות',
                'כפתורים וקישורים כוללים תיאורים נגישים (aria-label)',
                'מבנה כותרות היררכי ותקין (H1, H2, H3)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מגבלות ידועות</h2>
            <p className="leading-relaxed">
              אנו פועלים לשיפור מתמיד של נגישות האתר. ייתכן שחלק מהתכנים המוטמעים מאתרים חיצוניים (כגון סרטוני TikTok) אינם עומדים במלוא דרישות הנגישות. אנו ממליצים לפנות אלינו ישירות אם נתקלתם בקושי.
            </p>
          </section>

          <section className="bg-white border border-charcoal/10 rounded-2xl p-6">
            <h2 className="font-heading text-xl text-charcoal mb-4">רכז הנגישות — פנייה ותלונות</h2>
            <p className="leading-relaxed mb-4">
              נתקלתם בבעיית נגישות באתר? פנו אלינו ונטפל בכך בהקדם האפשרי:
            </p>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-charcoal">שם רכז הנגישות:</strong> אלי מרקוס</li>
              <li><strong className="text-charcoal">טלפון:</strong>{' '}
                <a href="tel:+972532213939" className="text-gold hover:underline">053-221-3939</a>
              </li>
              <li><strong className="text-charcoal">אימייל:</strong>{' '}
                <a href="mailto:reefww3939@gmail.com" className="text-gold hover:underline">reefww3939@gmail.com</a>
              </li>
              <li><strong className="text-charcoal">זמן מענה:</strong> עד 5 ימי עסקים</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">בקשות לתוכן נגיש</h2>
            <p className="leading-relaxed">
              אם אתם זקוקים למידע מהאתר בפורמט נגיש אחר, אנא פנו אלינו בטלפון או במייל ונשתדל לספק את המידע בפורמט המתאים לכם.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
