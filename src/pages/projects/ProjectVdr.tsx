import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { ProjectNav } from '@/components/ProjectNav'
import { PageHeader, DataTable } from '@/components/ui'
import { projects, vdrTemplates, vdrFiles, vdrRows } from '@/data/mock'
import { statusColor } from '@/lib/format'
import type { DocStatus } from '@/data/types'

export default function ProjectVdr() {
  const { id } = useParams()
  const p = projects.find(x => x.id === id) ?? projects[0]
  const templates = vdrTemplates.filter(t => t.projectId === p.id)
  const files = vdrFiles.filter(f => f.projectId === p.id)
  const [selectedFile, setSelectedFile] = useState(files[0]?.id ?? '')
  const rows = vdrRows.filter(r => r.fileId === selectedFile)

  return (
    <div>
      <PageHeader title={p.name} subtitle="VDR templates & files"
        breadcrumbs={[{ label: 'Projects', to: '/projects' }, { label: p.code }]}
        actions={<button className="btn-outline"><Icon.Upload size={16} />Import Excel</button>} />
      <ProjectNav />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <h3 className="text-sm font-medium mb-3">Templates</h3>
          <ul className="space-y-2">
            {templates.map(t => (
              <li key={t.id} className="flex items-center justify-between text-sm py-1.5">
                <span>{t.name}</span>
                <span className="text-xs text-ink-400 font-mono">{t.sheetName} · {t.columnCount} cols</span>
              </li>
            ))}
            {!templates.length && <li className="text-sm text-ink-400">No templates</li>}
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-medium mb-3">Files</h3>
          <ul className="space-y-1">
            {files.map(f => (
              <li key={f.id}>
                <button
                  onClick={() => setSelectedFile(f.id)}
                  className={`w-full flex items-center justify-between text-sm py-1.5 px-2 rounded-lg text-left transition ${selectedFile === f.id ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300' : 'hover:bg-ink-50 dark:hover:bg-ink-800'}`}
                >
                  <span className="truncate">{f.fileName}</span>
                  <span className="text-xs text-ink-400 shrink-0 ml-2">v{f.version}</span>
                </button>
              </li>
            ))}
            {!files.length && <li className="text-sm text-ink-400">No VDR files</li>}
          </ul>
        </div>
      </div>

      {selectedFile && (
        <div className="card">
          <DataTable
            columns={[
              { key: 'rowOrder', label: '#', className: 'tabular-nums text-ink-400 w-10' },
              { key: 'documentNumber', label: 'Doc No.', className: 'font-mono text-xs' },
              { key: 'title', label: 'Title' },
              { key: 'discipline', label: 'Disc.', className: 'text-ink-500' },
              { key: 'revision', label: 'Rev', className: 'font-mono text-xs' },
              { key: 'status', label: 'Status', render: r => {
                const s = r.status as DocStatus
                return <span className={`chip text-[10px] ${statusColor[s] ?? statusColor.Draft}`}>{r.status}</span>
              }},
            ]}
            rows={rows}
            empty="No rows in this file"
          />
        </div>
      )}
    </div>
  )
}
