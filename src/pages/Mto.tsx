import { useMemo, useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, EmptyState } from '@/components/ui'
import { Donut, Bars } from '@/components/Charts'
import { mtoItems } from '@/data/mock'
import { statusBadge, groupBy } from '@/lib/format'

const GROUPS = [
  { key: 'lineNo', label: 'Line Number' },
  { key: 'spool', label: 'Spool' },
  { key: 'area', label: 'Area' },
  { key: 'materialType', label: 'Material Type' },
] as const

export default function Mto() {
  const [group, setGroup] = useState<typeof GROUPS[number]['key']>('lineNo')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return mtoItems.filter(i => i.itemCode.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.material.toLowerCase().includes(q))
  }, [search])

  const grouped = useMemo(() => groupBy(filtered, i => i[group]), [filtered, group])

  const materialTypeData = useMemo(() => {
    const counts: Record<string, number> = {}
    mtoItems.forEach(i => { counts[i.materialType] = (counts[i.materialType] || 0) + i.quantity })
    return Object.entries(counts).map(([label, value]) => ({ label, value, color: '#2563eb' }))
  }, [])

  const statusData = useMemo(() => {
    const colors: Record<string, string> = { Approved: '#16a34a', 'Issued For Construction': '#16a34a', 'For Review': '#f59e0b', 'For Approval': '#2563eb', Draft: '#94a3b8', Rejected: '#ef4444', Superseded: '#94a3b8', Reviewed: '#2563eb' }
    const counts: Record<string, number> = {}
    mtoItems.forEach(i => { counts[i.status] = (counts[i.status] || 0) + 1 })
    return Object.entries(counts).map(([label, value]) => ({ label, value, color: colors[label] || '#94a3b8' }))
  }, [])

  return (
    <div>
      <PageHeader
        title="Material Take-Off"
        subtitle={`${mtoItems.length} line items · grouped by ${GROUPS.find(g => g.key === group)?.label.toLowerCase()}`}
        breadcrumbs={[{ label: 'Home' }, { label: 'MTO' }]}
        actions={<>
          <a href="/mto/compare" className="btn-outline"><Icon.Compare size={16} />Compare</a>
          <a href="/mto/generate" className="btn-primary"><Icon.Sparkle size={16} />Generate MTO</a>
        </>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="card p-5"><h3 className="text-base font-semibold mb-3">By Material Type</h3><Bars data={materialTypeData} height={180} /></div>
        <div className="card p-5"><h3 className="text-base font-semibold mb-3">Item Status</h3><Donut data={statusData} size={170} /></div>
        <div className="card p-5">
          <h3 className="text-base font-semibold mb-3">Summary</h3>
          <div className="space-y-3">
            <SummaryRow label="Total items" value={mtoItems.length} />
            <SummaryRow label="Total quantity" value={mtoItems.reduce((a, i) => a + i.quantity, 0)} />
            <SummaryRow label="Total weight (kg)" value={Math.round(mtoItems.reduce((a, i) => a + i.weight * i.quantity, 0))} />
            <SummaryRow label="Unique line numbers" value={new Set(mtoItems.map(i => i.lineNo)).size} />
            <SummaryRow label="Pending review" value={mtoItems.filter(i => i.status === 'For Review').length} />
          </div>
        </div>
      </div>

      <div className="card p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search item code, description, material…" className="input pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink-400 mr-1">Group by</span>
          {GROUPS.map(g => (
            <button key={g.key} onClick={() => setGroup(g.key)} className={`btn-outline py-1.5 text-xs ${group === g.key ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-500/40 text-primary-700 dark:text-primary-300' : ''}`}>{g.label}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([key, items]) => (
          <div key={key} className="card overflow-hidden">
            <div className="px-4 py-3 bg-ink-50/70 dark:bg-ink-800/40 flex items-center gap-2 border-b border-ink-200 dark:border-ink-800">
              <Icon.Layers size={15} className="text-primary-600 dark:text-primary-400" />
              <span className="font-mono text-sm font-semibold">{key}</span>
              <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">{items.length} items</span>
              <span className="ml-auto text-xs text-ink-400">Qty {items.reduce((a, i) => a + i.quantity, 0)}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink-50/40 dark:bg-ink-800/30 text-[11px] font-semibold uppercase text-ink-400">
                    {['Item Code', 'Description', 'Material', 'Size', 'Schedule', 'Length', 'Weight', 'Qty', 'Unit', 'Status', 'Rev'].map(h => <th key={h} className="px-4 py-2.5 text-left whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-rows">
                  {items.map(i => (
                    <tr key={i.id} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
                      <td className="px-4 py-2.5 text-sm font-mono font-medium">{i.itemCode}</td>
                      <td className="px-4 py-2.5 text-sm">{i.description}</td>
                      <td className="px-4 py-2.5 text-sm text-ink-600 dark:text-ink-300">{i.material}</td>
                      <td className="px-4 py-2.5 text-sm font-mono">{i.size}</td>
                      <td className="px-4 py-2.5 text-sm font-mono">{i.schedule}</td>
                      <td className="px-4 py-2.5 text-sm tabular-nums">{i.length}</td>
                      <td className="px-4 py-2.5 text-sm tabular-nums">{i.weight}</td>
                      <td className="px-4 py-2.5 text-sm tabular-nums font-medium">
                        {i.prevQuantity !== undefined && i.prevQuantity !== i.quantity && (
                          <span className={`mr-1.5 text-xs ${i.quantity > i.prevQuantity ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'}`}>{i.quantity > i.prevQuantity ? '▲' : '▼'}</span>
                        )}
                        {i.quantity}
                      </td>
                      <td className="px-4 py-2.5 text-sm">{i.unit}</td>
                      <td className="px-4 py-2.5"><span className={`chip ${statusBadge(i.status)}`}>{i.status}</span></td>
                      <td className="px-4 py-2.5 text-sm font-mono">{i.revision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {Object.keys(grouped).length === 0 && <EmptyState title="No items match your search" icon={<Icon.Search />} />}
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-ink-500 dark:text-ink-400">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value.toLocaleString()}</span>
    </div>
  )
}
