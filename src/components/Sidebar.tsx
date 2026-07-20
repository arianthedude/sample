import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from './Icon'
import { useState } from 'react'

type Item = { to?: string; label: string; icon?: React.ReactNode; children?: { to: string; label: string }[]; end?: boolean }

const nav: Item[] = [
  { to: '/', label: 'Dashboard', icon: <Icon.Dashboard />, end: true },
  {
    label: 'Projects', icon: <Icon.Folder />, children: [
      { to: '/projects', label: 'Project List' },
      { to: '/projects/new', label: 'Create Project' },
    ],
  },
  {
    label: 'Documents', icon: <Icon.Doc />, children: [
      { to: '/documents', label: 'Document Register' },
      { to: '/documents/upload', label: 'Upload Document' },
      { to: '/documents/revisions', label: 'Revisions' },
      { to: '/documents/transmittals', label: 'Transmittals' },
    ],
  },
  {
    label: 'Workflow', icon: <Icon.Flow />, children: [
      { to: '/workflow/reviews', label: 'Reviews' },
      { to: '/workflow/approvals', label: 'Approvals' },
      { to: '/workflow/tasks', label: 'My Tasks' },
    ],
  },
  {
    label: 'MTO', icon: <Icon.Layers />, children: [
      { to: '/mto', label: 'Material Take-Off' },
      { to: '/mto/generate', label: 'Generate MTO' },
      { to: '/mto/compare', label: 'Compare Revisions' },
    ],
  },
  { to: '/search', label: 'Search', icon: <Icon.Search />, end: true },
  { to: '/reports', label: 'Reports', icon: <Icon.Report />, end: true },
  { to: '/users', label: 'Users', icon: <Icon.Users />, end: true },
  { to: '/roles', label: 'Roles & Permissions', icon: <Icon.Shield />, end: true },
  { to: '/audit', label: 'Audit Logs', icon: <Icon.Audit />, end: true },
  { to: '/settings', label: 'Settings', icon: <Icon.Settings />, end: true },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const loc = useLocation()
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink-950/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:static z-40 inset-y-0 left-0 w-72 shrink-0 border-r border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 flex flex-col transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Primary"
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-ink-200 dark:border-ink-800">
          <span className="text-primary-600 dark:text-primary-400"><Icon.Logo size={28} /></span>
          <div className="leading-tight">
            <div className="font-semibold text-ink-900 dark:text-ink-50 tracking-tight">Stratum</div>
            <div className="text-[11px] text-ink-400 font-medium tracking-wide uppercase">EDMS</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {nav.map((item) => (
            <NavGroup key={item.label} item={item} loc={loc.pathname} />
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-ink-200 dark:border-ink-800">
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-3.5 text-white">
            <div className="text-xs font-semibold opacity-90">Storage</div>
            <div className="mt-1.5 h-1.5 rounded-full bg-white/30 overflow-hidden">
              <div className="h-full w-[68%] bg-white rounded-full" />
            </div>
            <div className="mt-1.5 text-[11px] opacity-80">684 GB of 1 TB used</div>
          </div>
        </div>
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
        <div className="ml-5 pl-3 border-l border-ink-200 dark:border-ink-800 mt-0.5 space-y-0.5">
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
