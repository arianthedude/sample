import { useParams } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { ProjectNav } from '@/components/ProjectNav'
import { PageHeader, DataTable, StatusDot } from '@/components/ui'
import { projects, projectTeams, workspaces } from '@/data/mock'

export default function ProjectTeams() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) ?? projects[0]
  const teams = projectTeams.filter(t => t.projectId === p.id)
  const wsName = (wsId: string) => workspaces.find(w => w.id === wsId)?.name ?? '—'

  return (
    <div>
      <PageHeader title={p.name} subtitle={`${teams.length} teams`}
        breadcrumbs={[{ label: 'Projects', to: '/projects' }, { label: p.code }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />Add team</button>} />
      <ProjectNav />
      <div className="card">
        <DataTable
          columns={[
            { key: 'code', label: 'Code', className: 'font-mono text-xs' },
            { key: 'name', label: 'Team' },
            { key: 'workspaceId', label: 'Workspace', render: r => wsName(r.workspaceId) },
            { key: 'memberCount', label: 'Members', className: 'tabular-nums' },
            { key: 'isActive', label: 'Status', render: r => <StatusDot active={Boolean(r.isActive)} /> },
          ]}
          rows={teams}
          empty="No teams for this project"
        />
      </div>
    </div>
  )
}
