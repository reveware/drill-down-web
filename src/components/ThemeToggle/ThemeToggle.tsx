'use client'

import { useCallback, useEffect, useState } from 'react'
import { Sun, Moon } from '@/components/Icons'

const THEME_KEY = 'theme'
type Theme = 'light' | 'dark'

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => 'light')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    setTheme(stored || 'light')
  }, [])


  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
    [],
  )

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex items-center justify-center w-fit h-fit p-2 rounded-full 
      border-2 border-accent-dark
      bg-accent
      text-surface 
      hover:opacity-80 
      "
    >
      {theme === 'light' ? <Moon size={25} /> : <Sun size={25} />}
    </button>
  )
}
