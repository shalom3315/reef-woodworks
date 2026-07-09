import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | ריף וודוורקס',
  description: 'מדיניות הפרטיות של ריף וודוורקס',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-gold hover:text-gold-light text-sm transition-colors mb-8 inline-block">
          ← חזרה לאתר
        </Link>

        <h1 className="font-heading text-4xl text-charcoal mb-8">מדיניות פרטיות</h1>

        <div className="prose prose-lg text-charcoal/75 space-y-6 font-body">

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">כללי</h2>
            <p>ריף וודוורקס מכבדת את פרטיות המשתמשים באתר. מסמך זה מסביר אילו נתונים נאספים ואיך הם משמשים.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">מידע הנאסף</h2>
            <p>האתר משתמש ב-Google Analytics לצורך ניתוח תנועה. המידע הנאסף כולל:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>עמודים שהמשתמש ביקר בהם</li>
              <li>זמן שהייה באתר</li>
              <li>סוג המכשיר והדפדפן</li>
              <li>מדינת המשתמש (ברמה כללית)</li>
            </ul>
            <p className="mt-3">מידע זה אנונימי ואינו מזהה את המשתמש באופן אישי.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">עוגיות (Cookies)</h2>
            <p>האתר משתמש בעוגיות לצורך ניתוח תנועה. ניתן לבטל עוגיות בהגדרות הדפדפן.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">שיתוף מידע</h2>
            <p>לא נמכור, לא נשכיר ולא נשתף את פרטיך האישיים עם צדדים שלישיים, למעט Google Analytics כמפורט לעיל.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-charcoal mb-3">יצירת קשר</h2>
            <p>לשאלות בנושא פרטיות ניתן לפנות אלינו:</p>
            <p className="mt-2">
              <a href="mailto:reefww3939@gmail.com" className="text-gold hover:underline">reefww3939@gmail.com</a>
            </p>
          </section>

          <p className="text-charcoal/40 text-sm pt-4 border-t border-charcoal/10">עדכון אחרון: יולי 2026</p>
        </div>
      </div>
    </main>
  )
}
