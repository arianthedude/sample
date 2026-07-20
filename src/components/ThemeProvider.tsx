import { createContext, useContext } from 'react'
import { useTheme } from '@/lib/useTheme'

type Ctx = ReturnType<typeof useTheme>
const ThemeCtx = createContext<Ctx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const v = useTheme()
  return <ThemeCtx.Provider value={v}>{children}</ThemeCtx.Provider>
}
export function useThemeCtx() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useThemeCtx outside provider')
  return c
}
