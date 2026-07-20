import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from './Icon'
import { useState } from 'react'

type Item = { to?: string; label: string; icon?: React.ReactNode; children?: { to: string; label: string }[]; end?: boolean }

const nav: Item[] = [
  { to: '/', label: 'Dashboard', icon: <Icon.Dashboard />, end: true },
  { to: '/engineering', label: 'Engineering', icon: <Icon.Flow />, end: true },
  {
    label: 'Projects', icon: <Icon.Folder />, children: [
      { to: '/projects', label: 'All projects' },
      { to: '/projects/new', label: 'Create' },
    ],
  },
  {
    label: 'Documents', icon: <Icon.Doc />, children: [
      { to: '/documents', label: 'Register' },
      { to: '/documents/upload', label: 'Upload' },
      { to: '/documents/revisions', label: 'Revisions' },
      { to: '/documents/transmittals', label: 'Transmittals' },
    ],
  },
  {
    label: 'Workflow', icon: <Icon.GitBranch />, children: [
      { to: '/workflow/reviews', label: 'Reviews' },
      { to: '/workflow/approvals', label: 'Approvals' },
      { to: '/workflow/tasks', label: 'Tasks' },
    ],
  },
  {
    label: 'MTO', icon: <Icon.Layers />, children: [
      { to: '/mto', label: 'Take-off' },
      { to: '/mto/generate', label: 'Generate' },
      { to: '/mto/compare', label: 'Compare' },
    ],
  },
  { to: '/search', label: 'Search', icon: <Icon.Search />, end: true },
  {
    label: 'Admin', icon: <Icon.Shield />, children: [
      { to: '/admin/users', label: 'Users' },
      { to: '/admin/roles', label: 'Roles' },
      { to: '/admin/permissions', label: 'Permissions' },
      { to: '/admin/branches', label: 'Branches' },
      { to: '/admin/departments', label: 'Departments' },
      { to: '/admin/employers', label: 'Employers' },
      { to: '/admin/code-formats', label: 'Code formats' },
      { to: '/admin/document-coding', label: 'Doc coding' },
    ],
  },
  { to: '/audit', label: 'Audit', icon: <Icon.Audit />, end: true },
  { to: '/settings', label: 'Settings', icon: <Icon.Settings />, end: true },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const loc = useLocation()
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink-950/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:static z-40 inset-y-0 left-0 w-64 shrink-0 border-r border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 flex flex-col transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Primary"
      >
        <div className="flex items-center gap-2 px-4 h-14 border-b border-ink-200 dark:border-ink-800">
          <span className="text-primary-600 dark:text-primary-400"><Icon.Logo size={24} /></span>
          <div className="leading-tight">
            <div className="font-semibold text-sm text-ink-900 dark:text-ink-50">Stratum</div>
            <div className="text-[10px] text-ink-400 uppercase tracking-wider">Portal</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {nav.map((item) => (
            <NavGroup key={item.label} item={item} loc={loc.pathname} />
          ))}
        </nav>
      </aside>
    </>
  )
}

function NavGroup({ item, loc }: { item: Item; loc: string }) {
  const [open, setOpen] = useState(() =>
    item.children?.some(c => loc.startsWith(c.to)) ?? false,
  )
  if (item.to) {
    return (
      <NavLink to={item.to} end={item.end} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <span className="shrink-0">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    )
  }
  const active = item.children!.some(c => loc.startsWith(c.to))
  return (
    <div>
      <button onClick={() => setOpen(o => !o)} className={`nav-link w-full justify-between ${active ? 'text-ink-800 dark:text-ink-100' : ''}`}>
        <span className="flex items-center gap-3"><span className="shrink-0">{item.icon}</span><span>{item.label}</span></span>
        <Icon.ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-4 pl-2 border-l border-ink-200 dark:border-ink-800 mt-0.5 space-y-0.5">
          {item.children!.map(c => (
            <NavLink key={c.to} to={c.to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''} py-1.5 text-[13px]`}>
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
