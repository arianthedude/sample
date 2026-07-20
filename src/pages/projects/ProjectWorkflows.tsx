import { useParams } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { ProjectNav } from '@/components/ProjectNav'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { projects, projectWorkflows } from '@/data/mock'

export default function ProjectWorkflows() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) ?? projects[0]
  const workflows = projectWorkflows.filter(w => w.projectId === p.id)

  return (
    <div>
      <PageHeader title={p.name} subtitle={`${workflows.length} workflows`}
        breadcrumbs={[{ label: 'Projects', to: '/projects' }, { label: p.code }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />New workflow</button>} />
      <ProjectNav />
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs' },
            { key: 'name', label: 'Workflow' },
            { key: 'stepCount', label: 'Steps', className: 'tabular-nums' },
            { key: 'instanceCount', label: 'Instances', className: 'tabular-nums' },
            { key: 'version', label: 'Ver', className: 'tabular-nums text-ink-400' },
            { key: 'isDefault', label: 'Default', render: r => r.isDefault ? 'Yes' : '—' },
            { key: 'isActive', label: 'Status', render: r => <StatusDot active={Boolean(r.isActive)} /> },
          ]}
          rows={workflows}
          empty="No workflows configured"
        />
      </div>
    </div>
  )
}
