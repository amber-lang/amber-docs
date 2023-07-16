export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
    light: ThemePalette,
    dark: ThemePalette
}

interface ThemePalette {
    description: string,
    shadow: string
    shine: string,
    border: string,
    background: string
}

export const defaultThemeConfig = (): ThemeConfig => ({
    light: {
        description: '#777',
        shadow: '#90909022',
        shine: '#ffffff88',
        border: '#ccc',
        background: '#fff'
    },
    dark: {
        description: '#7c6564',
        shadow: '#00000022',
        shine: '#573432',
        border: '#6b4a3e',
        background: '#191513'
    }
})

