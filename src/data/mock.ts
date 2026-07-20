import type {
  User, Project, Doc, MtoItem, Activity, Task, Notification, AuditEntry,
} from './types'

export const users: User[] = [
  { id: 'u1', name: 'Sarah Chen', initials: 'SC', role: 'Lead Piping Engineer', email: 's.chen@stratum.io', color: '#2563eb' },
  { id: 'u2', name: 'Marcus Holloway', initials: 'MH', role: 'Project Manager', email: 'm.holloway@stratum.io', color: '#16a34a' },
  { id: 'u3', name: 'Priya Nair', initials: 'PN', role: 'Process Engineer', email: 'p.nair@stratum.io', color: '#d97706' },
  { id: 'u4', name: 'David Okafor', initials: 'DO', role: 'Structural Lead', email: 'd.okafor@stratum.io', color: '#dc2626' },
  { id: 'u5', name: 'Lena Fischer', initials: 'LF', role: 'Electrical Engineer', email: 'l.fischer@stratum.io', color: '#7c3aed' },
  { id: 'u6', name: 'Tomás Rivera', initials: 'TR', role: 'Instrumentation', email: 't.rivera@stratum.io', color: '#0891b2' },
  { id: 'u7', name: 'Aiko Tanaka', initials: 'AT', role: 'Document Controller', email: 'a.tanaka@stratum.io', color: '#db2777' },
  { id: 'u8', name: 'Brendan Walsh', initials: 'BW', role: 'Client Reviewer', email: 'b.walsh@client.com', color: '#475569' },
  { id: 'u9', name: 'Nadia Hassan', initials: 'NH', role: 'Mechanical Engineer', email: 'n.hassan@stratum.io', color: '#059669' },
  { id: 'u10', name: 'Erik Lindqvist', initials: 'EL', role: 'Civil Lead', email: 'e.lindqvist@stratum.io', color: '#9333ea' },
]

