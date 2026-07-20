import { useEffect, useState, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      const t = localStorage.getItem('edms-theme')
      if (t === 'light' || t === 'dark') return t
    }
    return 'dark'
  })
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('edms-theme', theme)
  }, [theme])
  const toggle = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
