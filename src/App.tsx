import { Routes, Route } from 'react-router-dom'
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
import Search from '@/pages/Search'
import Reports from '@/pages/Reports'
import Users from '@/pages/Users'
import Roles from '@/pages/Roles'
import Audit from '@/pages/Audit'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectNew />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}
