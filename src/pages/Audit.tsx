import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { auditLog } from '@/data/mock'

export default function Audit() {
  const [q, setQ] = useState('')
  const shown = auditLog.filter(a => a.user.toLowerCase().includes(q.toLowerCase()) || a.action.toLowerCase().includes(q.toLowerCase()) || a.entity.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <PageHeader title="Audit Logs" subtitle={`${auditLog.length} recent events`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Audit Logs' }]}
        actions={<button className="btn-outline"><Icon.Download size={16} />Export</button>} />
      <div className="card p-3 mb-4">
        <div className="relative">
          <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by user, action, or entity…" className="input pl-9" />
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-50/70 dark:bg-ink-800/40 text-[11px] font-semibold uppercase text-ink-400">
                <th className="px-4 py-2.5 text-left">Time</th>
                <th className="px-4 py-2.5 text-left">User</th>
                <th className="px-4 py-2.5 text-left">Action</th>
                <th className="px-4 py-2.5 text-left">Entity</th>
                <th className="px-4 py-2.5 text-left">IP address</th>
              </tr>
            </thead>
            <tbody className="divide-rows">
              {shown.map(a => (
                <tr key={a.id} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
                  <td className="px-4 py-2.5 text-sm text-ink-500 dark:text-ink-400 tabular-nums whitespace-nowrap">{a.time}</td>
                  <td className="px-4 py-2.5 text-sm font-medium whitespace-nowrap">{a.user}</td>
                  <td className="px-4 py-2.5"><span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30 font-mono text-[10px]">{a.action}</span></td>
                  <td className="px-4 py-2.5 text-sm font-mono">{a.entity}</td>
                  <td className="px-4 py-2.5 text-sm text-ink-500 dark:text-ink-400 font-mono">{a.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
