import { useEffect, useState } from 'react'
import type { Doc } from '@/data/types'
import { Icon } from './Icon'
import { Avatar, Progress } from './ui'
import { statusBadge, formatDate, workflowOrder } from '@/lib/format'
import { documents, users } from '@/data/mock'

type Tab = 'overview' | 'revisions' | 'workflow' | 'comments' | 'approvals' | 'review' | 'attachments' | 'related' | 'transmittals'

export function DocDrawer({ docId, onClose }: { docId: string | null; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('overview')
  const doc = documents.find(d => d.id === docId) || null
  useEffect(() => { setTab('overview') }, [docId])
  useEffect(() => {
    if (!docId) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [docId, onClose])
  if (!doc) return null

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Icon.Doc size={15} /> },
    { id: 'revisions', label: 'Revisions', icon: <Icon.GitBranch size={15} /> },
    { id: 'workflow', label: 'Workflow', icon: <Icon.Flow size={15} /> },
    { id: 'review', label: 'Review History', icon: <Icon.Eye size={15} /> },
    { id: 'approvals', label: 'Approvals', icon: <Icon.Check size={15} /> },
    { id: 'comments', label: 'Comments', icon: <Icon.Message size={15} /> },
    { id: 'attachments', label: 'Attachments', icon: <Icon.Paperclip size={15} /> },
    { id: 'related', label: 'Related', icon: <Icon.Layers size={15} /> },
    { id: 'transmittals', label: 'Transmittals', icon: <Icon.Send size={15} /> },
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative w-full max-w-2xl h-full bg-white dark:bg-ink-900 border-l border-ink-200 dark:border-ink-800 shadow-pop animate-slide-in-r flex flex-col">
        <header className="px-5 py-4 border-b border-ink-200 dark:border-ink-800 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-semibold text-ink-900 dark:text-ink-50">{doc.number}</span>
              <span className={`chip ${statusBadge(doc.status)}`}>{doc.status}</span>
              <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">Rev {doc.revision}</span>
              <span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30">{doc.discipline}</span>
            </div>
            <h2 className="mt-1.5 text-lg font-semibold text-ink-900 dark:text-ink-50 tracking-tight text-balance">{doc.title}</h2>
          </div>
          <button onClick={onClose} className="btn-ghost p-2 rounded-lg" aria-label="Close"><Icon.Close /></button>
        </header>

        <nav className="px-3 border-b border-ink-200 dark:border-ink-800 flex gap-0.5 overflow-x-auto no-scrollbar">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition ${tab === t.id ? 'border-primary-600 text-primary-700 dark:text-primary-300' : 'border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {tab === 'overview' && <Overview doc={doc} />}
          {tab === 'revisions' && <RevisionsTab doc={doc} />}
          {tab === 'workflow' && <WorkflowTab doc={doc} />}
          {tab === 'review' && <ReviewTab doc={doc} />}
          {tab === 'approvals' && <ApprovalsTab doc={doc} />}
          {tab === 'comments' && <CommentsTab doc={doc} />}
          {tab === 'attachments' && <AttachmentsTab doc={doc} />}
          {tab === 'related' && <RelatedTab doc={doc} />}
          {tab === 'transmittals' && <TransmittalsTab doc={doc} />}
        </div>

        <footer className="px-5 py-3 border-t border-ink-200 dark:border-ink-800 flex items-center gap-2">
          <button className="btn-outline"><Icon.Eye size={16} />Preview</button>
          <button className="btn-outline"><Icon.Download size={16} />Download</button>
          <button className="btn-primary ml-auto"><Icon.Flow size={16} />Advance Workflow</button>
        </footer>
      </aside>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink-800 dark:text-ink-100">{value || '—'}</dd>
    </div>
  )
}

function Overview({ doc }: { doc: Doc }) {
  const u = users.find(x => x.name === doc.reviewer)
  const a = users.find(x => x.name === doc.approver)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-200 mb-2">Description</h3>
        <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed">{doc.description}</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Meta label="Document Number" value={<span className="font-mono">{doc.number}</span>} />
        <Meta label="Revision" value={doc.revision} />
        <Meta label="Type" value={doc.type} />
        <Meta label="Discipline" value={doc.discipline} />
        <Meta label="System" value={doc.system} />
        <Meta label="Area" value={doc.area} />
        <Meta label="Vendor" value={doc.vendor} />
        <Meta label="Project" value={doc.projectId} />
        <Meta label="Issue Date" value={formatDate(doc.issueDate)} />
        <Meta label="Last Updated" value={formatDate(doc.lastUpdated)} />
        <Meta label="Priority" value={doc.priority} />
        <Meta label="Progress" value={`${doc.progress}%`} />
      </dl>
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-xs text-ink-400 mb-2">Current Reviewer</div>
          <div className="flex items-center gap-2.5">
            {u && <Avatar name={u.name} color={u.color} />}
            <div><div className="text-sm font-medium">{doc.reviewer}</div><div className="text-xs text-ink-400">{u?.role}</div></div>
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-ink-400 mb-2">Current Approver</div>
          <div className="flex items-center gap-2.5">
            {a && <Avatar name={a.name} color={a.color} />}
            <div><div className="text-sm font-medium">{doc.approver}</div><div className="text-xs text-ink-400">{a?.role}</div></div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-200 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-1.5">
          {doc.tags.map(t => <span key={t} className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700"><Icon.Tag size={12} />{t}</span>)}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink-700 dark:text-ink-200 mb-2">Workflow Progress</h3>
        <Progress value={doc.progress} />
        <div className="mt-2 text-xs text-ink-400">Stage: {doc.workflowStage}</div>
      </div>
    </div>
  )
}

function RevisionsTab({ doc }: { doc: Doc }) {
  return (
    <ol className="relative border-l-2 border-ink-200 dark:border-ink-800 ml-2 space-y-5">
      {[...doc.revisions].reverse().map((r, i) => (
        <li key={i} className="ml-5">
          <span className="absolute -left-[9px] mt-1 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-ink-900" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30">Rev {r.rev}</span>
            <span className={`chip ${statusBadge(r.status)}`}>{r.status}</span>
            <span className="text-xs text-ink-400">{formatDate(r.date)}</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-700 dark:text-ink-200">{r.reason}</p>
          <p className="text-xs text-ink-400 mt-0.5">By {r.by} · {r.size}</p>
        </li>
      ))}
    </ol>
  )
}

function WorkflowTab({ doc }: { doc: Doc }) {
  return (
    <ol className="relative ml-2 space-y-1">
      {workflowOrder.map((stage, i) => {
        const step = doc.workflow.find(w => w.stage === stage)
        if (!step) return null
        const colorMap = { done: 'bg-success-500', current: 'bg-primary-500', pending: 'bg-ink-300 dark:bg-ink-700', rejected: 'bg-danger-500' }
        return (
          <li key={stage} className="flex gap-3 pb-6 relative">
            {i < workflowOrder.length - 1 && <span className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-ink-200 dark:bg-ink-800" />}
            <span className={`w-6 h-6 rounded-full ${colorMap[step.status]} ring-4 ring-white dark:ring-ink-900 shrink-0 flex items-center justify-center text-white`}>
              {step.status === 'done' ? <Icon.Check size={13} /> : step.status === 'current' ? <Icon.Clock size={12} /> : null}
            </span>
            <div className="flex-1 -mt-0.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{stage}</span>
                <span className={`chip text-[10px] ${step.status === 'done' ? 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30' : step.status === 'current' ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30' : 'bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700'}`}>{step.status}</span>
              </div>
              <div className="text-xs text-ink-400 mt-0.5">{step.assignee}{step.date ? ` · ${formatDate(step.date)}` : ''}</div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function ReviewTab({ doc }: { doc: Doc }) {
  const reviews = doc.revisions.flatMap((r, i) => [
    { id: `r${i}-1`, who: doc.reviewer, action: 'Reviewed', rev: r.rev, date: r.date, note: 'Marked for approval' },
    { id: `r${i}-2`, who: 'Brendan Walsh', action: 'Client commented', rev: r.rev, date: r.date, note: 'Requested tie-in coordinate update' },
  ]).slice(0, 6)
  return (
    <ul className="space-y-3">
      {reviews.map(r => (
        <li key={r.id} className="card p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{r.who}</span>
            <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">Rev {r.rev}</span>
          </div>
          <div className="text-xs text-ink-400 mt-0.5">{r.action} · {formatDate(r.date)}</div>
          <p className="text-sm text-ink-600 dark:text-ink-300 mt-1.5">{r.note}</p>
        </li>
      ))}
    </ul>
  )
}

function ApprovalsTab({ doc }: { doc: Doc }) {
  const approvals = doc.revisions.map((r, i) => ({
    id: `a${i}`, rev: r.rev, who: doc.approver, decision: r.status === 'Approved' || r.status === 'Issued For Construction' ? 'Approved' : r.status === 'Rejected' ? 'Rejected' : 'Pending', date: r.date,
  }))
  return (
    <ul className="space-y-2.5">
      {approvals.map(a => (
        <li key={a.id} className="card p-3.5 flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${a.decision === 'Approved' ? 'bg-success-500' : a.decision === 'Rejected' ? 'bg-danger-500' : 'bg-ink-300 dark:bg-ink-600'}`} />
          <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">Rev {a.rev}</span>
          <span className="text-sm flex-1">{a.who}</span>
          <span className={`chip ${a.decision === 'Approved' ? 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30' : a.decision === 'Rejected' ? 'bg-danger-50 text-danger-700 border-danger-200 dark:bg-danger-500/10 dark:text-danger-300 dark:border-danger-500/30' : 'bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700'}`}>{a.decision}</span>
          <span className="text-xs text-ink-400">{formatDate(a.date)}</span>
        </li>
      ))}
    </ul>
  )
}

function CommentsTab({ doc }: { doc: Doc }) {
  return (
    <div className="space-y-4">
      <div className="card p-3 flex gap-2">
        <textarea placeholder="Add a comment…" className="flex-1 resize-none bg-transparent outline-none text-sm h-16" />
        <button className="btn-primary self-end"><Icon.Send size={15} /></button>
      </div>
      {doc.comments.map(c => {
        const u = users.find(x => x.name === c.author)
        return (
          <div key={c.id} className="flex gap-3">
            {u && <Avatar name={u.name} color={u.color} />}
            <div className="flex-1 card p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{c.author}</span>
                {c.resolved ? <span className="chip bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30">Resolved</span> : <span className="chip bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/10 dark:text-warning-300 dark:border-warning-500/30">Open</span>}
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-300 mt-1.5 leading-relaxed">{c.text}</p>
              <span className="text-xs text-ink-400 mt-1.5 block">{formatDate(c.date)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AttachmentsTab({ doc }: { doc: Doc }) {
  return (
    <ul className="space-y-2">
      {doc.attachments.map(a => (
        <li key={a.id} className="card p-3.5 flex items-center gap-3 hover:shadow-pop transition group">
          <span className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center font-mono text-[10px] font-semibold uppercase">{a.type}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{a.name}</div>
            <div className="text-xs text-ink-400">{a.size} · {formatDate(a.date)}</div>
          </div>
          <button className="btn-ghost p-2 opacity-0 group-hover:opacity-100 transition"><Icon.Download size={16} /></button>
        </li>
      ))}
    </ul>
  )
}

function RelatedTab({ doc }: { doc: Doc }) {
  const related = doc.related.map(id => documents.find(d => d.id === id)).filter(Boolean) as Doc[]
  return (
    <ul className="space-y-2">
      {related.map(d => (
        <li key={d.id} className="card p-3.5 hover:shadow-pop transition cursor-pointer">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-semibold">{d.number}</span>
            <span className={`chip ${statusBadge(d.status)}`}>{d.status}</span>
            <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">Rev {d.revision}</span>
          </div>
          <div className="text-sm text-ink-600 dark:text-ink-300 mt-1">{d.title}</div>
          <div className="text-xs text-ink-400 mt-0.5">{d.discipline} · {d.area}</div>
        </li>
      ))}
    </ul>
  )
}

function TransmittalsTab({ doc }: { doc: Doc }) {
  return (
    <ul className="space-y-2">
      {doc.transmittals.map(t => (
        <li key={t.id} className="card p-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono text-sm font-semibold">{t.id}</span>
            <span className={`chip ${t.status === 'Acknowledged' ? 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30' : 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30'}`}>{t.status}</span>
          </div>
          <div className="text-sm mt-1.5">{t.direction} → {t.to}</div>
          <div className="text-xs text-ink-400 mt-0.5">{formatDate(t.date)} · Revisions: {t.revisions.join(', ')}</div>
        </li>
      ))}
    </ul>
  )
}
