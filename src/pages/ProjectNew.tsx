import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'

export default function ProjectNew() {
  return (
    <div>
      <PageHeader title="Create Project" subtitle="Register a new engineering project"
        breadcrumbs={[{ label: 'Home' }, { label: 'Projects' }, { label: 'New' }]} />
      <div className="card p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Project code"><input className="input font-mono" placeholder="PRJ-2025-042" /></Field>
          <Field label="Project name"><input className="input" placeholder="Greenfield processing plant" /></Field>
          <Field label="Client"><input className="input" placeholder="Client name" /></Field>
          <Field label="Location"><input className="input" placeholder="City, Country" /></Field>
          <Field label="Start date"><input type="date" className="input" /></Field>
          <Field label="Due date"><input type="date" className="input" /></Field>
          <Field label="Budget (USD)"><input type="number" className="input" placeholder="500000000" /></Field>
          <Field label="Status"><select className="input"><option>Planning</option><option>Active</option><option>On Hold</option></select></Field>
          <Field label="Description" full><textarea className="input h-24 resize-none" placeholder="Project scope and objectives…" /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="btn-outline">Cancel</button>
          <button className="btn-primary"><Icon.Check size={16} />Create project</button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <div className={full ? 'md:col-span-2' : ''}><label className="text-xs font-medium text-ink-500 mb-1 block">{label}</label>{children}</div>
}
