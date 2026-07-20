import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, Progress } from '@/components/ui'
import { tasks } from '@/data/mock'
import { priorityColor, relativeDate } from '@/lib/format'

export default function Tasks() {
  const [items, setItems] = useState(tasks)
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all')
  const shown = items.filter(t => filter === 'all' ? true : filter === 'open' ? !t.done : t.done)
  const done = items.filter(t => t.done).length
  return (
    <div>
      <PageHeader
        title="My Tasks"
        subtitle={`${items.length - done} open · ${done} completed`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Workflow' }, { label: 'My Tasks' }]}
      />
      <div className="flex gap-2 mb-4">
        {(['all', 'open', 'done'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`btn-outline ${filter === f ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-500/40 text-primary-700 dark:text-primary-300' : ''}`}>
            {f === 'all' ? 'All' : f === 'open' ? 'Open' : 'Completed'}
          </button>
        ))}
      </div>
      <div className="card divide-rows">
        {shown.map(t => (
          <div key={t.id} className="flex items-start gap-3 p-4 hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition">
            <button onClick={() => setItems(prev => prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
              className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${t.done ? 'bg-success-500 border-success-500 text-white' : 'border-ink-300 dark:border-ink-600 hover:border-primary-500'}`}>
              {t.done && <Icon.Check size={12} />}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${t.done ? 'line-through text-ink-400' : 'text-ink-800 dark:text-ink-100'}`}>{t.title}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="font-mono text-xs text-primary-600 dark:text-primary-400">{t.docNumber}</span>
                <span className={`chip text-[10px] ${priorityColor[t.priority]}`}>{t.priority}</span>
                <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700 text-[10px]">{t.type}</span>
                <span className={`text-xs ${relativeDate(t.due).includes('overdue') ? 'text-danger-600 dark:text-danger-400 font-medium' : 'text-ink-400'}`}>{relativeDate(t.due)}</span>
              </div>
            </div>
            <span className="text-xs text-ink-400 hidden sm:block">{t.assignee}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
