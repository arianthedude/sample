import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import Documents from '@/pages/Documents'
import Upload from '@/pages/Upload'
import Revisions from '@/pages/Revisions'
import Transmittals from '@/pages/Transmittals'
import Workflow from '@/pages/Workflow'
import Tasks from '@/pages/Tasks'
import Mto from '@/pages/Mto'
import MtoGenerate from '@/pages/MtoGenerate'
import MtoCompare from '@/pages/MtoCompare'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import ProjectNew from '@/pages/ProjectNew'
import ProjectConfiguration from '@/pages/projects/ProjectConfiguration'
import ProjectTeams from '@/pages/projects/ProjectTeams'
import ProjectWorkflows from '@/pages/projects/ProjectWorkflows'
import ProjectVdr from '@/pages/projects/ProjectVdr'
import ProjectEngineering from '@/pages/projects/ProjectEngineering'
import EngineeringDashboard from '@/pages/EngineeringDashboard'
import Search from '@/pages/Search'
import Reports from '@/pages/Reports'
import Users from '@/pages/Users'
import Roles from '@/pages/Roles'
import Audit from '@/pages/Audit'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'
import Branches from '@/pages/admin/Branches'
import Departments from '@/pages/admin/Departments'
import Employers from '@/pages/admin/Employers'
import Permissions from '@/pages/admin/Permissions'
import CodeFormats from '@/pages/admin/CodeFormats'
import DocumentCoding from '@/pages/admin/DocumentCoding'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/engineering" element={<EngineeringDashboard />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<ProjectNew />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/configuration" element={<ProjectConfiguration />} />
            <Route path="/projects/:id/teams" element={<ProjectTeams />} />
            <Route path="/projects/:id/workflows" element={<ProjectWorkflows />} />
            <Route path="/projects/:id/vdr" element={<ProjectVdr />} />
            <Route path="/projects/:id/engineering" element={<ProjectEngineering />} />

            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/upload" element={<Upload />} />
            <Route path="/documents/revisions" element={<Revisions />} />
            <Route path="/documents/transmittals" element={<Transmittals />} />

            <Route path="/workflow/reviews" element={<Workflow mode="reviews" />} />
            <Route path="/workflow/approvals" element={<Workflow mode="approvals" />} />
            <Route path="/workflow/tasks" element={<Tasks />} />

            <Route path="/mto" element={<Mto />} />
            <Route path="/mto/generate" element={<MtoGenerate />} />
            <Route path="/mto/compare" element={<MtoCompare />} />

            <Route path="/search" element={<Search />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/roles" element={<Roles />} />
            <Route path="/admin/branches" element={<Branches />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/employers" element={<Employers />} />
            <Route path="/admin/permissions" element={<Permissions />} />
            <Route path="/admin/code-formats" element={<CodeFormats />} />
            <Route path="/admin/document-coding" element={<DocumentCoding />} />

            {/* Legacy paths */}
            <Route path="/users" element={<Navigate to="/admin/users" replace />} />
            <Route path="/roles" element={<Navigate to="/admin/roles" replace />} />

            <Route path="/audit" element={<Audit />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  )
}
