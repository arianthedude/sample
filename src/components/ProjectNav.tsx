import { NavLink, useParams } from 'react-router-dom'
import { projects } from '@/data/mock'

const tabs = [
  { to: '', label: 'Overview', end: true },
  { to: 'configuration', label: 'Configuration' },
  { to: 'teams', label: 'Teams' },
  { to: 'workflows', label: 'Workflows' },
  { to: 'vdr', label: 'VDR' },
  { to: 'engineering', label: 'Engineering' },
]

export function ProjectNav() {
  const { id = projects[0].id } = useParams()
  const base = `/projects/${id}`

  return (
    <nav className="flex gap-1 overflow-x-auto no-scrollbar mb-5 border-b border-ink-200 dark:border-ink-800 pb-px">
      {tabs.map(t => (
        <NavLink
          key={t.to}
          to={t.to ? `${base}/${t.to}` : base}
          end={t.end}
          className={({ isActive }) =>
            `px-3 py-2 text-sm whitespace-nowrap border-b-2 -mb-px transition ${
              isActive
                ? 'border-primary-500 text-primary-700 dark:text-primary-300 font-medium'
                : 'border-transparent text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
