import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://reefwoodwork.com'

export const metadata: Metadata = {
  title: 'תנאי שימוש | ריף וודוורקס',
  description: 'תנאי השימוש באתר ריף וודוורקס',
  alternates: { canonical: `${SITE_URL}/terms` },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-gold hover:text-gold/70 text-sm transition-colors mb-8 inline-block">
          ← חזרה לאתר
        </Link>

        <h1 className="font-heading text-4xl text-charcoal mb-2">תנאי שימוש</h1>
        <p className="text-charcoal/45 text-sm mb-10">עדכון אחרון: ספטמבר 2026</p>

        <div className="space-y-8 text-charcoal/75 font-body">

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">כללי</h2>
            <p className="leading-relaxed">
              אתר זה (<strong>woodworking-landing-three.vercel.app</strong>) מופעל על ידי ריף וודוורקס, בבעלות אלי מרקוס (להלן: &quot;אנחנו&quot; או &quot;החברה&quot;).
              הגלישה והשימוש באתר מהווים הסכמה לתנאים המפורטים במסמך זה. אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באתר.
            </p>
            <p className="leading-relaxed mt-3 text-sm text-charcoal/50">
              מספר עוסק: <span className="bg-gold/10 text-gold px-1.5 py-0.5 rounded">TODO — יש להשלים</span>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">אופי האתר</h2>
            <p className="leading-relaxed">
              האתר משמש כאתר תדמית ומידע על שירותי הנגרות של החברה. אין באתר מכירה מקוונת או תשלום ישיר —
              הזמנת עבודה נעשית לאחר פנייה, בדיקת היתכנות והצעת מחיר מותאמת אישית.
              המחירים, התמונות וההדמיות המוצגים באתר הם להמחשה בלבד ואינם מהווים הצעה מחייבת,
              אלא אם צוין אחרת בכתב על ידי החברה.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">קניין רוחני</h2>
            <p className="leading-relaxed">
              כל התכנים באתר — טקסטים, תמונות, עיצובים, לוגו ותוכן גרפי — הם רכושה הבלעדי של ריף וודוורקס,
              ואין להעתיק, להפיץ, לשכפל או לעשות בהם שימוש מסחרי ללא אישור מראש ובכתב מהחברה.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">התנהגות המשתמש</h2>
            <p className="leading-relaxed">
              אין לעשות באתר שימוש למטרה בלתי חוקית, לפגוע בפעילותו התקינה, לנסות לחדור למערכותיו,
              או להעביר דרכו תוכן פוגעני, מטעה או מפר זכויות צד שלישי.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">הגבלת אחריות</h2>
            <p className="leading-relaxed">
              החברה עושה מאמץ סביר לשמור על זמינות ותקינות האתר, אך אינה מתחייבת שהאתר יהיה זמין ללא הפרעה או נקי משגיאות.
              החברה אינה אחראית לתוכן באתרים חיצוניים המקושרים מהאתר (לרבות רשתות חברתיות), ואינה אחראית לנזק שייגרם
              משימוש באתר או הסתמכות על המידע בו, למעט במקרים בהם קיימת אחריות שאינה ניתנת להגבלה על פי דין.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">בוט הצ&apos;אט</h2>
            <p className="leading-relaxed">
              הבוט באתר מספק מענה אוטומטי ראשוני בלבד, לצרכים כלליים ואינפורמטיביים. תשובותיו אינן מהוות הצעת מחיר
              מחייבת ואינן תחליף לייעוץ מקצועי. הצעת מחיר מחייבת תינתן אך ורק לאחר אישור בכתב מנציג החברה.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מסמכים קשורים</h2>
            <p className="leading-relaxed">
              לפרטים נוספים ראו את{' '}
              <Link href="/privacy" className="text-gold hover:underline">מדיניות הפרטיות</Link>
              {' '}ואת{' '}
              <Link href="/accessibility" className="text-gold hover:underline">הצהרת הנגישות</Link>
              {' '}של האתר.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">שינויים בתנאים</h2>
            <p className="leading-relaxed">
              החברה רשאית לעדכן תנאים אלה מעת לעת. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">דין וסמכות שיפוט</h2>
            <p className="leading-relaxed">
              על תנאים אלה יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל מחלוקת הנוגעת לאתר או לתנאים אלה
              נתונה לבתי המשפט המוסמכים במחוז{' '}
              <span className="bg-gold/10 text-gold px-1.5 py-0.5 rounded">TODO — יש להשלים</span>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">יצירת קשר</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li><strong className="text-charcoal">אימייל:</strong> <a href="mailto:reefww3939@gmail.com" className="text-gold hover:underline">reefww3939@gmail.com</a></li>
              <li><strong className="text-charcoal">טלפון:</strong> <a href="tel:+972532213939" className="text-gold hover:underline">053-221-3939</a></li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-charcoal/10">
            <Link href="/accessibility" className="text-sm text-gold hover:underline">הצהרת נגישות</Link>
            <Link href="/privacy" className="text-sm text-gold hover:underline">מדיניות פרטיות</Link>
            <Link href="/" className="text-sm text-charcoal/40 hover:text-gold transition-colors">חזרה לאתר</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
