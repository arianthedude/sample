import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { mtoItems } from '@/data/mock'

export default function MtoCompare() {
  const rows = mtoItems.filter(i => i.prevQuantity !== undefined).slice(0, 18)
  return (
    <div>
      <PageHeader title="Compare Revisions" subtitle="Difference highlighting between REV B and REV C"
        breadcrumbs={[{ label: 'Home' }, { label: 'MTO' }, { label: 'Compare' }]}
        actions={<button className="btn-outline"><Icon.Download size={16} />Export diff</button>} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-50/70 dark:bg-ink-800/40 text-[11px] font-semibold uppercase text-ink-400">
                <th className="px-4 py-2.5 text-left">Item Code</th>
                <th className="px-4 py-2.5 text-left">Description</th>
                <th className="px-4 py-2.5 text-left">Line</th>
                <th className="px-4 py-2.5 text-right">REV B Qty</th>
                <th className="px-4 py-2.5 text-right">REV C Qty</th>
                <th className="px-4 py-2.5 text-right">Delta</th>
                <th className="px-4 py-2.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-rows">
              {rows.map(i => {
                const delta = i.quantity - (i.prevQuantity || 0)
                const up = delta > 0
                return (
                  <tr key={i.id} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
                    <td className="px-4 py-2.5 text-sm font-mono font-medium">{i.itemCode}</td>
                    <td className="px-4 py-2.5 text-sm">{i.description}</td>
                    <td className="px-4 py-2.5 text-sm font-mono">{i.lineNo}</td>
                    <td className="px-4 py-2.5 text-sm tabular-nums text-right text-ink-500">{i.prevQuantity}</td>
                    <td className={`px-4 py-2.5 text-sm tabular-nums text-right font-medium ${up ? 'text-success-700 dark:text-success-400 bg-success-50/50 dark:bg-success-500/5' : 'text-danger-700 dark:text-danger-400 bg-danger-50/50 dark:bg-danger-500/5'}`}>{i.quantity}</td>
                    <td className={`px-4 py-2.5 text-sm tabular-nums text-right font-medium ${up ? 'text-success-700 dark:text-success-400' : 'text-danger-700 dark:text-danger-400'}`}>{up ? '+' : ''}{delta}</td>
                    <td className="px-4 py-2.5 text-sm">{up ? 'Added / increased' : 'Reduced'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
