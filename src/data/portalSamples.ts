import type {
  Branch, Department, Employer, PortalPermission, PortalRole,
  CodeFormat, DocumentCodingFormat, ProjectConfiguration, ProjectTeam,
  ProjectWorkflow, VdrTemplate, VdrFile, VdrRow, EngineeringInboxItem,
  PortalUser, Workspace,
} from './types'

/** Matches Portal DatabaseSeeder */
export const portalUsers: PortalUser[] = [
  {
    id: 'u-super',
    firstName: 'Super',
    lastName: 'Admin',
    name: 'Super Admin',
    initials: 'SA',
    email: 'superadmin@portal.local',
    mobile: '09999999999',
    nationalCode: '',
    employeeCode: 'SUPER0001',
    departmentId: 'dept-hq',
    status: 'active',
    isSuperAdmin: true,
    role: 'Super Admin',
    color: '#2563eb',
  },
  {
    id: 'u-test',
    firstName: 'Test',
    lastName: 'User',
    name: 'Test User',
    initials: 'TU',
    email: 'test.user@portal.local',
    mobile: '09123456789',
    nationalCode: '0012345678',
    employeeCode: 'EMP0001',
    departmentId: 'dept-eng',
    status: 'active',
    isSuperAdmin: false,
    role: 'Engineer',
    color: '#16a34a',
  },
]

export const employers: Employer[] = [
  { id: 'emp-1', name: 'Northgate Energy', code: 'NGE', description: 'Refining & petrochemicals', isActive: true },
  { id: 'emp-2', name: 'Cascadia Gas', code: 'CGS', description: 'LNG terminal operator', isActive: true },
  { id: 'emp-3', name: 'Helios Petroleum', code: 'HPT', description: 'Offshore E&P', isActive: true },
  { id: 'emp-4', name: 'Internal', code: 'INT', description: 'System administration', isActive: true },
]

export const branches: Branch[] = [
  { id: 'br-hq', name: 'Head Office', code: 'HQ', description: 'Corporate headquarters', phone: '+31 10 123 4567', status: 'active' },
  { id: 'br-rot', name: 'Rotterdam', code: 'RTM', description: 'Netherlands engineering hub', phone: '+31 10 987 6543', status: 'active' },
  { id: 'br-hou', name: 'Houston', code: 'HOU', description: 'Americas operations', phone: '+1 713 555 0100', status: 'active' },
]

export const departments: Department[] = [
  { id: 'dept-hq', name: 'Administration', code: 'ADM', branchId: 'br-hq', parentId: null, description: 'Corporate admin', status: 'active', head: 'Super Admin' },
  { id: 'dept-eng', name: 'Engineering', code: 'ENG', branchId: 'br-hq', parentId: null, description: 'Multi-discipline engineering', status: 'active', head: 'Test User' },
  { id: 'dept-pip', name: 'Piping', code: 'PIP', branchId: 'br-rot', parentId: 'dept-eng', description: 'Piping discipline', status: 'active', head: null },
  { id: 'dept-proc', name: 'Process', code: 'PRC', branchId: 'br-rot', parentId: 'dept-eng', description: 'Process engineering', status: 'active', head: null },
]

export const portalPermissions: PortalPermission[] = [
  { id: 'perm-1', name: 'View project configuration', code: 'project.configuration.view', isActive: true },
  { id: 'perm-2', name: 'Update project configuration', code: 'project.configuration.update', isActive: true },
  { id: 'perm-3', name: 'View documents', code: 'project.document_assignment.view', isActive: true },
  { id: 'perm-4', name: 'Assign documents', code: 'project.document_assignment.create', isActive: true },
  { id: 'perm-5', name: 'View workflow', code: 'project.workflow.view', isActive: true },
  { id: 'perm-6', name: 'Manage workflow', code: 'project.workflow.create', isActive: true },
  { id: 'perm-7', name: 'View tasks', code: 'project.task.view', isActive: true },
  { id: 'perm-8', name: 'Complete tasks', code: 'project.task.complete', isActive: true },
  { id: 'perm-9', name: 'View MTO', code: 'mto.view', isActive: true },
  { id: 'perm-10', name: 'Submit MTO', code: 'mto.submit', isActive: true },
  { id: 'perm-11', name: 'Engineering workspace', code: 'project.engineering_workspace.view', isActive: true },
  { id: 'perm-12', name: 'Upload engineering files', code: 'project.engineering_workspace.upload', isActive: true },
]

