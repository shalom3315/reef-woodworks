// JSON.stringify does not escape "<", so a value containing "</script>" can break out of
// a <script type="application/ld+json"> tag and inject arbitrary markup. Escape it as <,
// which is valid inside a JSON string and never closes the tag.
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
