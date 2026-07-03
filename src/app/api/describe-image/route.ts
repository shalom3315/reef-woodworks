import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: Request) {
  try {
    const { base64, mediaType } = await req.json()

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: base64 },
          },
          {
            type: 'text',
            text: `אתה עוזר לנגר ישראלי בשם אלי מרקוס שמנהל אתר נגרות "ריף וודוורקס".
תתאר את פריט הריהוט/עבודת הנגרות בתמונה ותחזיר JSON בלבד, ללא כל טקסט נוסף:
{
  "title": "שם קצר ומדויק של הרהיט (עד 5 מילים בעברית)",
  "description": "תיאור שיווקי בעברית של 2-3 משפטים שמדגיש את האיכות, החומר, הפונקציה והיופי",
  "material": "סוג העץ או החומר העיקרי (לדוגמה: עץ אורן מלא, אלון, וולנט)",
  "duration": "זמן ייצור משוער (לדוגמה: 1 שבוע, 3 שבועות)",
  "category": "אחת מ: ריהוט / שולחנות / חדר שינה / מטבח / ריהוט גן / חיצוני / אחר"
}`,
          },
        ],
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    const data = JSON.parse(match?.[0] || '{}')
    return Response.json(data)
  } catch (e) {
    return Response.json({ title: '', description: '', material: '', duration: '', category: 'ריהוט' }, { status: 500 })
  }
}