export const portalRoles: PortalRole[] = [
  { id: 'role-super', name: 'Super Admin', code: 'superadmin', description: 'Full system access', isActive: true, permissionCodes: portalPermissions.map(p => p.code) },
  { id: 'role-pm', name: 'Project Manager', code: 'project_manager', description: 'Project oversight', isActive: true, permissionCodes: ['project.configuration.view', 'project.workflow.view', 'project.task.view', 'mto.view', 'mto.approve_pm'] },
  { id: 'role-lead', name: 'Lead Engineer', code: 'lead_engineer', description: 'Discipline lead', isActive: true, permissionCodes: ['project.document_assignment.view', 'project.workflow.view', 'project.task.complete', 'mto.view', 'mto.submit'] },
  { id: 'role-eng', name: 'Engineer', code: 'engineer', description: 'Document author', isActive: true, permissionCodes: ['project.document_assignment.view', 'project.task.view', 'project.engineering_workspace.view', 'project.engineering_workspace.upload'] },
  { id: 'role-viewer', name: 'Viewer', code: 'viewer', description: 'Read-only access', isActive: true, permissionCodes: ['project.document_assignment.view', 'project.task.view', 'mto.view'] },
]

export const codeFormats: CodeFormat[] = [
  { id: 'cf-1', name: 'Project Code', entityType: 'project', separator: '-', segments: ['PREFIX', 'YEAR', 'SEQ'], isDefault: true, isActive: true },
  { id: 'cf-2', name: 'Document Number', entityType: 'document', separator: '-', segments: ['DISC', 'AREA', 'SEQ'], isDefault: true, isActive: true },
  { id: 'cf-3', name: 'MTO Item Code', entityType: 'mto_item', separator: '-', segments: ['PREFIX', 'SEQ'], isDefault: false, isActive: true },
]

export const documentCodingFormats: DocumentCodingFormat[] = [
  {
    id: 'dcf-1',
    name: 'Standard EDMS Coding',
    description: 'Default document numbering scheme',
    isDefault: true,
    isActive: true,
    fields: [
      { id: 'dcf1-f1', name: 'discipline', displayName: 'Discipline', code: 'DISC', sortOrder: 1, isRequired: true, values: ['PID', 'ISO', 'STR', 'MEC', 'ELE', 'INS'] },
      { id: 'dcf1-f2', name: 'area', displayName: 'Area', code: 'AREA', sortOrder: 2, isRequired: true, values: ['U100', 'U200', 'U300', 'PR-A'] },
      { id: 'dcf1-f3', name: 'sequence', displayName: 'Sequence', code: 'SEQ', sortOrder: 3, isRequired: true, values: [] },
    ],
  },
]

export const workspaces: Workspace[] = [
  { id: 'ws-eng', projectId: 'p0', name: 'Engineering', code: 'ENG', description: 'Document authoring & review', displayOrder: 1, isActive: true },
  { id: 'ws-dcc', projectId: 'p0', name: 'Document Control', code: 'DCC', description: 'Register & transmittals', displayOrder: 2, isActive: true },
  { id: 'ws-proc', projectId: 'p0', name: 'Procurement', code: 'PRC', description: 'MTO & material tracking', displayOrder: 3, isActive: true },
]

export const projectConfigurations: ProjectConfiguration[] = [
  {
    projectId: 'p0',
    revisionPolicy: 'Sequential alpha',
    issuePurposeSource: 'Assignment profile',
    engineeringSubmissionMode: 'Workflow-driven',
    uploadMode: 'Versioned',
    engineeringWorkspaceEnabled: true,
    dccWorkspaceEnabled: true,
  },
  {
    projectId: 'p1',
    revisionPolicy: 'Sequential alpha',
    issuePurposeSource: 'Manual',
    engineeringSubmissionMode: 'Bulk submit',
    uploadMode: 'Replace',
    engineeringWorkspaceEnabled: true,
    dccWorkspaceEnabled: false,
  },
]

export const projectTeams: ProjectTeam[] = [
  { id: 'pt-1', projectId: 'p0', workspaceId: 'ws-eng', name: 'Process', code: 'PRC', description: 'Process engineering team', displayOrder: 1, isActive: true, memberCount: 4 },
  { id: 'pt-2', projectId: 'p0', workspaceId: 'ws-eng', name: 'Piping', code: 'PIP', description: 'Piping design team', displayOrder: 2, isActive: true, memberCount: 6 },
  { id: 'pt-3', projectId: 'p0', workspaceId: 'ws-dcc', name: 'Document Control', code: 'DCC', description: 'DCC team', displayOrder: 1, isActive: true, memberCount: 2 },
  { id: 'pt-4', projectId: 'p1', workspaceId: 'ws-eng', name: 'Mechanical', code: 'MEC', description: 'Mechanical team', displayOrder: 1, isActive: true, memberCount: 5 },
]

