import type { DocStatus, Doc, WorkflowStage } from '@/data/types'

export const statusColor: Record<DocStatus, string> = {
  'Draft': 'bg-ink-100 text-ink-600 border-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:border-ink-700',
  'For Review': 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/10 dark:text-warning-300 dark:border-warning-500/30',
  'Reviewed': 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30',
  'For Approval': 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30',
  'Approved': 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30',
  'Rejected': 'bg-danger-50 text-danger-700 border-danger-200 dark:bg-danger-500/10 dark:text-danger-300 dark:border-danger-500/30',
  'Issued For Construction': 'bg-success-50 text-success-700 border-success-200 dark:bg-success-500/10 dark:text-success-300 dark:border-success-500/30',
  'Superseded': 'bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700',
}

export const stageDot: Record<DocStatus, string> = {
  'Draft': 'bg-ink-400',
  'For Review': 'bg-warning-500',
  'Reviewed': 'bg-primary-500',
  'For Approval': 'bg-primary-500',
  'Approved': 'bg-success-500',
  'Rejected': 'bg-danger-500',
  'Issued For Construction': 'bg-success-500',
  'Superseded': 'bg-ink-400',
}

export function statusBadge(status: DocStatus) {
  return `chip ${statusColor[status]}`
}

export const priorityColor: Record<string, string> = {
  Low: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  Medium: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300',
  High: 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-300',
  Critical: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-300',
}

export function initials(name: string) {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('')
}

export function userColor(name: string, users: { name: string; color: string }[]) {
  return users.find(u => u.name === name)?.color || '#64748b'
}

export function formatDate(d: string) {
  if (!d) return '—'
  const date = new Date(d)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function relativeDate(d: string) {
  const date = new Date(d)
  const diff = Math.round((date.getTime() - Date.now()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff < 0) return `${Math.abs(diff)}d overdue`
  return `In ${diff}d`
}

export function sum<T>(arr: T[], fn: (t: T) => number) {
  return arr.reduce((a, t) => a + fn(t), 0)
}

export function groupBy<T, K extends string>(arr: T[], key: (t: T) => K) {
  return arr.reduce((acc, item) => {
    const k = key(item)
    ;(acc[k] ||= []).push(item)
    return acc
  }, {} as Record<K, T[]>)
}

export const workflowOrder: WorkflowStage[] = [
  'Draft', 'Internal Review', 'Lead Review', 'Client Review', 'Approved', 'Issued For Construction', 'As Built', 'Superseded',
]

export function stageProgress(stage: WorkflowStage) {
  const idx = workflowOrder.indexOf(stage)
  if (stage === 'Superseded') return 100
  if (stage === 'As Built') return 100
  return Math.round((idx / (workflowOrder.length - 2)) * 100)
}

export function docStatusToKanban(d: Doc): Doc['status'] {
  return d.status
}
