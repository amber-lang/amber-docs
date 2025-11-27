import { ThemeConfig } from './config'

function camelToKebab(camelCase: string) {
    return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function getCssVariables(theme: ThemeConfig, mode: 'light' | 'dark'): string {
    return Object.entries(theme[mode]).map(
        ([key, value]) => `--${camelToKebab(key)}: ${value};`
    ).join('\n')
}

interface Props {
    theme: ThemeConfig
}

export default function ThemeStyles({ theme }: Props) {
    const lightVars = getCssVariables(theme, 'light')
    const darkVars = getCssVariables(theme, 'dark')

    return (
        <style dangerouslySetInnerHTML={{
            __html: `
                :root[mode="light"] {
                    ${lightVars}
                }
                :root[mode="dark"] {
                    ${darkVars}
                }
            `
        }} />
    )
}
