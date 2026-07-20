import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { codeFormats } from '@/data/mock'

export default function CodeFormats() {
  return (
    <div>
      <PageHeader title="Code Formats" subtitle="Entity numbering rules"
        breadcrumbs={[{ label: 'Admin' }, { label: 'Code Formats' }]} />
      <div className="card">
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'entityType', label: 'Entity', className: 'font-mono text-xs capitalize' },
            { key: 'separator', label: 'Sep', className: 'font-mono text-center' },
            { key: 'segments', label: 'Segments', render: r => r.segments.join(` ${r.separator} `) },
            { key: 'isDefault', label: 'Default', render: r => r.isDefault ? 'Yes' : '—' },
            { key: 'isActive', label: 'Status', render: r => <StatusDot active={Boolean(r.isActive)} /> },
          ]}
          rows={codeFormats}
        />
      </div>
    </div>
  )
}