export const projects: Project[] = [
  {
    id: 'p1', code: 'PRJ-2024-014', name: 'Northgate Refinery — Hydrocracker Unit',
    client: 'Northgate Energy', location: 'Rotterdam, NL', status: 'Active', progress: 68,
    startDate: '2024-02-01', dueDate: '2026-03-15', budget: 184_000_000, docs: 4218, openIssues: 12,
    description: 'Greenfield hydrocracker unit with 42,000 BPD capacity. EPC delivery with vendor-supplied reactors and modular pipe-rack.',
    disciplines: [
      { name: 'Process', progress: 82, docs: 612 }, { name: 'Piping', progress: 71, docs: 1840 },
      { name: 'Structural', progress: 64, docs: 540 }, { name: 'Mechanical', progress: 78, docs: 410 },
      { name: 'Electrical', progress: 55, docs: 388 }, { name: 'Instrumentation', progress: 48, docs: 296 },
      { name: 'Civil', progress: 90, docs: 132 },
    ],
    team: ['u1', 'u2', 'u3', 'u4', 'u9'],
  },
  {
    id: 'p2', code: 'PRJ-2024-021', name: 'Cascadia LNG Terminal — Phase II',
    client: 'Cascadia Gas', location: 'Kitimat, BC', status: 'Active', progress: 41,
    startDate: '2024-06-01', dueDate: '2027-01-20', budget: 920_000_000, docs: 6840, openIssues: 28,
    description: 'Liquefaction train expansion with cryogenic storage and marine loading facilities.',
    disciplines: [
      { name: 'Process', progress: 52, docs: 980 }, { name: 'Piping', progress: 38, docs: 2400 },
      { name: 'Structural', progress: 44, docs: 720 }, { name: 'Mechanical', progress: 46, docs: 610 },
      { name: 'Electrical', progress: 30, docs: 880 }, { name: 'Instrumentation', progress: 28, docs: 540 },
      { name: 'Pipeline', progress: 35, docs: 710 },
    ],
    team: ['u1', 'u5', 'u6', 'u10'],
  },
  {
    id: 'p3', code: 'PRJ-2023-009', name: 'Helios Offshore Platform — Wellbay',
    client: 'Helios Petroleum', location: 'Gulf of Mexico', status: 'Active', progress: 84,
    startDate: '2023-03-01', dueDate: '2025-09-30', budget: 410_000_000, docs: 3120, openIssues: 4,
    description: 'Fixed platform wellbay module — fabrication, integration, and offshore hook-up.',
    disciplines: [
      { name: 'Process', progress: 92, docs: 410 }, { name: 'Piping', progress: 88, docs: 1180 },
      { name: 'Structural', progress: 90, docs: 620 }, { name: 'Mechanical', progress: 84, docs: 320 },
      { name: 'Electrical', progress: 78, docs: 280 }, { name: 'Instrumentation', progress: 76, docs: 210 },
      { name: 'Civil', progress: 95, docs: 120 },
    ],
    team: ['u2', 'u4', 'u8', 'u9'],
  },
  {
    id: 'p4', code: 'PRJ-2024-033', name: 'Meridian Petrochemical — Aromatics Complex',
    client: 'Meridian Chemicals', location: 'Jubail, SA', status: 'Planning', progress: 12,
    startDate: '2025-01-01', dueDate: '2028-06-30', budget: 1_240_000_000, docs: 480, openIssues: 2,
    description: 'Pre-FEED to FEED transition for aromatics complex with paraxylene and benzene units.',
    disciplines: [
      { name: 'Process', progress: 22, docs: 180 }, { name: 'Piping', progress: 8, docs: 90 },
      { name: 'Structural', progress: 6, docs: 40 }, { name: 'Mechanical', progress: 10, docs: 60 },
      { name: 'Electrical', progress: 4, docs: 30 }, { name: 'Instrumentation', progress: 4, docs: 40 },
      { name: 'Civil', progress: 18, docs: 40 },
    ],
    team: ['u3', 'u5', 'u7'],
  },
  {
    id: 'p5', code: 'PRJ-2022-027', name: 'Atlas Manufacturing — Modular Skids',
    client: 'Atlas Industrial', location: 'Houston, TX', status: 'Completed', progress: 100,
    startDate: '2022-04-01', dueDate: '2024-08-15', budget: 96_000_000, docs: 2140, openIssues: 0,
    description: 'Twelve process skids for produced-water treatment — design, fabrication, and FAT.',
    disciplines: [
      { name: 'Process', progress: 100, docs: 280 }, { name: 'Piping', progress: 100, docs: 980 },
      { name: 'Structural', progress: 100, docs: 320 }, { name: 'Mechanical', progress: 100, docs: 240 },
      { name: 'Electrical', progress: 100, docs: 180 }, { name: 'Instrumentation', progress: 100, docs: 140 },
    ],
    team: ['u1', 'u7', 'u9'],
  },
]

const vendors = [
  'Sulzer Pumps', 'Ametek', 'Emerson', 'Flowserve', 'Siemens Energy',
  'ABB', 'Spirax Sarco', 'Tyco', 'Cameron', 'Pentair',
]

const systems = [
  'Process Gas', 'Cooling Water', 'Fire Water', 'Instrument Air', 'Drainage',
  'Power Distribution', 'Control Systems', 'Relief & Flare', 'Feed & Product',
]

const areas = ['Unit 100', 'Unit 200', 'Unit 300', 'Pipe Rack A', 'Pipe Rack B', 'Tank Farm', 'Substation', 'Control Room', 'Utility Area']

const statuses: Doc['status'][] = [
  'Draft', 'For Review', 'Reviewed', 'For Approval', 'Approved', 'Rejected', 'Issued For Construction', 'Superseded',
]
const stages: Doc['workflowStage'][] = [
  'Draft', 'Internal Review', 'Lead Review', 'Client Review', 'Approved', 'Issued For Construction', 'As Built', 'Superseded',
]
const disciplines: Doc['discipline'][] = [
  'Process', 'Piping', 'Structural', 'Mechanical', 'Electrical', 'Instrumentation', 'Civil', 'Pipeline',
]

