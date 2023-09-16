export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
    light: ThemePalette,
    dark: ThemePalette
}

const constants = {
    accentGradientLeft: '#FF9E00',
    accentGradientRight: '#FF0000',
    accent: '#d35859',
    mobile: '576px'
}

const codeTheme = {
    light: {
        codeKeyword: '#ca5ee9',
        codeNumber: '#d78e48',
        codeString: '#5daf23',
        codeCommand: '#05997b',
        codeInterp: '#c678dd',
        codeMeta: '#222',
        codeOperator: '#6fb4c0',
        codeVariable: '#f1646b',
        codeFunction: '#1778fc',
        codeBackground: '#f6f8fa',
        codeForeground: '#383a42',
        codeComment: '#7d91a4',
        codeType: '#dd9e1e',
        codeSnippet: '#d00b0b'
    },
    dark: {
        codeKeyword: '#c678dd',
        codeNumber: '#c99c6e',
        codeString: '#98c379',
        codeCommand: '#30af95',
        codeInterp: '#c678dd',
        codeMeta: '#222',
        codeOperator: '#6fb4c0',
        codeVariable: '#d17277',
        codeFunction: '#589fff',
        codeBackground: '#2C2321',
        codeForeground: '#abb2bf',
        codeComment: '#9c7c6c',
        codeType: '#dfc184',
        codeSnippet: '#e46767'
    }
}

const theme = {
    light: {
        text: '#000',
        description: '#777',
        shadow: '#909090',
        shine: '#ffffff',
        border: '#ccc',
        background: '#fff',
        ...codeTheme.light,
        ...constants
    },
    dark: {
        text: '#fff',
        description: '#7c6564',
        shadow: '#5e473c',
        shine: '#552f2d',
        border: '#6b4a3e',
        background: '#191513',
        ...codeTheme.dark,
        ...constants
    }
}

type ThemePalette = typeof theme.light & typeof theme.dark
export const defaultThemeConfig = (): ThemeConfig => ({ ...theme })
