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

// ── Portal-aligned types ──

export type EntityStatus = 'active' | 'inactive' | 'locked'

export interface PortalUser {
  id: string
  firstName: string
  lastName: string
  name: string
  initials: string
  email: string
  mobile: string
  nationalCode: string
  employeeCode: string
  departmentId: string
  status: EntityStatus
  isSuperAdmin: boolean
  role: string
  color: string
}

export interface Branch {
  id: string
  name: string
  code: string
  description: string
  phone: string
  status: EntityStatus
}

export interface Department {
  id: string
  name: string
  code: string
  branchId: string
  parentId: string | null
  description: string
  status: EntityStatus
  head: string | null
}

export interface Employer {
  id: string
  name: string
  code: string
  description: string
  isActive: boolean
}

export interface PortalPermission {
  id: string
  name: string
  code: string
  isActive: boolean
}

export interface PortalRole {
  id: string
  name: string
  code: string
  description: string
  isActive: boolean
  permissionCodes: string[]
}

export interface CodeFormat {
  id: string
  name: string
  entityType: string
  separator: string
  segments: string[]
  isDefault: boolean
  isActive: boolean
}

export interface DocumentCodingField {
  id: string
  name: string
  displayName: string
  code: string
  sortOrder: number
  isRequired: boolean
  values: string[]
}

export interface DocumentCodingFormat {
  id: string
  name: string
  description: string
  isDefault: boolean
  isActive: boolean
  fields: DocumentCodingField[]
}

export interface Workspace {
  id: string
  projectId: string
  name: string
  code: string
  description: string
  displayOrder: number
  isActive: boolean
}

export interface ProjectConfiguration {
  projectId: string
  revisionPolicy: string
  issuePurposeSource: string
  engineeringSubmissionMode: string
  uploadMode: string
  engineeringWorkspaceEnabled: boolean
  dccWorkspaceEnabled: boolean
}

export interface ProjectTeam {
  id: string
  projectId: string
  workspaceId: string
  name: string
  code: string
  description: string
  displayOrder: number
  isActive: boolean
  memberCount: number
}

export interface ProjectWorkflow {
  id: string
  projectId: string
  name: string
  code: string
  description: string
  displayOrder: number
  isActive: boolean
  version: number
  isDefault: boolean
  stepCount: number
  instanceCount: number
}

export interface VdrTemplate {
  id: string
  projectId: string
  name: string
  sheetName: string
  referenceSheets: string[]
  description: string
  isActive: boolean
  columnCount: number
}

export interface VdrFile {
  id: string
  projectId: string
  templateId: string
  templateName: string
  fileName: string
  version: number
  uploadedBy: string
  uploadDate: string
  rowCount: number
}

export interface VdrRow {
  id: string
  fileId: string
  rowOrder: number
  documentNumber: string
  title: string
  discipline: string
  status: string
  revision: string
}

export interface EngineeringInboxItem {
  id: string
  projectId: string
  projectCode: string
  documentNumber: string
  title: string
  taskType: 'upload' | 'submit' | 'review'
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: Priority
  dueDate: string
  assignee: string
}
