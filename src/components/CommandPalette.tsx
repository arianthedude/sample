import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { documents, projects, users } from '@/data/mock'

const commands = [
  { kind: 'Page', label: 'Dashboard', to: '/', hint: 'Overview' },
  { kind: 'Page', label: 'Engineering', to: '/engineering', hint: 'Cross-project' },
  { kind: 'Page', label: 'Projects', to: '/projects', hint: 'All projects' },
  { kind: 'Page', label: 'Document Register', to: '/documents', hint: 'Browse' },
  { kind: 'Page', label: 'Upload Document', to: '/documents/upload', hint: 'New upload' },
  { kind: 'Page', label: 'Workflow Board', to: '/workflow/reviews', hint: 'Kanban' },
  { kind: 'Page', label: 'Material Take-Off', to: '/mto', hint: 'MTO' },
  { kind: 'Page', label: 'Admin — Users', to: '/admin/users', hint: 'Super-admin' },
  { kind: 'Page', label: 'Admin — VDR Coding', to: '/admin/document-coding', hint: 'Formats' },
  { kind: 'Page', label: 'Settings', to: '/settings', hint: 'Preferences' },
]

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const results = useMemo(() => {
    const ql = q.toLowerCase()
    const pages = commands.filter(c => c.label.toLowerCase().includes(ql) || c.kind.toLowerCase().includes(ql))
    const docs = ql ? documents.filter(d => d.number.toLowerCase().includes(ql) || d.title.toLowerCase().includes(ql)).slice(0, 6) : []
    const projs = ql ? projects.filter(p => p.name.toLowerCase().includes(ql) || p.code.toLowerCase().includes(ql)).slice(0, 4) : []
    const usrs = ql ? users.filter(u => u.name.toLowerCase().includes(ql) || u.role.toLowerCase().includes(ql)).slice(0, 4) : []
    return { pages, docs, projs, usrs }
  }, [q])

  useEffect(() => {
    if (!open) return setQ('')
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const go = (to: string) => { onClose(); nav(to) }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl glass rounded-2xl shadow-pop animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-200/70 dark:border-ink-700/70">
          <Icon.Search size={18} className="text-ink-400" />
          <input
            autoFocus value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search documents, projects, people, or jump to a page…"
            className="flex-1 bg-transparent outline-none text-sm text-ink-800 dark:text-ink-100 placeholder:text-ink-400"
          />
          <kbd className="kbd">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.pages.length > 0 && (
            <Section title="Pages">
              {results.pages.map((c, i) => (
                <button key={i} onClick={() => go(c.to)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 text-left">
                  <span className="flex items-center gap-2.5 text-sm text-ink-700 dark:text-ink-200"><Icon.ArrowRight size={14} className="text-ink-400" />{c.label}</span>
                  <span className="text-xs text-ink-400">{c.hint}</span>
                </button>
              ))}
            </Section>
          )}
          {results.docs.length > 0 && (
            <Section title="Documents">
              {results.docs.map(d => (
                <button key={d.id} onClick={() => go(`/documents?selected=${d.id}`)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 text-left">
                  <span className="flex items-center gap-2.5"><Icon.Doc size={14} className="text-ink-400" /><span className="font-mono text-[13px] text-ink-700 dark:text-ink-200">{d.number}</span><span className="text-xs text-ink-400 truncate">{d.title}</span></span>
                </button>
              ))}
            </Section>
          )}
          {results.projs.length > 0 && (
            <Section title="Projects">
              {results.projs.map(p => (
                <button key={p.id} onClick={() => go(`/projects/${p.id}`)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 text-left">
                  <span className="flex items-center gap-2.5"><Icon.Folder size={14} className="text-ink-400" /><span className="text-sm text-ink-700 dark:text-ink-200">{p.name}</span></span>
                  <span className="font-mono text-xs text-ink-400">{p.code}</span>
                </button>
              ))}
            </Section>
          )}
          {results.usrs.length > 0 && (
            <Section title="People">
              {results.usrs.map(u => (
                <button key={u.id} onClick={() => go('/admin/users')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 text-left">
                  <span className="flex items-center gap-2.5"><span className="w-6 h-6 rounded-full text-white text-[10px] font-medium flex items-center justify-center" style={{ background: u.color }}>{u.initials}</span><span className="text-sm text-ink-700 dark:text-ink-200">{u.name}</span></span>
                  <span className="text-xs text-ink-400">{u.role}</span>
                </button>
              ))}
            </Section>
          )}
          {!q && <div className="px-3 py-6 text-center text-xs text-ink-400">Start typing to search across documents, projects, and people.</div>}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{title}</div>
      {children}
    </div>
  )
}