const docTypeMap: Record<Doc['discipline'], { prefix: string; types: string[]; titles: string[] }> = {
  Process: { prefix: 'PID', types: ['P&ID', 'Data Sheet', 'Process Flow Diagram', 'Cause & Effect', 'HAZOP Report'], titles: ['Process Flow Diagram', 'P&ID', 'Cause & Effect Matrix', 'Heat & Mass Balance', 'Relief Load Calculation'] },
  Piping: { prefix: 'ISO', types: ['Isometric', 'GA', 'Line List', 'Support', 'Stress Report'], titles: ['Pipe Isometric', 'General Arrangement', 'Line List', 'Pipe Support Detail', 'Stress Analysis'] },
  Structural: { prefix: 'STR', types: ['GA', 'Detail', 'Plan', 'Section', 'Calculation'], titles: ['Structural Plan', 'Platform Detail', 'Steel Section', 'Foundation Plan', 'Connection Detail'] },
  Mechanical: { prefix: 'MEC', types: ['GA', 'Data Sheet', 'Drawing', 'Layout'], titles: ['Equipment GA', 'Pump Data Sheet', 'Vessel Drawing', 'Compressor Layout'] },
  Electrical: { prefix: 'ELE', types: ['SLD', 'Layout', 'Schedule', 'Detail'], titles: ['Single Line Diagram', 'Cable Schedule', 'Lighting Layout', 'Grounding Plan'] },
  Instrumentation: { prefix: 'INS', types: ['Index', 'Loop', 'Logic', 'Datasheet'], titles: ['Instrument Index', 'Loop Diagram', 'Control Logic', 'Transmitter Datasheet'] },
  Civil: { prefix: 'CIV', types: ['Plan', 'Section', 'Drawing'], titles: ['Site Plan', 'Earthwork Plan', 'Paving Section', 'Drainage Plan'] },
  Pipeline: { prefix: 'PIP', types: ['Route', 'Profile', 'Crossing'], titles: ['Pipeline Route', 'Pipeline Profile', 'Crossing Detail'] },
}

const tagPool = ['IFA', 'IFC', 'IFR', 'HOLD', 'Client Issue', 'Vendor', 'Stress', 'HAZOP', 'As-Built', 'Tie-In', 'TBE', 'DEK']

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length] }
function fmtDate(d: Date): string { return d.toISOString().slice(0, 10) }

const seedRand = (s: number) => () => {
  s = (s * 1103515245 + 12345) & 0x7fffffff
  return s / 0x7fffffff
}
const rand = seedRand(20240718)

function buildRevisions(revLetters: string[], baseDate: Date, by: string): Doc['revisions'] {
  return revLetters.map((rev, i) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i * 21)
    return {
      rev,
      date: fmtDate(d),
      by: i % 2 === 0 ? by : pick(users, i + 2).name,
      reason: i === 0 ? 'Initial issue' : i === 1 ? 'Incorporated internal comments' : i === 2 ? 'Client review comments' : 'Vendor data update',
      status: pick(statuses, i + 3),
      size: `${(2 + (i % 4)).toFixed(1)} MB`,
    }
  })
}

function buildWorkflow(stage: Doc['workflowStage'], reviewer: string, approver: string): Doc['workflow'] {
  const all: Doc['workflowStage'][] = ['Draft', 'Internal Review', 'Lead Review', 'Client Review', 'Approved', 'Issued For Construction', 'As Built']
  const idx = all.indexOf(stage)
  return all.map((s, i) => {
    let status: Doc['workflow'][number]['status'] = 'pending'
    if (stage === 'Superseded') status = i < 5 ? 'done' : 'pending'
    else if (i < idx) status = 'done'
    else if (i === idx) status = 'current'
    return {
      stage: s,
      status,
      assignee: s === 'Internal Review' || s === 'Lead Review' ? reviewer : s === 'Client Review' ? 'Brendan Walsh' : approver,
      date: status === 'done' ? fmtDate(new Date(Date.now() - (all.length - i) * 86400000 * 7)) : undefined,
    }
  })
}

