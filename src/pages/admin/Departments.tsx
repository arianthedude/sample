import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { departments, branches } from '@/data/mock'

export default function Departments() {
  const [q, setQ] = useState('')
  const branchName = (id: string) => branches.find(b => b.id === id)?.name ?? '—'
  const rows = departments.filter(d =>
    d.name.toLowerCase().includes(q.toLowerCase()) || d.code.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader title="Departments" subtitle={`${departments.length} departments`}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Departments' }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />Add department</button>} />
      <div className="card mb-4 p-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter departments…" className="input" />
      </div>
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs' },
            { key: 'name', label: 'Name' },
            { key: 'branchId', label: 'Branch', render: r => branchName(r.branchId) },
            { key: 'head', label: 'Head', className: 'text-ink-500' },
            { key: 'status', label: 'Status', render: r => <StatusDot active={r.status === 'active'} /> },
          ]}
          rows={rows}
        />
      </div>
    </div>
  )
}
