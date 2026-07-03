// Usage: node delete-bad-images.mjs <SERVICE_ROLE_KEY>
// הסקריפט מוחק 13 תמונות שנמצאו לא ראויות לגלריה

const KEY = process.argv[2]
if (!KEY) { console.error('Usage: node delete-bad-images.mjs <SERVICE_ROLE_KEY>'); process.exit(1) }

const URL = 'https://zrolwojmucgmlilcwlzx.supabase.co'

const BAD_IDS = [
  { id: 'f858fc2d-6ec0-4df6-9eb6-a7980c8fe79b', reason: 'צילום לילה חשוך — נדנדה כמעט לא נראית' },
  { id: 'ddbb218d-8749-49ba-a9f3-13225bd47e90', reason: 'עץ גולמי לא גמור, רקע מחסן תעשייתי' },
  { id: '405e21cf-a977-446e-b70e-320865601ecf', reason: 'זווית תחתית בלבד, לא מציגה פרויקט' },
  { id: '4b1e5262-fd24-426b-ad55-2fb77faaa6f0', reason: 'פריים וידאו גרוע, מזרן מסתיר ראש מיטה' },
  { id: '1f9edb39-3f5c-45d5-a992-4778801cdbc7', reason: 'עובד על סולם + פסולת בנייה בפריים' },
  { id: '3f3df8d1-634d-4d16-869e-e40805a857be', reason: 'עובד בפריים + שלטי חנויות ברקע' },
  { id: 'fab56ce0-90da-40c8-b986-d4db38bd56fd', reason: 'לילה חשוך מאוד, רק עגורן נראה' },
  { id: '9a282a31-6a7a-4076-a298-8465a5eb0488', reason: 'זווית קיצונית, הדק לא מובן' },
  { id: 'b48a674b-1259-46f1-80d8-ac37e1dc8a69', reason: 'ציוד לא מסודר על הדק' },
  { id: 'd30ffdd8-2106-457d-bd64-06d458989276', reason: 'כפילות של זווית גרועה — פריים אחר מאותו וידאו' },
  { id: 'ed9278b9-d0c1-4307-acf8-c8d6de3101cd', reason: 'לילה חשוך, נראה כמהלך עבודה לא גמור' },
  { id: 'cc152ece-33b1-4dd9-9f6d-571209f8d75a', reason: 'רקע מחסן גולמי עם לוחות עץ ישנים' },
  { id: '860a3ea9-c7d6-41b8-9492-97257738b813', reason: 'שרפרפים נבלעים ברקע ביתי עמוס' },
]

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
}

console.log(`מוחק ${BAD_IDS.length} תמונות...\n`)

for (const { id, reason } of BAD_IDS) {
  process.stdout.write(`${reason.slice(0, 40)}... `)
  const r = await fetch(`${URL}/rest/v1/projects?id=eq.${id}`, { method: 'DELETE', headers })
  console.log(r.ok ? `✓` : `FAILED (${r.status}): ${await r.text()}`)
}

console.log('\nסיום.')
