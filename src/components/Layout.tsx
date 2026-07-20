import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CommandPalette } from './CommandPalette'
import { ThemeProvider } from './ThemeProvider'

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ThemeProvider>
      <div className="flex h-full min-h-0">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onMenu={() => setMenuOpen(true)} onCommand={() => setCmdOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6">{children}</div>
          </main>
        </div>
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </ThemeProvider>
  )
}
