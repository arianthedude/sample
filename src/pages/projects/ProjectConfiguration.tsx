import { useParams } from 'react-router-dom'
import { ProjectNav } from '@/components/ProjectNav'
import { PageHeader } from '@/components/ui'
import { projects, projectConfigurations } from '@/data/mock'

export default function ProjectConfiguration() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) ?? projects[0]
  const cfg = projectConfigurations.find(c => c.projectId === p.id) ?? projectConfigurations[0]

  const fields = [
    ['Revision policy', cfg.revisionPolicy],
    ['Issue purpose source', cfg.issuePurposeSource],
    ['Engineering submission', cfg.engineeringSubmissionMode],
    ['Upload mode', cfg.uploadMode],
    ['Engineering workspace', cfg.engineeringWorkspaceEnabled ? 'Enabled' : 'Disabled'],
    ['DCC workspace', cfg.dccWorkspaceEnabled ? 'Enabled' : 'Disabled'],
  ]

  return (
    <div>
      <PageHeader title={p.name} subtitle="Project configuration"
        breadcrumbs={[{ label: 'Projects', to: '/projects' }, { label: p.code }]} />
      <ProjectNav />
      <div className="card divide-rows">
        {fields.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-ink-500">{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink-400 mt-3">GET /api/v1/projects/{p.id}/configuration</p>
    </div>
  )
}
