import { Link } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { PageHeader, Progress, Avatar } from '@/components/ui'
import { Donut, Bars } from '@/components/Charts'
import { projects, users, documents } from '@/data/mock'

const statusColors: Record<string, string> = {
  Active: 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30',
  'On Hold': 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/10 dark:text-warning-300 dark:border-warning-500/30',
  Completed: 'bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700',
  Planning: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30',
}

export default function Projects() {
  return (
    <div>
      <PageHeader title="Projects" subtitle={`${projects.length} projects · ${projects.reduce((a, p) => a + p.docs, 0).toLocaleString()} documents`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Projects' }]}
        actions={<Link to="/projects/new" className="btn-primary"><Icon.Plus size={16} />Create Project</Link>} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map(p => {
          const team = p.team.map(id => users.find(u => u.id === id)!).filter(Boolean)
          const discData = p.disciplines.map(d => ({ label: d.name.slice(0, 3), value: d.progress, color: '#2563eb' }))
          return (
            <Link to={`/projects/${p.id}`} key={p.id} className="card p-5 hover:shadow-pop hover:border-primary-300 dark:hover:border-primary-500/40 transition group">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-400">{p.code}</span>
                    <span className={`chip text-[10px] ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                  <h3 className="text-base font-semibold mt-1 tracking-tight group-hover:text-primary-700 dark:group-hover:text-primary-300 transition">{p.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-400">
                    <span className="flex items-center gap-1"><Icon.Building size={12} />{p.client}</span>
                    <span className="flex items-center gap-1"><Icon.MapPin size={12} />{p.location}</span>
                  </div>
                </div>
                <span className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center shrink-0"><Icon.Folder /></span>
              </div>

              <p className="text-sm text-ink-500 dark:text-ink-400 line-clamp-2 mb-4">{p.description}</p>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5"><span className="text-ink-500 dark:text-ink-400">Engineering progress</span><span className="font-medium tabular-nums">{p.progress}%</span></div>
                <Progress value={p.progress} color={p.progress === 100 ? 'success' : 'primary'} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <Stat label="Documents" value={p.docs.toLocaleString()} />
                <Stat label="Open issues" value={p.openIssues} />
                <Stat label="Budget" value={`$${(p.budget / 1e6).toFixed(0)}M`} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {team.slice(0, 5).map(u => <Avatar key={u.id} name={u.name} color={u.color} size={26} />)}
                  {team.length > 5 && <span className="w-[26px] h-[26px] rounded-full bg-ink-100 dark:bg-ink-800 text-ink-500 text-[10px] flex items-center justify-center border-2 border-white dark:border-ink-900">+{team.length - 5}</span>}
                </div>
                <Bars data={discData} height={36} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-ink-50 dark:bg-ink-800/50 p-2.5">
      <div className="text-sm font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-ink-400">{label}</div>
    </div>
  )
}
