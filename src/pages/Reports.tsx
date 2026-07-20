import { Icon } from '@/components/Icon'
import { PageHeader, Progress } from '@/components/ui'
import { Donut, Bars, LineChart } from '@/components/Charts'
import { documents, projects, mtoItems } from '@/data/mock'

export default function Reports() {
  const byProject = projects.map(p => ({ label: p.code.slice(-3), value: p.docs, color: '#2563eb' }))
  const byDiscipline = ['Process', 'Piping', 'Structural', 'Mechanical', 'Electrical', 'Instrumentation', 'Civil', 'Pipeline'].map(d => ({
    label: d.slice(0, 4), value: documents.filter(x => x.discipline === d).length, color: '#16a34a',
  }))
  const status = [
    { label: 'Approved', value: documents.filter(d => d.status === 'Approved' || d.status === 'Issued For Construction').length, color: '#16a34a' },
    { label: 'For Review', value: documents.filter(d => d.status === 'For Review').length, color: '#f59e0b' },
    { label: 'For Approval', value: documents.filter(d => d.status === 'For Approval').length, color: '#2563eb' },
    { label: 'Rejected', value: documents.filter(d => d.status === 'Rejected').length, color: '#ef4444' },
  ]
  const trend = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((m, i) => ({ label: m, value: 18 + i * 4 + (i % 3) * 3 }))

  return (
    <div>
      <PageHeader title="Reports" subtitle="Engineering performance and document control analytics"
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports' }]}
        actions={<button className="btn-outline"><Icon.Download size={16} />Export PDF</button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <Kpi label="Avg review time" value="3.2d" delta="-0.4d" up />
        <Kpi label="On-time issue rate" value="92%" delta="+4%" up />
        <Kpi label="Rejection rate" value="6.4%" delta="-1.2%" up />
        <Kpi label="Open work items" value="184" delta="+12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card p-5"><h3 className="text-base font-semibold mb-4">Documents by Project</h3><Bars data={byProject} height={200} /></div>
        <div className="card p-5"><h3 className="text-base font-semibold mb-4">Documents by Discipline</h3><Bars data={byDiscipline} height={200} /></div>
        <div className="card p-5"><h3 className="text-base font-semibold mb-4">Workflow Status</h3><Donut data={status} size={180} /></div>
        <div className="card p-5"><h3 className="text-base font-semibold mb-4">Weekly Issued Documents</h3><LineChart data={trend} height={200} /></div>
      </div>

      <div className="card p-5">
        <h3 className="text-base font-semibold mb-4">Project Health</h3>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium">{p.name.split('—')[0]}</span>
                <span className="text-xs text-ink-400">{p.docs} docs · {p.openIssues} open issues</span>
              </div>
              <Progress value={p.progress} color={p.progress === 100 ? 'success' : p.openIssues > 10 ? 'warning' : 'primary'} />
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 mt-5">
        <h3 className="text-base font-semibold mb-4">MTO Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Total items" value={mtoItems.length} />
          <Kpi label="Total weight (kg)" value={Math.round(mtoItems.reduce((a, i) => a + i.weight * i.quantity, 0)).toLocaleString()} />
          <Kpi label="Unique lines" value={new Set(mtoItems.map(i => i.lineNo)).size} />
          <Kpi label="Changed items" value={mtoItems.filter(i => i.prevQuantity !== undefined).length} />
        </div>
      </div>
    </div>
  )
}

function Kpi({ label, value, delta, up }: { label: string; value: string | number; delta?: string; up?: boolean }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-ink-400">{label}</div>
      <div className="text-2xl font-semibold mt-1 tabular-nums">{value}</div>
      {delta && <div className={`text-xs mt-1 flex items-center gap-1 ${up ? 'text-success-600 dark:text-success-400' : 'text-ink-400'}`}><Icon.TrendUp size={13} />{delta} vs last period</div>}
    </div>
  )
}
