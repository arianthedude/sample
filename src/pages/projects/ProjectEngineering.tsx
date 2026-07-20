import { useParams } from 'react-router-dom'
import { ProjectNav } from '@/components/ProjectNav'
import { PageHeader, DataTable } from '@/components/ui'
import { projects, engineeringInbox } from '@/data/mock'
import { priorityColor } from '@/lib/format'

export default function ProjectEngineering() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) ?? projects[0]
  const inbox = engineeringInbox.filter(i => i.projectId === p.id)

  return (
    <div>
      <PageHeader title={p.name} subtitle="Engineering workspace inbox"
        breadcrumbs={[{ label: 'Projects', to: '/projects' }, { label: p.code }]} />
      <ProjectNav />
      <div className="card">
        <DataTable
          columns={[
            { key: 'documentNumber', label: 'Document', className: 'font-mono text-xs' },
            { key: 'title', label: 'Title' },
            { key: 'taskType', label: 'Action', className: 'capitalize text-ink-500' },
            { key: 'status', label: 'Status', render: r => <span className="text-xs font-mono text-ink-500">{r.status}</span> },
            { key: 'priority', label: 'Priority', render: r => <span className={`chip text-[10px] ${priorityColor[r.priority] ?? ''}`}>{r.priority}</span> },
            { key: 'dueDate', label: 'Due', className: 'text-ink-400 text-xs' },
            { key: 'assignee', label: 'Assignee', className: 'text-ink-500' },
          ]}
          rows={inbox}
          empty="Inbox is empty"
        />
      </div>
    </div>
  )
}
