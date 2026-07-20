import { useState, useMemo } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, Avatar, Progress } from '@/components/ui'
import { DocDrawer } from '@/components/DocDrawer'
import { documents, users } from '@/data/mock'
import { statusBadge, priorityColor, relativeDate } from '@/lib/format'
import type { Doc } from '@/data/types'

const COLUMNS = [
  { key: 'Draft', color: 'bg-ink-100 dark:bg-ink-800', dot: 'bg-ink-400' },
  { key: 'For Review', color: 'bg-warning-50/60 dark:bg-warning-500/5', dot: 'bg-warning-500' },
  { key: 'For Approval', color: 'bg-primary-50/60 dark:bg-primary-500/5', dot: 'bg-primary-500' },
  { key: 'Approved', color: 'bg-success-50/60 dark:bg-success-500/5', dot: 'bg-success-500' },
  { key: 'Rejected', color: 'bg-danger-50/60 dark:bg-danger-500/5', dot: 'bg-danger-500' },
  { key: 'Issued For Construction', color: 'bg-success-50/60 dark:bg-success-500/5', dot: 'bg-success-500' },
] as const

export default function Workflow({ mode }: { mode: 'reviews' | 'approvals' }) {
  const [drawerId, setDrawerId] = useState<string | null>(null)
  const [drag, setDrag] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const grouped = useMemo(() => {
    const g: Record<string, Doc[]> = {}
    COLUMNS.forEach(c => g[c.key] = [])
    documents.forEach(d => {
      if (g[d.status]) g[d.status].push(d)
    })
    if (mode === 'reviews') {
      delete g['For Approval']
    } else {
      delete g['For Review']
    }
    return g
  }, [mode])

  return (
    <div>
      <PageHeader
        title={mode === 'reviews' ? 'Reviews' : 'Approvals'}
        subtitle="Kanban view of documents moving through the engineering workflow"
        breadcrumbs={[{ label: 'Home' }, { label: 'Workflow' }, { label: mode === 'reviews' ? 'Reviews' : 'Approvals' }]}
        actions={<>
          <button className="btn-outline"><Icon.Filter size={16} />Filter</button>
          <button className="btn-primary"><Icon.Plus size={16} />New workflow</button>
        </>}
      />

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.filter(c => mode === 'reviews' ? c.key !== 'For Approval' : c.key !== 'For Review').map(col => (
            <div key={col.key} className="w-80 shrink-0">
              <div className={`rounded-2xl ${col.color} p-3 mb-3 flex items-center gap-2`}>
                <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                <h3 className="text-sm font-semibold text-ink-800 dark:text-ink-100">{col.key}</h3>
                <span className="ml-auto chip bg-white/70 dark:bg-ink-900/70 border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300">{grouped[col.key]?.length || 0}</span>
              </div>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(col.key) }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => { setDrag(null); setDragOver(null) }}
                className={`space-y-2.5 min-h-[200px] rounded-2xl p-1.5 transition ${dragOver === col.key ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-400 ring-offset-2 dark:ring-offset-ink-950' : ''}`}
              >
                {(grouped[col.key] || []).slice(0, 8).map(d => {
                  const u = users.find(x => x.name === d.reviewer)
                  return (
                    <div key={d.id} draggable onDragStart={() => setDrag(d.id)} onClick={() => setDrawerId(d.id)}
                      className="card p-3.5 cursor-grab active:cursor-grabbing hover:shadow-pop transition">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-semibold text-primary-700 dark:text-primary-300">{d.number}</span>
                        <span className={`chip text-[10px] ${priorityColor[d.priority]}`}>{d.priority}</span>
                      </div>
                      <p className="text-sm text-ink-700 dark:text-ink-200 leading-snug line-clamp-2 mb-2.5">{d.title}</p>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700 font-mono text-[10px]">Rev {d.revision}</span>
                        <span className={`chip ${statusBadge(d.status)} text-[10px]`}>{d.workflowStage}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-[10px] text-ink-400 mb-1"><span>Progress</span><span>{d.progress}%</span></div>
                        <Progress value={d.progress} color={d.status === 'Rejected' ? 'danger' : 'primary'} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {u && <Avatar name={u.name} color={u.color} size={22} />}
                          <span className="text-xs text-ink-500 dark:text-ink-400">{d.reviewer.split(' ')[0]}</span>
                        </div>
                        <span className={`text-xs flex items-center gap-1 ${d.dueDate && new Date(d.dueDate) < new Date() ? 'text-danger-600 dark:text-danger-400 font-medium' : 'text-ink-400'}`}>
                          <Icon.Clock size={12} />{d.dueDate ? relativeDate(d.dueDate) : '—'}
                        </span>
                      </div>
                    </div>
                  )
                })}
                {(grouped[col.key]?.length || 0) === 0 && (
                  <div className="text-center py-8 text-xs text-ink-400 border-2 border-dashed border-ink-200 dark:border-ink-800 rounded-xl">Drop cards here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DocDrawer docId={drawerId} onClose={() => setDrawerId(null)} />
    </div>
  )
}
