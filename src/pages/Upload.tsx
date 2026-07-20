import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { PageHeader, Progress } from '@/components/ui'
import { projects, users } from '@/data/mock'

export default function Upload() {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<{ name: string; size: string }[]>([])
  const nav = useNavigate()

  const steps = [
    { n: 1, label: 'Files', icon: <Icon.Upload size={16} /> },
    { n: 2, label: 'Metadata', icon: <Icon.Doc size={16} /> },
    { n: 3, label: 'Workflow', icon: <Icon.Flow size={16} /> },
  ]

  return (
    <div>
      <PageHeader
        title="Upload Document"
        subtitle="Add engineering documents to the register and route them through review"
        breadcrumbs={[{ label: 'Home' }, { label: 'Documents' }, { label: 'Upload' }]}
      />

      {/* Stepper */}
      <div className="card p-5 mb-5">
        <ol className="flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <li key={s.n} className="flex items-center gap-2 sm:gap-4 flex-1">
              <button onClick={() => s.n < step && setStep(s.n)} className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${step > s.n ? 'bg-success-500 text-white' : step === s.n ? 'bg-primary-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-400'}`}>
                  {step > s.n ? <Icon.Check size={16} /> : s.icon}
                </span>
                <div className="hidden sm:block text-left">
                  <div className="text-[11px] text-ink-400">Step {s.n}</div>
                  <div className={`text-sm font-medium ${step >= s.n ? 'text-ink-800 dark:text-ink-100' : 'text-ink-400'}`}>{s.label}</div>
                </div>
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${step > s.n ? 'bg-success-500' : 'bg-ink-200 dark:bg-ink-800'}`} />}
            </li>
          ))}
        </ol>
      </div>

      <div className="card p-6">
        {step === 1 && (
          <div>
            <label className="block border-2 border-dashed border-ink-200 dark:border-ink-700 rounded-2xl p-10 text-center hover:border-primary-400 hover:bg-primary-50/30 dark:hover:bg-primary-500/5 transition cursor-pointer">
              <input type="file" multiple className="hidden" onChange={e => {
                const f = Array.from(e.target.files || []).map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }))
                setFiles(prev => [...prev, ...f])
              }} />
              <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mx-auto mb-3"><Icon.Upload size={26} /></div>
              <p className="text-sm font-medium text-ink-700 dark:text-ink-200">Drag and drop engineering files here</p>
              <p className="text-xs text-ink-400 mt-1">PDF, DWG, DXF, RVT, XLSX up to 200 MB each</p>
            </label>

            {files.length > 0 && (
              <ul className="mt-5 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800">
                    <span className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center"><Icon.Doc size={16} /></span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{f.name}</div>
                      <div className="text-xs text-ink-400">{f.size}</div>
                    </div>
                    <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="btn-ghost p-1.5"><Icon.Close size={15} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Project"><select className="input">{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></Field>
            <Field label="Discipline"><select className="input">{['Process', 'Piping', 'Structural', 'Mechanical', 'Electrical', 'Instrumentation', 'Civil', 'Pipeline'].map(d => <option key={d}>{d}</option>)}</select></Field>
            <Field label="Area"><input className="input" placeholder="Unit 100" /></Field>
            <Field label="System"><input className="input" placeholder="Process Gas" /></Field>
            <Field label="Vendor"><input className="input" placeholder="Sulzer Pumps" /></Field>
            <Field label="Document Type"><select className="input">{['P&ID', 'Isometric', 'GA', 'Data Sheet', 'Calculation', 'Specification'].map(t => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Title" full><input className="input" placeholder="Process Flow Diagram — Unit 200" /></Field>
            <Field label="Document Number"><input className="input font-mono" placeholder="PID-1010" /></Field>
            <Field label="Revision"><input className="input font-mono" placeholder="REV A" /></Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold mb-2">Workflow Template</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Standard IFR → IFA → IFC', stages: ['Internal Review', 'Lead Review', 'Client Review', 'Approved', 'IFC'] },
                  { name: 'Vendor document review', stages: ['Vendor Review', 'Lead Review', 'Approved'] },
                  { name: 'As-built verification', stages: ['Field Check', 'Lead Review', 'As Built'] },
                ].map((t, i) => (
                  <button key={i} className="card p-4 text-left hover:border-primary-400 hover:shadow-pop transition">
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {t.stages.map(s => <span key={s} className="chip bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30 text-[10px]">{s}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Assign Reviewers</h3>
                <div className="space-y-2">
                  {users.slice(0, 4).map(u => (
                    <label key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="w-7 h-7 rounded-full text-white text-[10px] font-medium flex items-center justify-center" style={{ background: u.color }}>{u.initials}</span>
                      <div><div className="text-sm font-medium">{u.name}</div><div className="text-xs text-ink-400">{u.role}</div></div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Assign Approvers</h3>
                <div className="space-y-2">
                  {users.slice(2, 6).map(u => (
                    <label key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="w-7 h-7 rounded-full text-white text-[10px] font-medium flex items-center justify-center" style={{ background: u.color }}>{u.initials}</span>
                      <div><div className="text-sm font-medium">{u.name}</div><div className="text-xs text-ink-400">{u.role}</div></div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Reviewer due date"><input type="date" className="input" /></Field>
              <Field label="Approver due date"><input type="date" className="input" /></Field>
              <Field label="Notify on"><select className="input"><option>Upload + review + approval</option><option>Upload only</option><option>None</option></select></Field>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-ink-200 dark:border-ink-800">
          <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="btn-outline disabled:opacity-40"><Icon.ArrowLeft size={16} />Back</button>
          {step < 3 ? (
            <button onClick={() => setStep(s => s + 1)} className="btn-primary">Continue<Icon.ArrowRight size={16} /></button>
          ) : (
            <button onClick={() => nav('/documents')} className="btn-primary"><Icon.Check size={16} />Submit for Review</button>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="text-xs font-medium text-ink-500 mb-1 block">{label}</label>
      {children}
    </div>
  )
}
