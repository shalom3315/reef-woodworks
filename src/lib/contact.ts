// Single source for Eli's WhatsApp number. Components inside EditProvider can
// still pass the owner-edited `draft.whatsapp` as the second argument.
export const WA_NUMBER = '972532213939'

export const QUOTE_MESSAGE = 'שלום אלי, אני מעוניין בהצעת מחיר'

// wa.me needs the international form; the admin field is often filled in local
// form ("053..."), which WhatsApp rejects
export function normalizeWaNumber(number?: string) {
  const digits = (number || '').replace(/\D/g, '')
  if (!digits) return WA_NUMBER
  return digits.startsWith('0') ? `972${digits.slice(1)}` : digits
}

export function waLink(text?: string, number?: string) {
  const digits = normalizeWaNumber(number)
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`
}
