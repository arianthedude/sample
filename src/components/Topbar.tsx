import { useState } from 'react'
import { Icon } from './Icon'
import { useThemeCtx } from './ThemeProvider'
import { notifications, users } from '@/data/mock'
import { Avatar } from './ui'

export function Topbar({ onMenu, onCommand }: { onMenu: () => void; onCommand: () => void }) {
  const { theme, toggle } = useThemeCtx()
  const [bellOpen, setBellOpen] = useState(false)
  const [profOpen, setProfOpen] = useState(false)
  const unread = notifications.filter(n => !n.read).length
  const me = users[0]

  return (
    <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 flex items-center gap-3 glass border-b border-ink-200/70 dark:border-ink-700/70">
      <button onClick={onMenu} className="btn-ghost p-2 lg:hidden" aria-label="Menu"><Icon.Menu /></button>

      <button onClick={onCommand} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white/60 dark:bg-ink-800/60 text-sm text-ink-400 hover:border-primary-400 hover:text-primary-600 transition w-80">
        <Icon.Search size={16} />
        <span className="flex-1 text-left">Search documents, projects…</span>
        <kbd className="kbd">⌘K</kbd>
      </button>

      <div className="flex-1" />

      <button onClick={onCommand} className="btn-ghost p-2 md:hidden" aria-label="Search"><Icon.Search /></button>

      <button onClick={toggle} className="btn-ghost p-2" aria-label="Toggle theme">
        {theme === 'dark' ? <Icon.Sun size={18} /> : <Icon.Moon size={18} />}
      </button>

      <div className="relative">
        <button onClick={() => setBellOpen(o => !o)} className="btn-ghost p-2 relative" aria-label="Notifications">
          <Icon.Bell size={18} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-ink-900" />}
        </button>
        {bellOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setBellOpen(false)} />
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass rounded-2xl shadow-pop z-20 animate-slide-up overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-ink-200/70 dark:border-ink-700/70">
                <span className="text-sm font-semibold">Notifications</span>
                <span className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30">{unread} new</span>
              </div>
              <div className="max-h-96 overflow-y-auto divide-rows">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 ${n.read ? '' : 'bg-primary-50/40 dark:bg-primary-500/5'}`}>
                    <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.kind === 'success' ? 'bg-success-500' : n.kind === 'warning' ? 'bg-warning-500' : n.kind === 'danger' ? 'bg-danger-500' : 'bg-primary-500'}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-ink-700 dark:text-ink-200 leading-snug">{n.text}</p>
                      <p className="text-xs text-ink-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full px-4 py-2.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-ink-100 dark:hover:bg-ink-800 border-t border-ink-200/70 dark:border-ink-700/70">Mark all as read</button>
            </div>
          </>
        )}
      </div>

      <div className="relative">
        <button onClick={() => setProfOpen(o => !o)} className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition">
          <Avatar name={me.name} color={me.color} size={30} />
          <div className="hidden sm:block text-left leading-tight">
            <div className="text-sm font-medium text-ink-800 dark:text-ink-100">{me.name}</div>
            <div className="text-[11px] text-ink-400">{me.role}</div>
          </div>
          <Icon.ChevronDown size={14} className="text-ink-400 hidden sm:block" />
        </button>
        {profOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setProfOpen(false)} />
            <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-pop z-20 animate-slide-up p-1.5">
              <div className="px-3 py-2 border-b border-ink-200/70 dark:border-ink-700/70 mb-1">
                <div className="text-sm font-medium">{me.name}</div>
                <div className="text-xs text-ink-400">{me.email}</div>
              </div>
              {['My profile', 'My tasks', 'Preferences', 'Help & support'].map(i => (
                <button key={i} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-700 dark:text-ink-200">{i}</button>
              ))}
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-danger-50 dark:hover:bg-danger-500/10 text-danger-600 dark:text-danger-400 border-t border-ink-200/70 dark:border-ink-700/70 mt-1">Sign out</button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
