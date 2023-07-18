'use client'

import React, { createContext } from 'react'
import { ThemeMode, ThemeConfig } from './config'

interface Context {
    theme: ThemeConfig,
    mode: ThemeMode,
    setThemeMode: (value: ThemeMode) => void
}

// Create context based on the os preference
export const ThemeContext = createContext<Context | null>(null)

export default function useTheme(): Context {
    const ctx = React.useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
    return ctx
}