/** Portal API route map — mirrors Laravel routes under /api/v1 */
export const API_BASE = '/api/v1'

export const apiRoutes = {
  health: '/api/health',
  auth: {
    login: `${API_BASE}/auth/login`,
    me: `${API_BASE}/auth/me`,
    logout: `${API_BASE}/auth/logout`,
  },
  me: {
    projects: `${API_BASE}/me/projects`,
  },
  users: `${API_BASE}/users`,
  branches: `${API_BASE}/branches`,
  departments: `${API_BASE}/departments`,
  employers: `${API_BASE}/employers`,
  roles: `${API_BASE}/roles`,
  permissions: `${API_BASE}/permissions`,
  codeFormats: `${API_BASE}/code-formats`,
  documentCodingFormats: `${API_BASE}/document-coding-formats`,
  projects: `${API_BASE}/projects`,
  project: (id: string) => `${API_BASE}/projects/${id}`,
  projectEnter: (id: string) => `${API_BASE}/projects/${id}/enter`,
  projectCurrent: `${API_BASE}/projects/current`,
  projectConfiguration: (id: string) => `${API_BASE}/projects/${id}/configuration`,
  projectTeams: (id: string) => `${API_BASE}/projects/${id}/teams`,
  projectWorkflows: (id: string) => `${API_BASE}/projects/${id}/workflows`,
  projectDocuments: (id: string) => `${API_BASE}/projects/${id}/documents`,
  projectTasks: (id: string) => `${API_BASE}/projects/${id}/tasks`,
  projectVdrTemplates: (id: string) => `${API_BASE}/projects/${id}/vdr-templates`,
  projectVdrFiles: (id: string) => `${API_BASE}/projects/${id}/vdr-files`,
  projectMtos: (id: string) => `${API_BASE}/projects/${id}/mtos`,
  projectMtoItems: (id: string) => `${API_BASE}/projects/${id}/mto-items`,
  engineeringDashboard: `${API_BASE}/engineering/dashboard`,
  engineeringWorkspace: (projectId: string) => `${API_BASE}/projects/${projectId}/engineering-workspace`,
} as const

export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  meta?: Record<string, unknown>
  errors?: Record<string, string[]>
}
