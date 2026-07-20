import { Link } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { Avatar, PageHeader, Progress } from '@/components/ui'
import { Donut, Bars, LineChart } from '@/components/Charts'
import { documents, activities, tasks, notifications, projects, users } from '@/data/mock'
import { statusBadge, priorityColor, relativeDate } from '@/lib/format'

export default function Dashboard() {
  const pendingReview = documents.filter(d => d.status === 'For Review').length
  const waitingApproval = documents.filter(d => d.status === 'For Approval').length
  const approved = documents.filter(d => d.status === 'Approved' || d.status === 'Issued For Construction').length
  const rejected = documents.filter(d => d.status === 'Rejected').length
  const overdue = documents.filter(d => d.dueDate && new Date(d.dueDate) < new Date() && d.status !== 'Approved' && d.status !== 'Issued For Construction').length

  const stats = [
    { label: 'Total Documents', value: documents.length, sub: 'Across 5 projects', icon: <Icon.Doc />, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10', trend: [12, 18, 22, 28, 34, 41, 52] },
    { label: 'Pending Review', value: pendingReview, sub: 'Awaiting engineers', icon: <Icon.Eye />, color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10', trend: [4, 6, 5, 8, 7, 9, 11] },
    { label: 'Waiting Approval', value: waitingApproval, sub: 'Lead / client stage', icon: <Icon.Check />, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10', trend: [2, 3, 5, 4, 6, 5, 7] },
    { label: 'Approved', value: approved, sub: 'Ready for issue', icon: <Icon.Shield />, color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', trend: [8, 12, 16, 20, 26, 31, 38] },
    { label: 'Rejected', value: rejected, sub: 'Rework required', icon: <Icon.Alert />, color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', trend: [1, 2, 1, 3, 2, 4, 3] },
    { label: 'Overdue Workflows', value: overdue, sub: 'Past due date', icon: <Icon.Clock />, color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', trend: [2, 1, 3, 2, 4, 3, 5] },
  ]

  const donutData = [
    { label: 'Approved', value: approved, color: '#16a34a' },
    { label: 'For Review', value: pendingReview, color: '#f59e0b' },
    { label: 'For Approval', value: waitingApproval, color: '#2563eb' },
    { label: 'Rejected', value: rejected, color: '#ef4444' },
    { label: 'Draft / Other', value: documents.length - approved - pendingReview - waitingApproval - rejected, color: '#94a3b8' },
  ]

  const barData = projects.map(p => ({ label: p.code.slice(-3), value: p.docs, color: '#2563eb' }))
  const lineData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => ({ label: m, value: 40 + i * 12 + (i % 3) * 6 }))

  const myAction = documents.filter(d => d.reviewer === 'Sarah Chen' || d.approver === 'Sarah Chen').slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Engineering document control across all active projects"
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
        actions={<>
          <Link to="/documents/upload" className="btn-outline"><Icon.Upload size={16} />Upload</Link>
          <Link to="/documents" className="btn-primary"><Icon.Doc size={16} />Document Register</Link>
        </>}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="card p-4 hover:shadow-pop transition group">
            <div className="flex items-center justify-between">
              <span className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>{s.icon}</span>
              <svg width="56" height="20" viewBox="0 0 56 20" className="opacity-60 group-hover:opacity-100 transition">
                <polyline points={s.trend.map((v, i) => `${i * 9},${20 - (v / Math.max(...s.trend)) * 18}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="1.5" className={s.color} />
              </svg>
            </div>
            <div className="mt-3 text-2xl font-semibold text-ink-900 dark:text-ink-50 tabular-nums">{s.value}</div>
            <div className="text-sm text-ink-600 dark:text-ink-300">{s.label}</div>
            <div className="text-xs text-ink-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold">Workflow Status</h3>
              <p className="text-xs text-ink-400">Document distribution across workflow stages</p>
            </div>
            <span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30">Live</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Donut data={donutData} size={180} />
            <div>
              <LineChart data={lineData} height={170} />
              <div className="text-xs text-ink-400 mt-2 text-center">Monthly documents issued</div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Notifications</h3>
            <span className="chip bg-danger-50 text-danger-700 border-danger-200 dark:bg-danger-500/10 dark:text-danger-300 dark:border-danger-500/30">{notifications.filter(n => !n.read).length} new</span>
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {notifications.map(n => (
              <div key={n.id} className="flex gap-2.5">
                <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.kind === 'success' ? 'bg-success-500' : n.kind === 'warning' ? 'bg-warning-500' : n.kind === 'danger' ? 'bg-danger-500' : 'bg-primary-500'}`} />
                <div className="min-w-0">
                  <p className="text-sm text-ink-700 dark:text-ink-200 leading-snug">{n.text}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Activity</h3>
            <Link to="/audit" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View audit log</Link>
          </div>
          <ol className="relative border-l-2 border-ink-100 dark:border-ink-800 ml-1.5 space-y-4">
            {activities.slice(0, 7).map(a => {
              const u = users.find(x => x.name === a.user)
              const dot = { approve: 'bg-success-500', upload: 'bg-primary-500', comment: 'bg-warning-500', reject: 'bg-danger-500', transmittal: 'bg-primary-500', revise: 'bg-primary-500', review: 'bg-warning-500' }[a.type]
              return (
                <li key={a.id} className="ml-5">
                  <span className={`absolute -left-[7px] w-3.5 h-3.5 rounded-full ${dot} ring-4 ring-white dark:ring-ink-900`} />
                  <div className="flex items-center gap-2.5">
                    {u && <Avatar name={u.name} color={u.color} size={24} />}
                    <p className="text-sm text-ink-700 dark:text-ink-200">
                      <span className="font-medium">{a.user}</span> {a.action} <span className="font-mono text-primary-600 dark:text-primary-400">{a.target}</span>
                    </p>
                    <span className="ml-auto text-xs text-ink-400 whitespace-nowrap">{a.time}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Documents Awaiting My Action</h3>
            <span className="chip bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/10 dark:text-warning-300 dark:border-warning-500/30">{myAction.length}</span>
          </div>
          <ul className="space-y-2.5">
            {myAction.map(d => (
              <li key={d.id} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition">
                <Icon.Doc size={16} className="text-ink-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm font-medium truncate">{d.number}</div>
                  <div className="text-xs text-ink-400 truncate">{d.title}</div>
                </div>
                <span className={`chip ${statusBadge(d.status)}`}>{d.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Assigned Tasks</h3>
            <Link to="/workflow/tasks" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">All tasks</Link>
          </div>
          <ul className="space-y-2.5">
            {tasks.slice(0, 5).map(t => (
              <li key={t.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition">
                <span className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${t.done ? 'bg-success-500 border-success-500 text-white' : 'border-ink-300 dark:border-ink-600'}`}>
                  {t.done && <Icon.Check size={12} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm ${t.done ? 'line-through text-ink-400' : 'text-ink-700 dark:text-ink-200'}`}>{t.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-primary-600 dark:text-primary-400">{t.docNumber}</span>
                    <span className={`chip text-[10px] ${priorityColor[t.priority]}`}>{t.priority}</span>
                    <span className="text-xs text-ink-400">{relativeDate(t.due)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Project Overview</h3>
          <Bars data={barData} height={180} />
          <ul className="mt-4 space-y-2.5">
            {projects.slice(0, 4).map(p => (
              <li key={p.id}>
                <Link to={`/projects/${p.id}`} className="flex items-center gap-3 hover:bg-ink-50 dark:hover:bg-ink-800 rounded-xl p-2 transition">
                  <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center"><Icon.Building size={15} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{p.name.split('—')[0]}</div>
                    <div className="text-xs text-ink-400">{p.code} · {p.docs} docs</div>
                  </div>
                  <div className="w-20"><Progress value={p.progress} /></div>
                  <span className="text-xs text-ink-500 tabular-nums w-8 text-right">{p.progress}%</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Uploads</h3>
            <Link to="/documents" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Register</Link>
          </div>
          <ul className="space-y-2.5">
            {documents.slice(0, 6).map(d => (
              <li key={d.id} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition">
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
      </div>
    </div>
  )
}
