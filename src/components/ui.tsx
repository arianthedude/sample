import { useEffect } from 'react'
import { Icon } from './Icon'

export function Modal({ open, onClose, title, children, footer, size = 'md' }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  const w = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }[size]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${w} glass rounded-2xl shadow-pop animate-scale-in`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200/70 dark:border-ink-700/70">
          <h3 className="text-base font-semibold text-ink-800 dark:text-ink-100">{title}</h3>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg" aria-label="Close"><Icon.Close size={18}/></button>
        </div>
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 py-3 border-t border-ink-200/70 dark:border-ink-700/70">{footer}</div>}
      </div>
    </div>
  )
}

export function Avatar({ name, color, size = 28 }: { name: string; color?: string; size?: number }) {
  const init = name.split(' ').map(p => p[0]).slice(0, 2).join('')
  return (
    <div className="inline-flex items-center justify-center rounded-full text-white font-medium shrink-0"
      style={{ width: size, height: size, background: color || '#64748b', fontSize: size * 0.36 }}>
      {init}
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon.ChevronRight size={14} className="text-ink-300 dark:text-ink-600" />}
          <span className={i === items.length - 1 ? 'text-ink-800 dark:text-ink-100 font-medium' : 'hover:text-ink-700 dark:hover:text-ink-200 cursor-pointer'}>{it.label}</span>
        </span>
      ))}
    </nav>
  )
}

export function PageHeader({ title, subtitle, breadcrumbs, actions }: { title: string; subtitle?: string; breadcrumbs?: { label: string; to?: string }[]; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        {breadcrumbs && <div className="mb-2"><Breadcrumbs items={breadcrumbs} /></div>}
        <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}

export function EmptyState({ title, hint, icon }: { title: string; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-ink-400 mb-3">{icon || <Icon.Doc />}</div>
      <p className="text-sm font-medium text-ink-700 dark:text-ink-200">{title}</p>
      {hint && <p className="text-xs text-ink-400 mt-1">{hint}</p>}
    </div>
  )
}

export function Progress({ value, color = 'primary' }: { value: number; color?: 'primary' | 'success' | 'warning' | 'danger' }) {
  const c = { primary: 'bg-primary-500', success: 'bg-success-500', warning: 'bg-warning-500', danger: 'bg-danger-500' }[color]
  return (
    <div className="h-1.5 w-full rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
      <div className={`h-full ${c} rounded-full transition-all`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}
