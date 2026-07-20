import { useState, useMemo } from 'react'
import { Icon } from '@/components/Icon'
import { PageHeader, EmptyState } from '@/components/ui'
import { documents, projects, users } from '@/data/mock'
import { statusBadge, formatDate } from '@/lib/format'
import type { Doc } from '@/data/types'

export default function Search() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<{ discipline?: string; project?: string; vendor?: string; status?: string }>({})

  const results = useMemo(() => {
    const ql = q.toLowerCase()
    if (!ql && !Object.keys(filters).length) return []
    return documents.filter(d => {
      const matches = !ql || d.number.toLowerCase().includes(ql) || d.title.toLowerCase().includes(ql) || (d.vendor || '').toLowerCase().includes(ql) || d.tags.join(' ').toLowerCase().includes(ql) || d.area.toLowerCase().includes(ql) || d.system.toLowerCase().includes(ql)
      const fDisc = !filters.discipline || d.discipline === filters.discipline
      const fProj = !filters.project || d.projectId === filters.project
      const fVend = !filters.vendor || d.vendor === filters.vendor
      const fStat = !filters.status || d.status === filters.status
      return matches && fDisc && fProj && fVend && fStat
    })
  }, [q, filters])

  return (
    <div>
      <PageHeader title="Search" subtitle="Find documents by number, title, vendor, tag, project, discipline, revision, area, or system"
        breadcrumbs={[{ label: 'Home' }, { label: 'Search' }]} />

      <div className="card p-4 mb-5">
        <div className="relative">
          <Icon.Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search documents…"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-base focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none" />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-ink-400">Filter:</span>
          <select value={filters.discipline || ''} onChange={e => setFilters(f => ({ ...f, discipline: e.target.value || undefined }))} className="input w-auto py-1.5 text-sm">
            <option value="">All disciplines</option>
            {['Process', 'Piping', 'Structural', 'Mechanical', 'Electrical', 'Instrumentation', 'Civil', 'Pipeline'].map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={filters.project || ''} onChange={e => setFilters(f => ({ ...f, project: e.target.value || undefined }))} className="input w-auto py-1.5 text-sm">
            <option value="">All projects</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name.split('—')[0]}</option>)}
          </select>
          <select value={filters.status || ''} onChange={e => setFilters(f => ({ ...f, status: e.target.value || undefined }))} className="input w-auto py-1.5 text-sm">
            <option value="">All statuses</option>
            {['Draft', 'For Review', 'Reviewed', 'For Approval', 'Approved', 'Rejected', 'Issued For Construction', 'Superseded'].map(s => <option key={s}>{s}</option>)}
          </select>
          {(Object.keys(filters).length > 0 || q) && <button onClick={() => { setFilters({}); setQ('') }} className="btn-ghost text-sm text-danger-600">Clear</button>}
        </div>
      </div>

      {!q && !Object.keys(filters).length ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mx-auto mb-4"><Icon.Search size={28} /></div>
          <p className="text-base font-medium text-ink-700 dark:text-ink-200">Search across {documents.length} engineering documents</p>
          <p className="text-sm text-ink-400 mt-1">Try “PID-1002”, “isometric”, “Sulzer”, or “IFC”</p>
        </div>
      ) : results.length === 0 ? (
        <EmptyState title="No results found" hint="Try different keywords or clear filters" icon={<Icon.Search />} />
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-ink-400 mb-2">{results.length} results</div>
          {results.slice(0, 30).map(d => <ResultRow key={d.id} doc={d} q={q} />)}
        </div>
      )}
    </div>
  )
}

function ResultRow({ doc, q }: { doc: Doc; q: string }) {
  const proj = projects.find(p => p.id === doc.projectId)
  const u = users.find(x => x.name === doc.reviewer)
  return (
    <a href={`/documents?selected=${doc.id}`} className="card p-4 flex items-start gap-3 hover:shadow-pop hover:border-primary-300 dark:hover:border-primary-500/40 transition group">
      <span className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center shrink-0"><Icon.Doc size={18} /></span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-sm font-semibold text-primary-700 dark:text-primary-300">{doc.number}</span>
          <span className={`chip ${statusBadge(doc.status)}`}>{doc.status}</span>
          <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700 font-mono text-[10px]">Rev {doc.revision}</span>
          <span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30 text-[10px]">{doc.discipline}</span>
        </div>
        <p className="text-sm text-ink-700 dark:text-ink-200 mt-1">{doc.title}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-400 flex-wrap">
          <span>{proj?.name.split('—')[0]}</span>
          <span>· {doc.area} · {doc.system}</span>
          {doc.vendor && <span>· {doc.vendor}</span>}
          <span>· Updated {formatDate(doc.lastUpdated)}</span>
        </div>
      </div>
      {u && <span className="shrink-0"><span className="w-7 h-7 rounded-full text-white text-[10px] font-medium flex items-center justify-center" style={{ background: u.color }}>{u.initials}</span></span>}
    </a>
  )
}
