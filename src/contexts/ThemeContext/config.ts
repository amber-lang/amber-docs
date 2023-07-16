export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
    light: ThemePalette,
    dark: ThemePalette
}

interface ThemePalette {
    text: string,
    description: string,
    shadow: string
    shine: string,
    border: string,
    background: string
}

export const defaultThemeConfig = (): ThemeConfig => ({
    light: {
        text: '#000',
        description: '#777',
        shadow: '#909090',
        shine: '#ffffff',
        border: '#ccc',
        background: '#fff'
    },
    dark: {
        text: '#fff',
        description: '#7c6564',
        shadow: '#5e473c',
        shine: '#864a48',
        border: '#6b4a3e',
        background: '#191513'
    }
})

