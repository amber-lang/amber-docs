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
        background: '#fff',
        ...codeTheme.light
    },
    dark: {
        text: '#fff',
        description: '#7c6564',
        shadow: '#5e473c',
        shine: '#864a48',
        border: '#6b4a3e',
        background: '#191513',
        ...codeTheme.dark
    }
})

const codeTheme = {
    light: {
        codeKeyword: '#ca5ee9',
        codeNumber: '#d78e48',
        codeString: '#5daf23',
        codeCommand: '#05997b',
        codeInterp: '#c678dd',
        codeMeta: '#222',
        codeOperator: '#6fb4c0',
        codeVariable: '#d63d45',
        codeFunction: '#1778fc',
        codeBackground: '#f6f8fa',
        codeForeground: '#383a42',
        codeSnippet: '#d00b0b'
    },
    dark: {
        codeKeyword: '#c678dd',
        codeNumber: '#d19a66',
        codeString: '#98c379',
        codeCommand: '#30af95',
        codeInterp: '#c678dd',
        codeMeta: '#222',
        codeOperator: '#6fb4c0',
        codeVariable: '#d17277',
        codeFunction: '#589fff',
        codeBackground: '#2C2321',
        codeForeground: '#abb2bf',
        codeSnippet: '#e46767'
    }
}