'use client'

import ReactDOM from 'react-dom'
import { ThemeMode, ThemeConfig } from './config'

function camelToKebab(camelCase: string) {
    // Insert a hyphen before all capital letters, convert the whole string to lowercase, and remove any whitespace.
    return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function getCssVariables(theme: ThemeConfig, mode: ThemeMode): string {
    return Object.entries(theme[mode]).map(
        ([key, value]) => `--${camelToKebab(key)}: ${value};`
    ).join('\n')
}

interface Props {
    theme: ThemeConfig,
    mode: ThemeMode
}

export default function CssVariableStyles({ theme, mode }: Props) {
    if (typeof document === 'undefined') return null
    const variables = getCssVariables(theme, mode)
    return ReactDOM.createPortal(
        <style>
            {[
                ':root {',
                variables,
                '}'
            ].join('\n')}
        </style>,
        document.head
    )
}