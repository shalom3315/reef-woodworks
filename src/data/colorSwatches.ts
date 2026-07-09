export interface ColorSwatch {
  code: string
  name: string
  hex: string
  suitable: string
  description: string
  transparent?: boolean
}

export interface ColorGroup {
  id: string
  label: string
  subtitle: string
  colors: ColorSwatch[]
}

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: 'aquatech',
    label: 'AquaTECH לזור',
    subtitle: 'ציפוי לעץ חיצוני על בסיס מים — הגנת UV ועמידות לאורך שנים | חברת גוונים',
    colors: [
      {
        code: 'PT05LZ',
        name: 'אגוז',
        hex: '#6B4220',
        suitable: 'פרגולות, דקים',
        description: 'חום אגוז עמוק ועשיר — הגוון הכי נפוץ לפרגולות אורן. מעניק מראה יוקרתי ומחזק את סיבי העץ.',
      },
      {
        code: 'PT04LZ',
        name: 'אגוז אפריקאי',
        hex: '#7A4E2D',
        suitable: 'דקים, פרגולות',
        description: 'חום-ענבר חמים בהשראת עץ אגוז אפריקאי. עשיר יותר מאגוז רגיל עם גוון אדמדם קל.',
      },
      {
        code: 'PT03LZ',
        name: 'ירוק מעושן',
        hex: '#6B7A62',
        suitable: 'גדרות, ריהוט גן',
        description: 'גוון ירקרק-אפרפר מתוחכם המשתלב יפה עם הטבע. אידאלי לגדרות ומבנים בסביבה ירוקה.',
      },
      {
        code: 'PT09LZ',
        name: 'מהגוני',
        hex: '#8B2E1A',
        suitable: 'שערים, ריהוט גן',
        description: 'אדום-חום עז ומרשים בהשראת מהגוני קלאסי. מתאים לאלמנטים ייצוגיים ושערי כניסה.',
      },
      {
        code: 'PT08LZ',
        name: 'טיק כהה',
        hex: '#3A2A1A',
        suitable: 'דקים פרמיום, פרגולות',
        description: 'גוון כהה ומשוכלל בהשראת עץ טיק. מסתיר פגמים קלים ומעניק מראה יוקרתי לכל פרויקט.',
      },
      {
        code: 'PT06LZ',
        name: 'אגוז כהה',
        hex: '#4E3018',
        suitable: 'דקים, גדרות',
        description: 'גרסה כהה יותר של האגוז — עומק ועושר רב יותר. מתאים לדקים שרוצים מראה כהה ובוגר.',
      },
      {
        code: 'PT22LZ',
        name: 'לבן',
        hex: '#F0EDE6',
        suitable: 'פרגולות מודרניות, מבנים יביליים',
        description: 'לבן נקי עם גוון חמים קל. שומר על מראה עץ טבעי ולא פלסטיקי — מושלם לסגנון מודרני.',
      },
      {
        code: 'PT11LZ',
        name: 'פוליסנדר',
        hex: '#4A2018',
        suitable: 'שערים, גדרות ייצוגיות',
        description: 'חום-אדמדם כהה ואקזוטי בהשראת עץ פוליסנדר. מעניק אישיות חזקה ומרשימה לכל פרויקט.',
      },
      {
        code: 'PT10LZ',
        name: 'אגס',
        hex: '#C8A262',
        suitable: 'פרגולות, גגות רעפים',
        description: 'גוון בהיר וחמים בהשראת עץ אגס. עדין ואלגנטי — מתאים לפרגולות שרוצים שיתמזגו עם בית בהיר.',
      },
      {
        code: 'PT2700',
        name: 'לכה שקופה מבריקה',
        hex: '#D4C4A0',
        suitable: 'הגנה שקופה לכל עץ',
        description: 'לכה שקופה להגנה על עץ חיצוני לאחר אימפרגנציה — גימור מבריק. שומר על צבע העץ המקורי.',
        transparent: true,
      },
      {
        code: 'PT2704',
        name: 'לכה שקופה מט',
        hex: '#C8BA96',
        suitable: 'הגנה שקופה לכל עץ',
        description: 'לכה שקופה להגנה על עץ חיצוני לאחר אימפרגנציה — גימור מט משי. מראה טבעי ועדין.',
        transparent: true,
      },
      {
        code: 'PT2710',
        name: 'אימפרגנציה שקופה',
        hex: '#C0B08A',
        suitable: 'הגנה ראשונית לכל עץ',
        description: 'אימפרגנציה שקופה להגנה על עץ חיצוני — חודרת לעומק העץ ומגנה מלחות, עובש ו-UV.',
        transparent: true,
      },
    ],
  },
]
