import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { PageHeader, Avatar, Modal, EmptyState } from '@/components/ui'
import { DocDrawer } from '@/components/DocDrawer'
import { documents, projects, users } from '@/data/mock'
import { statusBadge, priorityColor, formatDate } from '@/lib/format'
import type { Doc } from '@/data/types'

type ColumnKey =
  | 'number' | 'title' | 'project' | 'discipline' | 'system' | 'area' | 'vendor'
  | 'revision' | 'status' | 'workflowStage' | 'reviewer' | 'approver'
  | 'issueDate' | 'lastUpdated' | 'tags'

const COLUMNS: { key: ColumnKey; label: string; width: number; default: boolean }[] = [
  { key: 'number', label: 'Document Number', width: 150, default: true },
  { key: 'title', label: 'Title', width: 280, default: true },
  { key: 'project', label: 'Project', width: 180, default: true },
  { key: 'discipline', label: 'Discipline', width: 130, default: true },
  { key: 'system', label: 'System', width: 140, default: false },
  { key: 'area', label: 'Area', width: 120, default: true },
  { key: 'vendor', label: 'Vendor', width: 140, default: false },
  { key: 'revision', label: 'Revision', width: 90, default: true },
  { key: 'status', label: 'Status', width: 170, default: true },
  { key: 'workflowStage', label: 'Workflow Stage', width: 170, default: true },
  { key: 'reviewer', label: 'Current Reviewer', width: 160, default: true },
  { key: 'approver', label: 'Current Approver', width: 160, default: false },
  { key: 'issueDate', label: 'Issue Date', width: 130, default: true },
  { key: 'lastUpdated', label: 'Last Updated', width: 130, default: true },
  { key: 'tags', label: 'Tags', width: 180, default: false },
]

const PAGE_SIZES = [10, 25, 50, 100]