export const documents: Doc[] = Array.from({ length: 142 }).map((_, i) => {
  const disc = pick(disciplines, i)
  const proj = pick(projects, i)
  const tm = docTypeMap[disc]
  const num = `${tm.prefix}-${String(1000 + i).padStart(4, '0')}`
  const statusIdx = i % statuses.length
  const status = pick(statuses, statusIdx)
  const stage = pick(stages, statusIdx)
  const reviewer = pick(users, i + 1).name
  const approver = pick(users, i + 3).name
  const issueDate = new Date(Date.now() - (i * 86400000 * 3) - 86400000 * 30)
  const lastUpdated = new Date(Date.now() - (i % 14) * 86400000)
  const revLetters = ['A', 'B', 'C', 'D'].slice(0, (i % 4) + 1)
  const priority: Doc['priority'] = pick(['Low', 'Medium', 'High', 'Critical'], i + (status === 'Rejected' ? 3 : 0))
  return {
    id: `d${i + 1}`,
    number: num,
    title: `${pick(tm.titles, i)} — ${pick(areas, i)}`,
    projectId: proj.id,
    discipline: disc,
    system: pick(systems, i),
    area: pick(areas, i),
    vendor: i % 3 === 0 ? pick(vendors, i) : undefined,
    revision: revLetters[revLetters.length - 1],
    status,
    workflowStage: stage,
    reviewer,
    approver,
    issueDate: fmtDate(issueDate),
    lastUpdated: fmtDate(lastUpdated),
    tags: [pick(tagPool, i), pick(tagPool, i + 3)].filter((v, idx, a) => a.indexOf(v) === idx),
    type: pick(tm.types, i),
    priority,
    dueDate: fmtDate(new Date(Date.now() + (i % 10) * 86400000)),
    progress: Math.min(100, (statusIdx + 1) * 14 + (i % 5) * 3),
    revisions: buildRevisions(revLetters, issueDate, reviewer),
    workflow: buildWorkflow(stage, reviewer, approver),
    comments: Array.from({ length: (i % 3) + 1 }).map((_, c) => ({
      id: `c${i}-${c}`,
      author: pick(users, c + 2).name,
      date: fmtDate(new Date(Date.now() - c * 86400000 * 2)),
      text: pick([
        'Please confirm line class for 6" branch — spec calls for CL150 RF but isometric shows CL300.',
        'Tie-in point at coordinate N 45820 E 31280 needs to match the latest survey.',
        'Vendor drawing received — verify flange orientation matches GA.',
        'HAZOP action item 14/09 unresolved on this revision.',
        'Stress model updated; support at node 120 relocated +1.2m.',
      ], c),
      resolved: c === 0,
    })),
    attachments: Array.from({ length: (i % 3) + 1 }).map((_, a) => ({
      id: `a${i}-${a}`,
      name: `${num}_Rev${revLetters[revLetters.length - 1]}_${pick(['Drawing', 'Calc', 'Spec', 'Model'], a)}.${pick(['pdf', 'dwg', 'xlsx', 'rvt'], a)}`,
      size: `${(0.5 + (a % 4) * 0.8).toFixed(1)} MB`,
      type: pick(['pdf', 'dwg', 'xlsx', 'rvt'], a),
      date: fmtDate(new Date(Date.now() - a * 86400000)),
    })),
    related: [`d${(i + 7) % 142 + 1}`, `d${(i + 19) % 142 + 1}`],
    transmittals: Array.from({ length: (i % 2) + 1 }).map((_, t) => ({
      id: `TR-${proj.code.slice(-4)}-${String(100 + t).padStart(3, '0')}`,
      date: fmtDate(new Date(Date.now() - (t + 1) * 86400000 * 9)),
      to: t === 0 ? 'Northgate Energy' : 'Vendor — Sulzer',
      direction: t === 0 ? 'Outgoing' : 'Incoming',
      revisions: revLetters,
      status: pick(['Sent', 'Received', 'Acknowledged'], t),
    })),
    description: `${pick(tm.types, i)} for ${proj.name.split('—')[0].trim()} covering ${pick(systems, i)} in ${pick(areas, i)}. Prepared per project drawing standard DS-001 Rev C.`,
  }
})

