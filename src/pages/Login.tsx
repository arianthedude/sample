import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import { portalUsers } from '@/data/mock'
import { apiRoutes } from '@/lib/api'

export default function Login() {
  const nav = useNavigate()
  const [nationalCode, setNationalCode] = useState('0012345678')
  const [employeeCode, setEmployeeCode] = useState('EMP0001')
  const [loading, setLoading] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const user = portalUsers.find(u => u.nationalCode === nationalCode && u.employeeCode === employeeCode)
      if (user) {
        localStorage.setItem('portal-token', 'mock-token')
        localStorage.setItem('portal-user', JSON.stringify(user))
        nav('/')
      } else {
        alert('Invalid credentials. Try national code 0012345678 / EMP0001')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="text-primary-600 dark:text-primary-400"><Icon.Logo size={32} /></span>
          <div>
            <div className="font-semibold text-lg text-ink-900 dark:text-ink-50">Stratum</div>
            <div className="text-xs text-ink-400 uppercase tracking-wide">Portal sign in</div>
          </div>
        </div>

        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5">National code</label>
            <input value={nationalCode} onChange={e => setNationalCode(e.target.value)} className="input font-mono" placeholder="0012345678" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5">Employee code</label>
            <input value={employeeCode} onChange={e => setEmployeeCode(e.target.value)} className="input font-mono" placeholder="EMP0001" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-[11px] text-ink-400 text-center">
            POST {apiRoutes.auth.login}
          </p>
        </form>
      </div>
    </div>
  )
}
