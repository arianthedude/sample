import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { branches } from '@/data/mock'

export default function Branches() {
  const [q, setQ] = useState('')
  const rows = branches.filter(b =>
    b.name.toLowerCase().includes(q.toLowerCase()) || b.code.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader title="Branches" subtitle={`${branches.length} branches`}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Branches' }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />Add branch</button>} />
      <div className="card mb-4 p-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter branches…" className="input" />
      </div>
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs' },
            { key: 'name', label: 'Name' },
            { key: 'phone', label: 'Phone', className: 'text-ink-500' },
            { key: 'description', label: 'Description', className: 'text-ink-500 max-w-xs truncate' },
            { key: 'status', label: 'Status', render: r => <StatusDot active={r.status === 'active'} /> },
          ]}
          rows={rows}
        />
      </div>
    </div>
  )
}