// Fix related to use real ids
documents.forEach((d, i) => {
  d.related = [documents[(i + 7) % documents.length].id, documents[(i + 19) % documents.length].id]
})

export const mtoItems: MtoItem[] = Array.from({ length: 86 }).map((_, i) => {
  const materials = ['Carbon Steel A106 Gr.B', 'Stainless Steel 316L', 'API 5L X65', 'Galvanized Steel', 'Duplex 2205', 'Alloy 825']
  const sizes = ['2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"']
  const schedules = ['Sch 40', 'Sch 80', 'Sch 160', 'XS', 'STD', 'Sch 10S', 'Sch 40S']
  const lineNo = `10"-${pick(['P-101', 'P-204', 'P-308', 'P-412', 'P-520'], i)}-${String(i % 99).padStart(2, '0')}`
  const qty = 1 + ((i * 7) % 240)
  return {
    id: `m${i + 1}`,
    itemCode: `MTL-${String(5000 + i).padStart(5, '0')}`,
    description: pick(['Pipe, Seamless, BE', 'Elbow 90° LR', 'Tee Equal', 'Reducer Concentric', 'Cap', 'Flange WN RF', 'Valve Gate', 'Support Shoe', 'U-Bolt', 'Pipe Shoe'], i),
    material: pick(materials, i),
    size: pick(sizes, i),
    schedule: pick(schedules, i),
    length: +(((i % 12) + 1) * 0.6 + (i % 3) * 0.15).toFixed(2),
    weight: +(((i % 12) + 1) * 2.4 + (i % 5)).toFixed(1),
    quantity: qty,
    unit: pick(['EA', 'M', 'FT', 'KG'], i),
    status: pick(statuses, i + 2),
    revision: pick(['REV A', 'REV B', 'REV C'], i),
    lineNo,
    spool: `SP-${String(100 + (i % 40)).padStart(3, '0')}`,
    area: pick(areas, i),
    materialType: pick(['Pipe', 'Fitting', 'Flange', 'Valve', 'Support'], i),
    prevQuantity: i % 3 === 0 ? qty - ((i % 9) + 1) : undefined,
  }
})

export const activities: Activity[] = [
  { id: 'a1', user: 'Sarah Chen', action: 'approved', target: 'ISO-1042 Rev C', time: '12 min ago', type: 'approve' },
  { id: 'a2', user: 'Priya Nair', action: 'uploaded', target: 'PID-1008 Rev A', time: '38 min ago', type: 'upload' },
  { id: 'a3', user: 'Brendan Walsh', action: 'commented on', target: 'GA-100 Rev B', time: '1 hr ago', type: 'comment' },
  { id: 'a4', user: 'David Okafor', action: 'rejected', target: 'STR-2014 Rev B', time: '2 hr ago', type: 'reject' },
  { id: 'a5', user: 'Aiko Tanaka', action: 'issued transmittal', target: 'TR-0014 → Northgate', time: '3 hr ago', type: 'transmittal' },
  { id: 'a6', user: 'Marcus Holloway', action: 'revised', target: 'PID-1002 Rev D', time: '5 hr ago', type: 'revise' },
  { id: 'a7', user: 'Lena Fischer', action: 'submitted for review', target: 'ELE-3010 Rev A', time: '6 hr ago', type: 'review' },
  { id: 'a8', user: 'Tomás Rivera', action: 'approved', target: 'INS-2024 Rev B', time: '8 hr ago', type: 'approve' },
  { id: 'a9', user: 'Nadia Hassan', action: 'uploaded', target: 'MEC-1501 Rev B', time: 'Yesterday', type: 'upload' },
  { id: 'a10', user: 'Erik Lindqvist', action: 'commented on', target: 'CIV-4008 Rev A', time: 'Yesterday', type: 'comment' },
]

