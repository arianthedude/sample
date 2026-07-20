import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { roles } from '@/data/mock'

const PERMISSIONS = [
  'View documents', 'Upload documents', 'Revise documents', 'Approve documents',
  'Reject documents', 'Manage transmittals', 'Manage workflow', 'Configure projects',
  'Manage users', 'Manage roles', 'View audit log', 'Export data',
]

export default function Roles() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" subtitle={`${roles.length} roles configured`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Roles & Permissions' }]}
        actions={<button className="btn-primary"><Icon.Plus size={16} />New role</button>} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-3">
          {roles.map(r => (
            <div key={r.id} className="card p-4 hover:shadow-pop transition cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center"><Icon.Shield size={17} /></span>
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-ink-400">{r.users} users · {r.permissions} permissions</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-500 dark:text-ink-400 mt-2.5">{r.description}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 card p-5">
          <h3 className="text-base font-semibold mb-1">Administrator — Permissions Matrix</h3>
          <p className="text-xs text-ink-400 mb-4">Granular control over what each role can do</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[11px] font-semibold uppercase text-ink-400 border-b border-ink-200 dark:border-ink-800">
                  <th className="px-3 py-2.5 text-left">Permission</th>
                  {roles.map(r => <th key={r.id} className="px-3 py-2.5 text-center whitespace-nowrap">{r.name.split(' ')[0]}</th>)}
                </tr>
              </thead>
              <tbody className="divide-rows">
                {PERMISSIONS.map((p, i) => (
                  <tr key={p} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40">
                    <td className="px-3 py-2.5 text-sm">{p}</td>
                    {roles.map(r => {
                      const has = i < r.permissions / 4
                      return <td key={r.id} className="px-3 py-2.5 text-center">{has ? <span className="inline-flex w-5 h-5 rounded-md bg-success-100 dark:bg-success-500/20 text-success-700 dark:text-success-400 items-center justify-center"><Icon.Check size={13} /></span> : <span className="inline-block w-5 h-5" />}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
