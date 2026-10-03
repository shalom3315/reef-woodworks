// Renders the lightweight markup used in articles and service pages:
// one paragraph per line, **bold**, and pipe tables, in the order they appear.
type Block = { kind: 'p'; text: string } | { kind: 'table'; rows: string[][] }

function parse(body: string): Block[] {
  const blocks: Block[] = []
  for (const line of body.split('\n')) {
    if (line.startsWith('|')) {
      const cells = line.split('|').filter(Boolean).map(c => c.trim())
      if (cells.every(c => /^-+$/.test(c))) continue
      const last = blocks[blocks.length - 1]
      if (last?.kind === 'table') last.rows.push(cells)
      else blocks.push({ kind: 'table', rows: [cells] })
    } else {
      blocks.push({ kind: 'p', text: line })
    }
  }
  return blocks
}

export default function RichBody({ body }: { body: string }) {
  return (
    <div className="text-charcoal/75 leading-relaxed whitespace-pre-line prose-like">
      {parse(body).map((block, i) =>
        block.kind === 'p' ? (
          <p
            key={i}
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        ) : (
          <div key={i} className="overflow-x-auto my-3">
            <table className="w-full text-sm border border-charcoal/10 rounded-xl overflow-hidden">
              <tbody>
                {block.rows.map((cells, ri) => (
                  <tr key={ri} className={ri === 0 ? 'bg-gold/10 font-medium' : 'border-t border-charcoal/8'}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}
