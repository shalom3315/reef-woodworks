export interface BotSettings {
  name: string
  owner: string
  phone: string
  specialty: string
  priceFrom: string
  woodTypes: string
  finishes: string
  extraInfo: string
}

const DEFAULTS: BotSettings = {
  name:      'ריף וודוורקס',
  owner:     'אלי מרקוס',
  phone:     '053-221-3939',
  specialty: 'נגרות חוץ ועבודות עץ — פרגולות, דקים, גדרות ושערים מעץ, גגות רעפים, מבנים מעץ, מבנים יביליים וצימרים. כולל חידוש, ניקוי, ליטוש ושימון דקים קיימים',
  priceFrom: 'פרגולת עץ פשוטה: 490 ₪/מ"ר (עולה לפי קוטר הקורות, האיכות והעיצוב) | פרגולה עם הצללה (סרגלים מחורצים, במבוק, לייסטים): 690 ₪/מ"ר | תוספת כיסוי סנטף (גשם ושמש): ~100 ₪/מ"ר | דק אורן: 450 ₪/מ"ר | דק במבוק: 650 ₪/מ"ר | דק איפאה: 700 ₪/מ"ר (תוספת על התקנה נסתרת, מסגרת תמונה או אלמנטים מיוחדים) | גדר אורן: ~400 ₪/מ"ר | גגות רעפים: 490 ₪/מ"ר (משתנה לפי חיפוי, בידוד וסוג רעפים) | מבנים מעץ, יביליים וצימרים: מחיר לפי מידות ותוכנית',
  woodTypes: 'אורן מחוטא, אורן מוקצע, אורן תרמי, דוגלס, במבוק, איפאה, טיק, סינטטי',
  finishes:  'מסגרת עליונה מעוצבת לפרגולה, קורה מעוצבת בקצה לפי שבלונה, מסגרת תמונה לדק, צורות ואלמנטים מיוחדים בהתקנה',
  extraInfo: 'צוות מקצועי הלוקח אחריות מלאה על העבודה, זמינות גבוהה לחזרה ללקוח וטיפול בתקלות במסגרת האחריות. עבודה עם עץ אורן ברמה הגבוהה ביותר בקטגוריה למזעור עיוותים ותנועות טבעיות (אורן = 80% מהעבודות, 99% מהפרגולות). תשתיות הדקים מבוצעות לרוב מאורן מחוטא. שימוש בצבעים ושמנים איכותיים עמידים על בסיס מים עם הגנת UV — ספק ראשי: חברת גוונים. שירות חידוש דקים: ניקוי יסודי, ליטוש ושימון מחדש.',
}

export function parseBotSettings(raw: Record<string, string>): BotSettings {
  return {
    name:      raw['bot_name']       || DEFAULTS.name,
    owner:     raw['bot_owner']      || DEFAULTS.owner,
    phone:     raw['bot_phone']      || DEFAULTS.phone,
    specialty: raw['bot_specialty']  || DEFAULTS.specialty,
    priceFrom: raw['bot_price_from'] || DEFAULTS.priceFrom,
    woodTypes: raw['bot_wood_types'] || DEFAULTS.woodTypes,
    finishes:  raw['bot_finishes']   || DEFAULTS.finishes,
    extraInfo: raw['bot_extra_info'] || DEFAULTS.extraInfo,
  }
}

export function buildBotPrompt(s: BotSettings): string {
  const woodList    = s.woodTypes.split(',').map(w => `• ${w.trim()}`).join('\n')
  const finishList  = s.finishes.split(',').map(f => `• ${f.trim()}`).join('\n')

  return `אתה מומחה נגרות של ${s.name} — עסק נגרות בהתאמה אישית של ${s.owner}.
אתה עוזר ללקוחות לבחור סוג עץ, גימור, עיצוב ומידות. ידידותי, מקצועי, עונה בעברית בלבד.

כללי עיצוב תשובות:
- תשובות קצרות — מקסימום 4-5 שורות
- כשיש רשימה, כל פריט מתחיל ב-• ואחריו ישר הטקסט: "• טקסט כאן"
- אסור לשים • לבד בשורה ריקה
- אל תשתמש בכוכביות או markdown — טקסט רגיל בלבד

פרטי העסק:
- שם: ${s.name}
- בעלים: ${s.owner}
- טלפון/וואטסאפ: ${s.phone}
- התמחות: ${s.specialty}

סוגי עץ שאתה מכיר:
${woodList}

גימורים:
${finishList}

מחירון משוער:
${s.priceFrom.split('|').map(p => `• ${p.trim()}`).join('\n')}
• מחירים משתנים לפי סוג עץ, מידות וגימור
• הצעת מחיר מדויקת — רק אחרי שיחה עם ${s.owner}
${s.extraInfo ? `\nמידע נוסף:\n${s.extraInfo}` : ''}
כשלקוח רוצה הצעת מחיר — הפנה לוואטסאפ ${s.phone}.
ענה בצורה קצרה וברורה. שאל שאלות להבנת הצורך לפני שתמליץ.`
}
