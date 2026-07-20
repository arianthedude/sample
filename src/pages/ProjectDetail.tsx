import { Link, useParams } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { PageHeader, Progress, Avatar, Breadcrumbs } from '@/components/ui'
import { ProjectNav } from '@/components/ProjectNav'
import { Donut, Bars, LineChart } from '@/components/Charts'
import { projects, users, documents } from '@/data/mock'
import { statusBadge, formatDate } from '@/lib/format'

export default function ProjectDetail() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) || projects[0]
  const team = p.team.map(uid => users.find(u => u.id === uid)!).filter(Boolean)
  const docs = documents.filter(d => d.projectId === p.id).slice(0, 6)

  const statusData = [
    { label: 'Approved', value: documents.filter(d => d.projectId === p.id && (d.status === 'Approved' || d.status === 'Issued For Construction')).length, color: '#16a34a' },
    { label: 'For Review', value: documents.filter(d => d.projectId === p.id && d.status === 'For Review').length, color: '#f59e0b' },
    { label: 'For Approval', value: documents.filter(d => d.projectId === p.id && d.status === 'For Approval').length, color: '#2563eb' },
    { label: 'Other', value: documents.filter(d => d.projectId === p.id && !['Approved', 'Issued For Construction', 'For Review', 'For Approval'].includes(d.status)).length, color: '#94a3b8' },
  ]

  const timeline = ['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Feb', 'Apr'].map((m, i) => ({ label: m, value: Math.min(100, i * 14 + (i % 2) * 6) }))

  return (
    <div>
      <div className="mb-4"><Breadcrumbs items={[{ label: 'Home' }, { label: 'Projects', to: '/projects' }, { label: p.code }]} /></div>
      <ProjectNav />

      <div className="card p-5 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-sm text-ink-400">{p.code}</span>
              <span className={`chip ${p.status === 'Active' ? 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30' : 'bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700'}`}>{p.status}</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-balance">{p.name}</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-2 max-w-2xl">{p.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-ink-500 dark:text-ink-400">
              <span className="flex items-center gap-1.5"><Icon.Building size={15} />{p.client}</span>
              <span className="flex items-center gap-1.5"><Icon.MapPin size={15} />{p.location}</span>
              <span className="flex items-center gap-1.5"><Icon.Calendar size={15} />{formatDate(p.startDate)} → {formatDate(p.dueDate)}</span>
            </div>
          </div>
          <div className="lg:w-56">
            <div className="text-xs text-ink-400 mb-1.5">Engineering progress</div>
            <Progress value={p.progress} color={p.progress === 100 ? 'success' : 'primary'} />
            <div className="flex items-center justify-between mt-2 text-sm"><span className="text-ink-400">Complete</span><span className="font-semibold tabular-nums">{p.progress}%</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <Stat label="Documents" value={p.docs.toLocaleString()} icon={<Icon.Doc />} />
        <Stat label="Open issues" value={p.openIssues} icon={<Icon.Alert />} />
        <Stat label="Team members" value={team.length} icon={<Icon.Users />} />
        <Stat label="Budget" value={`$${(p.budget / 1e6).toFixed(0)}M`} icon={<Icon.Report />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Discipline Progress</h3>
          <div className="space-y-3">
            {p.disciplines.map(d => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm mb-1"><span className="text-ink-600 dark:text-ink-300">{d.name}</span><span className="text-xs text-ink-400 tabular-nums">{d.docs} docs · {d.progress}%</span></div>
                <Progress value={d.progress} color={d.progress === 100 ? 'success' : 'primary'} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Workflow Statistics</h3>
          <Donut data={statusData} size={170} />
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Project Timeline</h3>
          <LineChart data={timeline} height={170} />
          <div className="text-xs text-ink-400 mt-2 text-center">Cumulative engineering progress</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Recent Documents</h3>
            <Link to="/documents" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</Link>
          </div>
          <ul className="space-y-2">
            {docs.map(d => (
              <li key={d.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition">
                <span className="w-9 h-9 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-500 flex items-center justify-center font-mono text-[10px] font-semibold uppercase">{d.type.slice(0, 3)}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm font-medium truncate">{d.number}</div>
                  <div className="text-xs text-ink-400 truncate">{d.title} · Rev {d.revision}</div>
                </div>
                <span className={`chip ${statusBadge(d.status)}`}>{d.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Team Members</h3>
          <ul className="space-y-2.5">
            {team.map(u => (
              <li key={u.id} className="flex items-center gap-3">
                <Avatar name={u.name} color={u.color} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                  <div className="text-xs text-ink-400 truncate">{u.role}</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-success-500" title="Active" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center">{icon}</span>
      <div>
        <div className="text-xl font-semibold tabular-nums">{value}</div>
        <div className="text-xs text-ink-400">{label}</div>
      </div>
    </div>
  )
}
