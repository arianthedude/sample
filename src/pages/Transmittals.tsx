import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { documents } from '@/data/mock'
import { formatDate } from '@/lib/format'

export default function Transmittals() {
  const rows = documents.flatMap(d => d.transmittals.map(t => ({ doc: d, t })))
  return (
    <div>
      <PageHeader title="Transmittals" subtitle={`${rows.length} incoming and outgoing document transmittals`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Documents' }, { label: 'Transmittals' }]}
        actions={<button className="btn-primary"><Icon.Send size={16} />New transmittal</button>} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-50/70 dark:bg-ink-800/40 text-[11px] font-semibold uppercase text-ink-400">
                <th className="px-4 py-2.5 text-left">Transmittal</th>
                <th className="px-4 py-2.5 text-left">Direction</th>
                <th className="px-4 py-2.5 text-left">To / From</th>
                <th className="px-4 py-2.5 text-left">Document</th>
                <th className="px-4 py-2.5 text-left">Revisions</th>
                <th className="px-4 py-2.5 text-left">Date</th>
                <th className="px-4 py-2.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-rows">
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
                  <td className="px-4 py-2.5 text-sm font-mono font-medium">{r.t.id}</td>
                  <td className="px-4 py-2.5"><span className={`chip ${r.t.direction === 'Outgoing' ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30' : 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/10 dark:text-warning-300 dark:border-warning-500/30'}`}>{r.t.direction}</span></td>
                  <td className="px-4 py-2.5 text-sm">{r.t.to}</td>
                  <td className="px-4 py-2.5 text-sm font-mono text-primary-700 dark:text-primary-300">{r.doc.number}</td>
                  <td className="px-4 py-2.5 text-sm font-mono">{r.t.revisions.join(', ')}</td>
                  <td className="px-4 py-2.5 text-sm text-ink-500 dark:text-ink-400 tabular-nums">{formatDate(r.t.date)}</td>
                  <td className="px-4 py-2.5"><span className={`chip ${r.t.status === 'Acknowledged' ? 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30' : 'bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700'}`}>{r.t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
