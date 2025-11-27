'use client'

import React, { useEffect, useState } from 'react'
import { ThemeContext } from './useTheme'
import { ThemeMode, ThemeConfig, defaultThemeConfig } from './config'

interface Props {
    children: React.ReactNode,
    mode?: ThemeMode,
    theme?: ThemeConfig
}

export default function ThemeProvider({ children, mode, theme }: Props) {
    const [themeMode, setThemeMode] = useState<ThemeMode | null>(null)
    const globalTheme = theme ?? defaultThemeConfig()

    useEffect(() => {
        // Sync state with the attribute set by ThemeScript
        const currentMode = document.documentElement.getAttribute('mode') as ThemeMode
        if (currentMode) {
            setThemeMode(currentMode)
        } else {
            setThemeMode('light')
        }
    }, [])

    useEffect(() => {
        if (!themeMode) return
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
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (!metaThemeColor) {
             document.head.insertAdjacentHTML('beforeend', `<meta name="theme-color" content="${globalTheme[themeMode || 'light'].background}">`)
        }
    }, [])

    useEffect(() => {
        if (!themeMode) return
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]')
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', globalTheme[themeMode].background)
        }
    }, [themeMode, globalTheme])

    const handleSetThemeMode = (value: ThemeMode) => {
        setThemeMode(value)
    }

    return (
        <ThemeContext.Provider
            value={{
                theme: globalTheme,
                mode: themeMode || 'light',
                setThemeMode: handleSetThemeMode
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}