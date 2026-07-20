import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { employers } from '@/data/mock'

export default function Employers() {
  const [q, setQ] = useState('')
  const rows = employers.filter(e =>
    e.name.toLowerCase().includes(q.toLowerCase()) || e.code.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader title="Employers" subtitle={`${employers.length} clients / employers`}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Employers' }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />Add employer</button>} />
      <div className="card mb-4 p-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter employers…" className="input" />
      </div>
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs' },
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description', className: 'text-ink-500' },
            { key: 'isActive', label: 'Status', render: r => <StatusDot active={Boolean(r.isActive)} /> },
          ]}
          rows={rows}
        />
      </div>
    </div>
  )
}
