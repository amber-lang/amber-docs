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
        if (themeMode === 'dark') {
            document.documentElement.setAttribute('mode', 'dark')
        } else {
            document.documentElement.setAttribute('mode', 'light')
        }
    }, [themeMode])

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setThemeMode(event.matches ? 'dark' : 'light')
        })
        document.head.insertAdjacentHTML('beforeend', `<meta name="theme-color" content="${globalTheme[mode ?? osTheme].background}">`)
        document.documentElement.setAttribute('browser', (window as any).chrome ? 'chrome' : 'other')
    }, [])

    const handleSetThemeMode = (value: ThemeMode) => {
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]')
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', globalTheme[value].background)
        }
        setThemeMode(value)
    }

    return (
        <ThemeContext.Provider
            value={{
                theme: theme ?? defaultThemeConfig(),
                mode: themeMode,
                setThemeMode: handleSetThemeMode
            }}
        >
            <CssVariableStyles theme={globalTheme} mode={themeMode} />
            {children}
        </ThemeContext.Provider>
    )
}