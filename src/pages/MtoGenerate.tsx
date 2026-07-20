import { Icon } from '@/components/Icon'
import { PageHeader } from '@/components/ui'

export default function MtoGenerate() {
  return (
    <div>
      <PageHeader title="Generate MTO" subtitle="Extract material quantities from approved isometric drawings"
        breadcrumbs={[{ label: 'Home' }, { label: 'MTO' }, { label: 'Generate' }]} />
      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 flex items-center justify-center"><Icon.Sparkle size={20} /></span>
          <div>
            <h3 className="text-base font-semibold">Auto-extraction</h3>
            <p className="text-xs text-ink-400">Parse line tables from selected isometric revisions</p>
          </div>
        </div>
        <div className="space-y-4">
          <div><label className="text-xs font-medium text-ink-500 mb-1 block">Source project</label><select className="input"><option>Northgate Refinery — Hydrocracker</option><option>Cascadia LNG Terminal</option></select></div>
          <div><label className="text-xs font-medium text-ink-500 mb-1 block">Source drawings</label><select className="input h-28" multiple>{Array.from({ length: 8 }).map((_, i) => <option key={i}>ISO-{1042 + i} Rev C</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-medium text-ink-500 mb-1 block">Target revision</label><input className="input font-mono" defaultValue="REV D" /></div>
            <div><label className="text-xs font-medium text-ink-500 mb-1 block">Group by</label><select className="input"><option>Line Number</option><option>Spool</option><option>Area</option></select></div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="btn-outline">Cancel</button>
          <button className="btn-primary"><Icon.Sparkle size={16} />Generate</button>
        </div>
      </div>
    </div>
  )
}