export default function Documents() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [activeCols, setActiveCols] = useState<Set<ColumnKey>>(new Set(COLUMNS.filter(c => c.default).map(c => c.key)))
  const [colMenu, setColMenu] = useState(false)
  const [filterOpen, setFilterOpen] = useState(true)
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: Filters }[]>([
    { name: 'My reviews', filters: { status: ['For Review'], reviewer: 'Sarah Chen' } },
    { name: 'IFC documents', filters: { status: ['Issued For Construction'] } },
    { name: 'Overdue approvals', filters: { status: ['For Approval'] } },
  ])
  const [savingFilter, setSavingFilter] = useState(false)
  const [drawerId, setDrawerId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<{ key: ColumnKey; dir: 'asc' | 'desc' }>({ key: 'lastUpdated', dir: 'desc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [filters, setFilters] = useState<Filters>({})

  type Filters = {
    status?: Doc['status'][]; discipline?: Doc['discipline'][]; project?: string[];
    reviewer?: string; approver?: string; vendor?: string; area?: string;
  }

  useEffect(() => {
    const sel = params.get('selected')
    if (sel) setDrawerId(sel)
  }, [params])

  const filtered = useMemo(() => {
    let r = documents.slice()
    const q = search.toLowerCase()
    if (q) r = r.filter(d => d.number.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || (d.vendor || '').toLowerCase().includes(q) || d.tags.join(' ').toLowerCase().includes(q))
    if (filters.status?.length) r = r.filter(d => filters.status!.includes(d.status))
    if (filters.discipline?.length) r = r.filter(d => filters.discipline!.includes(d.discipline))
    if (filters.project?.length) r = r.filter(d => filters.project!.includes(d.projectId))
    if (filters.reviewer) r = r.filter(d => d.reviewer === filters.reviewer)
    if (filters.approver) r = r.filter(d => d.approver === filters.approver)
    if (filters.vendor) r = r.filter(d => d.vendor === filters.vendor)
    if (filters.area) r = r.filter(d => d.area === filters.area)
    r.sort((a, b) => {
      const av = a[sort.key as unknown as keyof Doc] as unknown as string | string[] | number
      const bv = b[sort.key as unknown as keyof Doc] as unknown as string | string[] | number
      if (Array.isArray(av)) return sort.dir === 'asc' ? av.join().localeCompare((bv as string[]).join()) : (bv as string[]).join().localeCompare(av.join())
      if (av < bv) return sort.dir === 'asc' ? -1 : 1
      if (av > bv) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
    return r
  }, [search, filters, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)
  const visibleCols = COLUMNS.filter(c => activeCols.has(c.key))

  useEffect(() => { setPage(1) }, [search, filters, pageSize])
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [totalPages])

  const toggleSort = (key: ColumnKey) => setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })
  const toggleRow = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setSelected(s => s.size === pageItems.length ? new Set() : new Set(pageItems.map(d => d.id)))
  const applySaved = (f: Filters) => { setFilters(f); setSearch('') }

  return (
    <div>
      <PageHeader
        title="Document Register"
        subtitle={`${filtered.length} of ${documents.length} documents · ${projects.length} projects`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Documents' }, { label: 'Register' }]}
        actions={<>
          <button className="btn-outline"><Icon.Download size={16} />Export</button>
          <a href="/documents/upload" className="btn-primary"><Icon.Upload size={16} />Upload Document</a>
        </>}
      />

      {/* Toolbar */}
      <div className="card p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Icon.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search document number, title, vendor, tag…"
            className="input pl-9" aria-label="Global search" />
        </div>
        <button onClick={() => setFilterOpen(o => !o)} className={`btn-outline ${filterOpen ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-500/40 text-primary-700 dark:text-primary-300' : ''}`}>
          <Icon.Filter size={16} />Filters
        </button>
        <div className="relative">
          <button onClick={() => setColMenu(o => !o)} className="btn-outline"><Icon.Grid size={16} />Columns<Icon.ChevronDown size={14} /></button>
          {colMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setColMenu(false)} />
              <div className="absolute right-0 mt-2 w-60 glass rounded-xl shadow-pop z-20 p-1.5 animate-slide-up">
                <div className="px-2 py-1.5 text-[11px] font-semibold uppercase text-ink-400">Toggle columns</div>
                {COLUMNS.map(c => (
                  <label key={c.key} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 cursor-pointer">
                    <input type="checkbox" checked={activeCols.has(c.key)} onChange={() => setActiveCols(s => { const n = new Set(s); n.has(c.key) ? n.delete(c.key) : n.add(c.key); return n })} className="rounded" />
                    <span className="text-sm">{c.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
        <button onClick={() => setSavingFilter(true)} className="btn-ghost"><Icon.Tag size={16} />Save filter</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters */}
        {filterOpen && (
          <aside className="lg:w-64 shrink-0">
            <div className="card p-4 sticky top-20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => setFilters({})} className="text-xs text-ink-400 hover:text-danger-600">Clear all</button>
              </div>

              {savedFilters.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] font-semibold uppercase text-ink-400 mb-1.5">Saved</div>
                  <div className="flex flex-wrap gap-1.5">
                    {savedFilters.map(f => (
                      <button key={f.name} onClick={() => applySaved(f.filters)} className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30 hover:bg-primary-100">{f.name}</button>
                    ))}
                  </div>
                </div>
              )}

              <FilterSection label="Status">
                <div className="flex flex-wrap gap-1.5">
                  {(['Draft', 'For Review', 'Reviewed', 'For Approval', 'Approved', 'Rejected', 'Issued For Construction', 'Superseded'] as Doc['status'][]).map(s => (
                    <button key={s} onClick={() => setFilters(f => ({ ...f, status: toggleArr(f.status, s) }))}
                      className={`chip ${filters.status?.includes(s) ? statusBadge(s) : 'bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700'}`}>{s}</button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection label="Discipline">
                <div className="flex flex-wrap gap-1.5">
                  {(['Process', 'Piping', 'Structural', 'Mechanical', 'Electrical', 'Instrumentation', 'Civil', 'Pipeline'] as Doc['discipline'][]).map(s => (
                    <button key={s} onClick={() => setFilters(f => ({ ...f, discipline: toggleArr(f.discipline, s) }))}
                      className={`chip ${filters.discipline?.includes(s) ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30' : 'bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700'}`}>{s}</button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection label="Project">
                <select value={filters.project?.[0] || ''} onChange={e => setFilters(f => ({ ...f, project: e.target.value ? [e.target.value] : undefined }))} className="input">
                  <option value="">All projects</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </FilterSection>

              <FilterSection label="Reviewer">
                <select value={filters.reviewer || ''} onChange={e => setFilters(f => ({ ...f, reviewer: e.target.value || undefined }))} className="input">
                  <option value="">Any reviewer</option>
                  {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </FilterSection>

              <FilterSection label="Area">
                <select value={filters.area || ''} onChange={e => setFilters(f => ({ ...f, area: e.target.value || undefined }))} className="input">
                  <option value="">All areas</option>
                  {[...new Set(documents.map(d => d.area))].sort().map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </FilterSection>
            </div>
          </aside>
        )}

        {/* Table */}
        <div className="flex-1 min-w-0">
          {selected.size > 0 && (
            <div className="card p-3 mb-3 flex items-center gap-2 animate-slide-up">
              <span className="text-sm font-medium">{selected.size} selected</span>
              <div className="h-5 w-px bg-ink-200 dark:bg-ink-700 mx-1" />
              <button className="btn-ghost text-sm"><Icon.Check size={15} />Approve</button>
              <button className="btn-ghost text-sm"><Icon.Send size={15} />Transmit</button>
              <button className="btn-ghost text-sm"><Icon.Download size={15} />Download</button>
              <button className="btn-ghost text-sm text-danger-600"><Icon.Close size={15} />Reject</button>
              <button onClick={() => setSelected(new Set())} className="ml-auto btn-ghost text-sm">Clear</button>
            </div>
          )}

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-ink-50/80 dark:bg-ink-800/50 sticky top-0 z-10">
                    <th className="sticky left-0 z-20 bg-ink-50/80 dark:bg-ink-800/50 px-3 py-2.5 w-10">
                      <input type="checkbox" checked={selected.size === pageItems.length && pageItems.length > 0} onChange={toggleAll} aria-label="Select all" className="rounded" />
                    </th>
                    {visibleCols.map(c => (
                      <th key={c.key} style={{ minWidth: c.width }} className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400 whitespace-nowrap">
                        <button onClick={() => toggleSort(c.key)} className="flex items-center gap-1 hover:text-ink-800 dark:hover:text-ink-100">
                          {c.label}
                          {sort.key === c.key && <Icon.Sort size={12} className={sort.dir === 'desc' ? 'rotate-180' : ''} />}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-rows">
                  {pageItems.map(d => {
                    const proj = projects.find(p => p.id === d.projectId)
                    return (
                      <tr key={d.id} onClick={() => setDrawerId(d.id)} className={`hover:bg-primary-50/40 dark:hover:bg-primary-500/5 cursor-pointer transition ${selected.has(d.id) ? 'bg-primary-50/60 dark:bg-primary-500/10' : ''}`}>
                        <td onClick={e => { e.stopPropagation(); toggleRow(d.id) }} className="sticky left-0 bg-white dark:bg-ink-900 px-3 py-2.5 hover:bg-primary-50/60 dark:hover:bg-primary-500/10">
                          <input type="checkbox" checked={selected.has(d.id)} onChange={() => toggleRow(d.id)} aria-label="Select row" className="rounded" />
                        </td>
                        {visibleCols.map(c => (
                          <td key={c.key} className="px-4 py-2.5 text-sm whitespace-nowrap">
                            <Cell doc={d} col={c.key} proj={proj} />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {pageItems.length === 0 && <EmptyState title="No documents match your filters" hint="Try clearing filters or adjusting search" icon={<Icon.Search />} />}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <span>Rows per page</span>
              <select value={pageSize} onChange={e => setPageSize(+e.target.value)} className="input w-auto py-1 pr-7 text-sm">
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="ml-2">Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-ghost p-2 disabled:opacity-40"><Icon.ChevronLeft size={16} /></button>
              <span className="px-3 text-sm tabular-nums">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn-ghost p-2 disabled:opacity-40"><Icon.ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <DocDrawer docId={drawerId} onClose={() => { setDrawerId(null); setParams(p => { p.delete('selected'); return p }, { replace: true }) }} />

      <Modal open={savingFilter} onClose={() => setSavingFilter(false)} title="Save current filter"
        footer={<><button onClick={() => setSavingFilter(false)} className="btn-outline">Cancel</button><button onClick={() => { setSavedFilters(s => [...s, { name: `Filter ${s.length + 1}`, filters }]); setSavingFilter(false) }} className="btn-primary">Save</button></>}>
        <p className="text-sm text-ink-500 mb-3">Save the current filter set for quick access later.</p>
        <label className="text-xs font-medium text-ink-500">Filter name</label>
        <input className="input mt-1" placeholder="e.g. Critical piping reviews" />
      </Modal>
    </div>
  )
}

function toggleArr<T>(arr: T[] | undefined, v: T): T[] {
  if (!arr) return [v]
  return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-semibold uppercase text-ink-400 mb-1.5">{label}</div>
      {children}
    </div>
  )
}

function Cell({ doc, col, proj }: { doc: Doc; col: ColumnKey; proj: any }) {
  switch (col) {
    case 'number': return <span className="font-mono font-medium text-primary-700 dark:text-primary-300">{doc.number}</span>
    case 'title': return <span className="text-ink-700 dark:text-ink-200 truncate block max-w-[260px]">{doc.title}</span>
    case 'project': return <span className="text-ink-600 dark:text-ink-300 truncate block max-w-[170px]">{proj?.name.split('—')[0]}</span>
    case 'discipline': return <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700">{doc.discipline}</span>
    case 'system': return <span className="text-ink-600 dark:text-ink-300">{doc.system}</span>
    case 'area': return <span className="text-ink-600 dark:text-ink-300">{doc.area}</span>
    case 'vendor': return <span className="text-ink-600 dark:text-ink-300">{doc.vendor || '—'}</span>
    case 'revision': return <span className="chip bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700 font-mono">{doc.revision}</span>
    case 'status': return <span className={`chip ${statusBadge(doc.status)}`}>{doc.status}</span>
    case 'workflowStage': return <span className="text-ink-600 dark:text-ink-300">{doc.workflowStage}</span>
    case 'reviewer': return <UserCell name={doc.reviewer} />
    case 'approver': return <UserCell name={doc.approver} />
    case 'issueDate': return <span className="text-ink-500 dark:text-ink-400 tabular-nums">{formatDate(doc.issueDate)}</span>
    case 'lastUpdated': return <span className="text-ink-500 dark:text-ink-400 tabular-nums">{formatDate(doc.lastUpdated)}</span>
    case 'tags': return <div className="flex gap-1 flex-wrap">{doc.tags.slice(0, 2).map(t => <span key={t} className="chip bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700 text-[10px]">{t}</span>)}</div>
  }
}

function UserCell({ name }: { name: string }) {
  const u = users.find(x => x.name === name)
  return (
    <div className="flex items-center gap-2">
      {u && <Avatar name={u.name} color={u.color} size={22} />}
      <span className="text-ink-600 dark:text-ink-300 truncate">{name}</span>
    </div>
  )
}
