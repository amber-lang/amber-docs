'use client'

import React, { useEffect, useState } from 'react'
import { ThemeContext } from './useTheme'
import { ThemeMode, ThemeConfig, defaultThemeConfig } from './config'
import dynamic from 'next/dynamic'

const CssVariableStyles = dynamic(() => import('./CssVariableStyles'), { ssr: false })

interface Props {
    children: React.ReactNode,
    mode?: ThemeMode,
    theme?: ThemeConfig
}

// Get the OS preference
const osTheme = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : 'light'

export default function ThemeProvider({ children, mode, theme }: Props) {
    const [themeMode, setThemeMode] = useState<ThemeMode>(mode ?? osTheme)
    const globalTheme = theme ?? defaultThemeConfig()

    useEffect(() => {
        setThemeMode(mode ?? osTheme)
    }, [mode])

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setThemeMode(event.matches ? 'dark' : 'light')
        })
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                theme: theme ?? defaultThemeConfig(),
                mode: themeMode,
                setThemeMode: (value: ThemeMode) => setThemeMode(value)
            }}
        >
            <CssVariableStyles theme={globalTheme} mode={themeMode} />
            {children}
        </ThemeContext.Provider>
    )
}