export const tasks: Task[] = [
  { id: 't1', title: 'Review isometric for line 10"-P-101-07', docNumber: 'ISO-1043', type: 'review', due: 'Today', priority: 'High', assignee: 'Sarah Chen', done: false },
  { id: 't2', title: 'Approve P&ID revision for Unit 200', docNumber: 'PID-1009', type: 'approval', due: 'Tomorrow', priority: 'Critical', assignee: 'Priya Nair', done: false },
  { id: 't3', title: 'Review structural platform detail', docNumber: 'STR-2018', type: 'review', due: 'Jul 22', priority: 'Medium', assignee: 'David Okafor', done: false },
  { id: 't4', title: 'Approve electrical single line diagram', docNumber: 'ELE-3014', type: 'approval', due: 'Jul 24', priority: 'High', assignee: 'Lena Fischer', done: false },
  { id: 't5', title: 'Upload vendor data sheet — Sulzer pump', docNumber: 'MEC-1502', type: 'upload', due: 'Jul 25', priority: 'Medium', assignee: 'Nadia Hassan', done: false },
  { id: 't6', title: 'Review instrument loop diagram', docNumber: 'INS-2030', type: 'review', due: 'Jul 26', priority: 'Low', assignee: 'Tomás Rivera', done: true },
  { id: 't7', title: 'Approve civil drainage plan', docNumber: 'CIV-4010', type: 'approval', due: 'Jul 28', priority: 'Medium', assignee: 'Erik Lindqvist', done: false },
]

export const notifications: Notification[] = [
  { id: 'n1', text: 'Brendan Walsh commented on GA-100 Rev B awaiting your reply', time: '12 min ago', read: false, kind: 'info' },
  { id: 'n2', text: 'ISO-1042 Rev C was approved by Sarah Chen', time: '14 min ago', read: false, kind: 'success' },
  { id: 'n3', text: 'STR-2014 Rev B was rejected — 2 comments to resolve', time: '2 hr ago', read: false, kind: 'danger' },
  { id: 'n4', text: 'Transmittal TR-0014 acknowledged by Northgate Energy', time: '3 hr ago', read: true, kind: 'info' },
  { id: 'n5', text: 'Workflow overdue: PID-1002 Rev D past client review due date', time: '5 hr ago', read: false, kind: 'warning' },
  { id: 'n6', text: 'New MTO revision available for Cascadia LNG — 312 items changed', time: 'Yesterday', read: true, kind: 'info' },
]

export const auditLog: AuditEntry[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `log-${i + 1}`,
  user: pick(users, i).name,
  action: pick(['LOGIN', 'VIEW_DOCUMENT', 'DOWNLOAD', 'UPLOAD', 'APPROVE', 'REJECT', 'DELETE', 'PERMISSION_CHANGE', 'EXPORT'], i),
  entity: pick(documents, i).number,
  ip: `10.0.${(i % 255)}.${(i * 7) % 255}`,
  time: fmtDate(new Date(Date.now() - i * 3600000 * 2)) + ' ' + `${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 3) % 60).padStart(2, '0')}`,
}))

export const roles = [
  { id: 'r1', name: 'Administrator', users: 2, permissions: 48, description: 'Full system access including configuration and audit' },
  { id: 'r2', name: 'Document Controller', users: 4, permissions: 32, description: 'Manage document register, transmittals, and revisions' },
  { id: 'r3', name: 'Lead Engineer', users: 8, permissions: 28, description: 'Review, approve, and assign documents within discipline' },
  { id: 'r4', name: 'Engineer', users: 36, permissions: 18, description: 'Upload, revise, and comment on assigned documents' },
  { id: 'r5', name: 'Client Reviewer', users: 6, permissions: 8, description: 'External review and comment on client-issued documents' },
  { id: 'r6', name: 'Viewer', users: 120, permissions: 4, description: 'Read-only access to approved documents' },
]
