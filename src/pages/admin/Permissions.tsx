import { useState } from 'react'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { portalPermissions } from '@/data/mock'

export default function Permissions() {
  const [q, setQ] = useState('')
  const rows = portalPermissions.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader title="Permissions" subtitle={`${portalPermissions.length} permission codes`}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Permissions' }]} />
      <div className="card mb-4 p-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter permissions…" className="input" />
      </div>
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs text-primary-600 dark:text-primary-400' },
            { key: 'name', label: 'Name' },
            { key: 'isActive', label: 'Status', render: r => <StatusDot active={Boolean(r.isActive)} /> },
          ]}
          rows={rows}
        />
      </div>
    </div>
  )
}