export const projectWorkflows: ProjectWorkflow[] = [
  {
    id: 'wf-1', projectId: 'p0', name: 'Standard Review', code: 'STD-REV', description: 'Internal → Lead → Client → Approved',
    displayOrder: 1, isActive: true, version: 2, isDefault: true, stepCount: 5, instanceCount: 42,
  },
  {
    id: 'wf-2', projectId: 'p0', name: 'Fast Track IFC', code: 'FT-IFC', description: 'Expedited issue for construction',
    displayOrder: 2, isActive: true, version: 1, isDefault: false, stepCount: 3, instanceCount: 8,
  },
  {
    id: 'wf-3', projectId: 'p1', name: 'Vendor Data Review', code: 'VDR-REV', description: 'Vendor document acceptance',
    displayOrder: 1, isActive: true, version: 1, isDefault: true, stepCount: 4, instanceCount: 15,
  },
]

export const vdrTemplates: VdrTemplate[] = [
  {
    id: 'vdr-t1', projectId: 'p0', name: 'Master Document Register', sheetName: 'MDR',
    referenceSheets: ['Cover', 'Legend'], description: 'Primary VDR template', isActive: true, columnCount: 8,
  },
  {
    id: 'vdr-t2', projectId: 'p1', name: 'Line List Template', sheetName: 'LineList',
    referenceSheets: [], description: 'Piping line list import', isActive: true, columnCount: 6,
  },
]

export const vdrFiles: VdrFile[] = [
  {
    id: 'vdr-f1', projectId: 'p0', templateId: 'vdr-t1', templateName: 'Master Document Register',
    fileName: 'MDR_Rev03.xlsx', version: 3, uploadedBy: 'Test User', uploadDate: '2026-07-10', rowCount: 124,
  },
  {
    id: 'vdr-f2', projectId: 'p0', templateId: 'vdr-t1', templateName: 'Master Document Register',
    fileName: 'MDR_Rev02.xlsx', version: 2, uploadedBy: 'Super Admin', uploadDate: '2026-06-18', rowCount: 118,
  },
  {
    id: 'vdr-f3', projectId: 'p1', templateId: 'vdr-t2', templateName: 'Line List Template',
    fileName: 'LineList_Initial.xlsx', version: 1, uploadedBy: 'Test User', uploadDate: '2026-07-05', rowCount: 86,
  },
]

export const vdrRows: VdrRow[] = [
  { id: 'vr-1', fileId: 'vdr-f1', rowOrder: 1, documentNumber: 'PID-1001', title: 'Process Flow Diagram — Unit 100', discipline: 'Process', status: 'For Review', revision: 'B' },
  { id: 'vr-2', fileId: 'vdr-f1', rowOrder: 2, documentNumber: 'ISO-1042', title: 'Pipe Isometric — 10"-P-101', discipline: 'Piping', status: 'Approved', revision: 'C' },
  { id: 'vr-3', fileId: 'vdr-f1', rowOrder: 3, documentNumber: 'STR-2014', title: 'Platform Detail — Level 2', discipline: 'Structural', status: 'Draft', revision: 'A' },
  { id: 'vr-4', fileId: 'vdr-f3', rowOrder: 1, documentNumber: 'LL-0010', title: '10"-P-101-01', discipline: 'Piping', status: 'Issued', revision: 'A' },
]

export const engineeringInbox: EngineeringInboxItem[] = [
  { id: 'ei-1', projectId: 'p0', projectCode: 'SYS-ADMIN', documentNumber: 'PID-1001', title: 'Process Flow Diagram — Unit 100', taskType: 'upload', status: 'OPEN', priority: 'High', dueDate: '2026-07-22', assignee: 'Test User' },
  { id: 'ei-2', projectId: 'p0', projectCode: 'SYS-ADMIN', documentNumber: 'ISO-1042', title: 'Pipe Isometric — 10"-P-101', taskType: 'submit', status: 'IN_PROGRESS', priority: 'Medium', dueDate: '2026-07-25', assignee: 'Test User' },
  { id: 'ei-3', projectId: 'p1', projectCode: 'PRJ-2024-014', documentNumber: 'MEC-1501', title: 'Equipment GA — Reactor', taskType: 'review', status: 'OPEN', priority: 'Critical', dueDate: '2026-07-21', assignee: 'Test User' },
]

export const engineeringStats = {
  openTasks: 14,
  overdueTasks: 3,
  documentsInReview: 28,
  uploadsThisWeek: 12,
  projectsActive: 4,
}
