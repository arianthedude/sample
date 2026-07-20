import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'
import { useThemeCtx } from '@/components/ThemeProvider'

export default function Settings() {
  const { theme, toggle } = useThemeCtx()
  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your workspace and preferences"
        breadcrumbs={[{ label: 'Home' }, { label: 'Settings' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Theme</div>
              <div className="text-xs text-ink-400">Switch between light and dark mode</div>
            </div>
            <button onClick={toggle} className="btn-outline">
              {theme === 'dark' ? <Icon.Sun size={16} /> : <Icon.Moon size={16} />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Document Defaults</h3>
          <div className="space-y-3">
            <Field label="Default discipline"><select className="input"><option>Piping</option><option>Process</option><option>Structural</option></select></Field>
            <Field label="Default workflow"><select className="input"><option>Standard IFR → IFA → IFC</option><option>Vendor document review</option></select></Field>
            <Field label="Revision scheme"><input className="input font-mono" defaultValue="A, B, C, D" /></Field>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Email on review assigned', 'Email on approval needed', 'Daily digest', 'Overdue alerts'].map(n => (
              <label key={n} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">{n}</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Integrations</h3>
          <div className="space-y-3">
            {['AutoCAD / Plant 3D', 'Revit', 'SmartPlant', 'SAP PM', 'Primavera P6'].map(i => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{i}</span>
                <button className="btn-outline text-xs py-1.5">Connect</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Numbering Scheme</h3>
          <div className="space-y-3">
            <Field label="Prefix pattern"><input className="input font-mono" defaultValue="{DISC}-{SEQ}" /></Field>
            <Field label="Sequence start"><input type="number" className="input" defaultValue={1000} /></Field>
            <Field label="Padding"><input type="number" className="input" defaultValue={4} /></Field>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <button className="btn-outline text-danger-600 dark:text-danger-400 w-full justify-start">Archive workspace</button>
            <button className="btn-danger w-full justify-start">Delete all data</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-medium text-ink-500 mb-1 block">{label}</label>{children}</div>
}
