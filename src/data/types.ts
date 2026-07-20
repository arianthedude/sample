export type DocStatus =
  | 'Draft'
  | 'For Review'
  | 'Reviewed'
  | 'For Approval'
  | 'Approved'
  | 'Rejected'
  | 'Issued For Construction'
  | 'Superseded'

export type WorkflowStage =
  | 'Draft'
  | 'Internal Review'
  | 'Lead Review'
  | 'Client Review'
  | 'Approved'
  | 'Issued For Construction'
  | 'As Built'
  | 'Superseded'

export type Discipline =
  | 'Process'
  | 'Piping'
  | 'Structural'
  | 'Mechanical'
  | 'Electrical'
  | 'Instrumentation'
  | 'Civil'
  | 'Pipeline'

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface User {
  id: string
  name: string
  initials: string
  role: string
  email: string
  color: string
}

export interface Project {
  id: string
  code: string
  name: string
  client: string
  location: string
  status: 'Active' | 'On Hold' | 'Completed' | 'Planning'
  progress: number
  startDate: string
  dueDate: string
  disciplines: { name: Discipline; progress: number; docs: number }[]
  team: string[]
  budget: number
  docs: number
  openIssues: number
  description: string
}

export interface Revision {
  rev: string
  date: string
  by: string
  reason: string
  status: DocStatus
  size: string
}

export interface WorkflowStep {
  stage: WorkflowStage
  status: 'done' | 'current' | 'pending' | 'rejected'
  assignee: string
  date?: string
  comment?: string
}

export interface Comment {
  id: string
  author: string
  date: string
  text: string
  resolved: boolean
}

export interface Transmittal {
  id: string
  date: string
  to: string
  direction: 'Outgoing' | 'Incoming'
  revisions: string[]
  status: 'Sent' | 'Received' | 'Acknowledged'
}

export interface Attachment {
  id: string
  name: string
  size: string
  type: string
  date: string
}

export interface Doc {
  id: string
  number: string
  title: string
  projectId: string
  discipline: Discipline
  system: string
  area: string
  vendor?: string
  revision: string
  status: DocStatus
  workflowStage: WorkflowStage
  reviewer: string
  approver: string
  issueDate: string
  lastUpdated: string
  tags: string[]
  type: string
  priority: Priority
  dueDate?: string
  progress: number
  revisions: Revision[]
  workflow: WorkflowStep[]
  comments: Comment[]
  attachments: Attachment[]
  related: string[]
  transmittals: Transmittal[]
  description: string
}

export interface MtoItem {
  id: string
  itemCode: string
  description: string
  material: string
  size: string
  schedule: string
  length: number
  weight: number
  quantity: number
  unit: string
  status: DocStatus
  revision: string
  lineNo: string
  spool: string
  area: string
  materialType: string
  prevQuantity?: number
}

export interface Activity {
  id: string
  user: string
  action: string
  target: string
  time: string
  type: 'upload' | 'review' | 'approve' | 'reject' | 'comment' | 'transmittal' | 'revise'
}

export interface Task {
  id: string
  title: string
  docNumber: string
  type: 'review' | 'approval' | 'upload'
  due: string
  priority: Priority
  assignee: string
  done: boolean
}

export interface Notification {
  id: string
  text: string
  time: string
  read: boolean
  kind: 'info' | 'success' | 'warning' | 'danger'
}

export interface AuditEntry {
  id: string
  user: string
  action: string
  entity: string
  ip: string
  time: string
}
