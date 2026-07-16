import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | ריף וודוורקס',
  description: 'מדיניות הפרטיות של ריף וודוורקס — איזה מידע נאסף, למה ואיך הוא מוגן',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-gold hover:text-gold/70 text-sm transition-colors mb-8 inline-block">
          ← חזרה לאתר
        </Link>

        <h1 className="font-heading text-4xl text-charcoal mb-2">מדיניות פרטיות</h1>
        <p className="text-charcoal/45 text-sm mb-10">עדכון אחרון: יולי 2026 | בהתאם לחוק הגנת הפרטיות, תיקון 13</p>

        <div className="space-y-8 text-charcoal/75 font-body">

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">כללי</h2>
            <p className="leading-relaxed">
              ריף וודוורקס (להלן: &quot;אנחנו&quot; או &quot;החברה&quot;) מכבדת את פרטיות המשתמשים באתר <strong>reef-woodworks.vercel.app</strong>.
              מסמך זה מפרט אילו נתונים נאספים, למה הם נאספים, כיצד הם מוגנים, ומהן זכויותיכם.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מידע הנאסף</h2>

            <h3 className="font-semibold text-charcoal mb-2 mt-4">א. מידע שאתם מספקים ישירות</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>הודעות שנשלחות דרך בוט הצ'אט באתר (תוכן השיחה בלבד, ללא זיהוי)</li>
              <li>כל מידע שתבחרו לשתף בעת יצירת קשר דרך וואטסאפ או אימייל</li>
            </ul>

            <h3 className="font-semibold text-charcoal mb-2 mt-4">ב. מידע הנאסף אוטומטית</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>עמודים שביקרתם בהם ומשך הביקור</li>
              <li>סוג המכשיר, הדפדפן ומערכת ההפעלה</li>
              <li>מדינת המשתמש (ברמה כללית בלבד — לא כתובת מדויקת)</li>
              <li>מקור ההגעה לאתר (גוגל, ישיר, מדיה חברתית)</li>
            </ul>
            <p className="text-sm text-charcoal/50 mt-2">מידע זה אנונימי ואינו מזהה אתכם באופן אישי.</p>

            <h3 className="font-semibold text-charcoal mb-2 mt-4">ג. עוגיות (Cookies)</h3>
            <p className="leading-relaxed">האתר משתמש בעוגיות לצורך:</p>
            <ul className="space-y-1 list-disc list-inside mt-2">
              <li>ניתוח תנועה — Google Analytics (ניתן לביטול בהגדרות הדפדפן)</li>
              <li>זיכרון הסכמה להצגת הודעת העוגיות</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מטרות השימוש במידע</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>שיפור חוויית המשתמש ותכני האתר</li>
              <li>מענה לפניות המגיעות דרך בוט הצ'אט</li>
              <li>ניתוח סטטיסטי של תנועת גולשים (ללא זיהוי אישי)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">שיתוף מידע עם צדדים שלישיים</h2>
            <p className="leading-relaxed mb-3">
              איננו מוכרים, משכירים או מעבירים מידע אישי לצדדים שלישיים למטרות שיווק.
              המידע עשוי לעבור לשירותים הבאים לצורך הפעלת האתר בלבד:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-charcoal/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-charcoal/5">
                    <th className="text-right px-4 py-2.5 font-semibold text-charcoal">שירות</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-charcoal">מטרה</th>
                    <th className="text-right px-4 py-2.5 font-semibold text-charcoal">מדיניות</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-charcoal/8">
                    <td className="px-4 py-2.5">Google Analytics</td>
                    <td className="px-4 py-2.5">ניתוח תנועה</td>
                    <td className="px-4 py-2.5"><a href="https://policies.google.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">מדיניות Google</a></td>
                  </tr>
                  <tr className="border-t border-charcoal/8 bg-charcoal/2">
                    <td className="px-4 py-2.5">Anthropic (Claude AI)</td>
                    <td className="px-4 py-2.5">בוט צ'אט</td>
                    <td className="px-4 py-2.5"><a href="https://www.anthropic.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">מדיניות Anthropic</a></td>
                  </tr>
                  <tr className="border-t border-charcoal/8">
                    <td className="px-4 py-2.5">Supabase</td>
                    <td className="px-4 py-2.5">מסד נתונים</td>
                    <td className="px-4 py-2.5"><a href="https://supabase.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">מדיניות Supabase</a></td>
                  </tr>
                  <tr className="border-t border-charcoal/8 bg-charcoal/2">
                    <td className="px-4 py-2.5">Vercel</td>
                    <td className="px-4 py-2.5">אחסון האתר</td>
                    <td className="px-4 py-2.5"><a href="https://vercel.com/legal/privacy-policy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">מדיניות Vercel</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">אבטחת המידע</h2>
            <p className="leading-relaxed">
              המידע מאוחסן בשרתי Supabase המאובטחים עם הצפנה מלאה. התקשורת לאתר מוצפנת באמצעות HTTPS/TLS.
              גישה למסד הנתונים מוגבלת לצוות המורשה בלבד.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">זכויותיכם</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>הזכות לדעת אילו נתונים מוחזקים עליכם</li>
              <li>הזכות לתיקון מידע שגוי</li>
              <li>הזכות למחיקת המידע</li>
              <li>הזכות לביטול הסכמה לכל שימוש עתידי במידע</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              לממוש זכויותיכם פנו אלינו בכתב לכתובת:{' '}
              <a href="mailto:reefww3939@gmail.com" className="text-gold hover:underline">reefww3939@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">יצירת קשר</h2>
            <p>לכל שאלה בנושא פרטיות:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><strong className="text-charcoal">אימייל:</strong> <a href="mailto:reefww3939@gmail.com" className="text-gold hover:underline">reefww3939@gmail.com</a></li>
              <li><strong className="text-charcoal">טלפון:</strong> <a href="tel:+972532213939" className="text-gold hover:underline">053-221-3939</a></li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-charcoal/10">
            <Link href="/accessibility" className="text-sm text-gold hover:underline">הצהרת נגישות</Link>
            <Link href="/" className="text-sm text-charcoal/40 hover:text-gold transition-colors">חזרה לאתר</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
