import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { documents } from '@/data/mock'
import { statusBadge, formatDate } from '@/lib/format'

export default function Revisions() {
  const rows = documents.flatMap(d => d.revisions.map(r => ({ doc: d, rev: r })))
  return (
    <div>
      <PageHeader title="Revisions" subtitle={`${rows.length} revision records across all documents`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Documents' }, { label: 'Revisions' }]} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-50/70 dark:bg-ink-800/40 text-[11px] font-semibold uppercase text-ink-400">
                <th className="px-4 py-2.5 text-left">Document</th>
                <th className="px-4 py-2.5 text-left">Revision</th>
                <th className="px-4 py-2.5 text-left">Status</th>
                <th className="px-4 py-2.5 text-left">Reason</th>
                <th className="px-4 py-2.5 text-left">By</th>
                <th className="px-4 py-2.5 text-left">Date</th>
                <th className="px-4 py-2.5 text-left">Size</th>
              </tr>
            </thead>
            <tbody className="divide-rows">
              {rows.slice(0, 60).map((r, i) => (
                <tr key={i} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
                  <td className="px-4 py-2.5 text-sm font-mono font-medium text-primary-700 dark:text-primary-300">{r.doc.number}</td>
                  <td className="px-4 py-2.5"><span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700 font-mono">{r.rev.rev}</span></td>
                  <td className="px-4 py-2.5"><span className={`chip ${statusBadge(r.rev.status)}`}>{r.rev.status}</span></td>
                  <td className="px-4 py-2.5 text-sm text-ink-600 dark:text-ink-300">{r.rev.reason}</td>
                  <td className="px-4 py-2.5 text-sm">{r.rev.by}</td>
                  <td className="px-4 py-2.5 text-sm text-ink-500 dark:text-ink-400 tabular-nums">{formatDate(r.rev.date)}</td>
                  <td className="px-4 py-2.5 text-sm text-ink-500 dark:text-ink-400 font-mono">{r.rev.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
