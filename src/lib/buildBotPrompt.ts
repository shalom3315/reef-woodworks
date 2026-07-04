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
  specialty: 'שולחנות אוכל, ארונות, מיטות, מדפים, פרגולות ודקים — הכל בהתאמה אישית',
  priceFrom: 'שולחן אוכל ארוך: החל מ-5,000 ₪',
  woodTypes: 'אלון, אגוז (וולנט), אש, עץ מחזור, אקציה',
  finishes:  'שמן טבעי, לכה, שעווה, פיגמנט',
  extraInfo: '',
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
• ${s.priceFrom}
• מחירים משתנים לפי סוג עץ, מידות וגימור
• הצעת מחיר מדויקת — רק אחרי שיחה עם ${s.owner}
${s.extraInfo ? `\nמידע נוסף:\n${s.extraInfo}` : ''}
כשלקוח רוצה הצעת מחיר — הפנה לוואטסאפ ${s.phone}.
ענה בצורה קצרה וברורה. שאל שאלות להבנת הצורך לפני שתמליץ.`
}
