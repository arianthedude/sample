import { PageHeader, StatusDot } from '@/components/ui'
import { documentCodingFormats } from '@/data/mock'

export default function DocumentCoding() {
  const fmt = documentCodingFormats[0]

  return (
    <div>
      <PageHeader title="Document Coding" subtitle="Numbering format definitions"
        breadcrumbs={[{ label: 'Admin' }, { label: 'Document Coding' }]} />
      <div className="card p-5 mb-4">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-semibold">{fmt.name}</h2>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-0.5">{fmt.description}</p>
          </div>
          <StatusDot active={fmt.isActive} />
        </div>
        <div className="space-y-3">
          {fmt.fields.map(f => (
            <div key={f.id} className="flex items-start gap-4 py-2 border-t border-ink-100 dark:border-ink-800 first:border-0 first:pt-0">
              <span className="font-mono text-xs text-primary-600 dark:text-primary-400 w-12 shrink-0">{f.code}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{f.displayName}</div>
                {f.values.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {f.values.map(v => (
                      <span key={v} className="text-[11px] px-2 py-0.5 rounded-md bg-ink-100 dark:bg-ink-800 text-ink-500 font-mono">{v}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-xs text-ink-400">{f.isRequired ? 'Required' : 'Optional'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
