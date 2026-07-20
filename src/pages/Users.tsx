import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, Avatar } from '@/components/ui'
import { users, documents } from '@/data/mock'

export default function Users() {
  const [q, setQ] = useState('')
  const shown = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.role.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <PageHeader title="Users" subtitle={`${users.length} team members across all projects`}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Users' }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />Invite user</button>} />
      <div className="card p-3 mb-4">
        <div className="relative">
          <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users…" className="input pl-9" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {shown.map(u => {
          const docs = documents.filter(d => d.reviewer === u.name || d.approver === u.name).length
          return (
            <div key={u.id} className="card p-5 hover:shadow-pop transition">
              <div className="flex items-start gap-3">
                <Avatar name={u.name} color={u.color} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-ink-500 dark:text-ink-400">{u.role}</div>
                  <div className="text-xs text-ink-400 mt-1 truncate">{u.email}</div>
                </div>
                <button className="btn-ghost p-1.5"><Icon.Dots size={16} /></button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Stat label="Docs" value={docs} />
                <Stat label="Projects" value={Math.floor(u.id.charCodeAt(1) / 3) + 1} />
                <Stat label="Open tasks" value={Math.floor(docs / 4)} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl bg-ink-50 dark:bg-ink-800/50 p-2.5 text-center"><div className="text-sm font-semibold tabular-nums">{value}</div><div className="text-[11px] text-ink-400">{label}</div></div>
}
