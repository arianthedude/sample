import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui'
import { engineeringInbox, engineeringStats, projects } from '@/data/mock'
import { priorityColor } from '@/lib/format'

export default function EngineeringDashboard() {
  const stats = [
    { label: 'Open tasks', value: engineeringStats.openTasks },
    { label: 'Overdue', value: engineeringStats.overdueTasks, warn: true },
    { label: 'In review', value: engineeringStats.documentsInReview },
    { label: 'Uploads this week', value: engineeringStats.uploadsThisWeek },
  ]

  return (
    <div>
      <PageHeader title="Engineering" subtitle="Cross-project engineering overview"
        breadcrumbs={[{ label: 'Home' }, { label: 'Engineering' }]} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="card p-4">
            <div className={`text-2xl font-semibold tabular-nums ${s.warn ? 'text-warning-600 dark:text-warning-400' : ''}`}>{s.value}</div>
            <div className="text-xs text-ink-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="px-5 py-3 border-b border-ink-200 dark:border-ink-800">
          <h2 className="text-sm font-medium">Inbox</h2>
        </div>
        <ul className="divide-rows">
          {engineeringInbox.map(item => {
            const proj = projects.find(p => p.id === item.projectId)
            return (
              <li key={item.id} className="px-5 py-3 flex items-center gap-4 hover:bg-ink-50/60 dark:hover:bg-ink-800/30">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-500">{item.documentNumber}</span>
                    <span className={`chip text-[10px] ${priorityColor[item.priority] ?? ''}`}>{item.priority}</span>
                  </div>
                  <div className="text-sm truncate mt-0.5">{item.title}</div>
                </div>
                <span className="text-xs text-ink-400 hidden sm:block">{item.projectCode}</span>
                <span className="text-xs font-mono text-ink-400">{item.status}</span>
                {proj && (
                  <Link to={`/projects/${proj.id}/engineering`} className="text-xs text-primary-600 dark:text-primary-400 hover:underline shrink-0">
                    Open
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
