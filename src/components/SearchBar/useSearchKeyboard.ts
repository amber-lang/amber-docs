import { useState, useEffect } from 'react'
import { SearchResult } from './types'

/**
 * Manages keyboard navigation and global shortcuts.
 */
export function useSearchKeyboard(
    result: SearchResult[], 
    inputRef: React.RefObject<HTMLInputElement | null>, 
    setIsInputFocused: (val: boolean) => void
) {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(-1)
    }, [result])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault()
            inputRef.current?.blur()
            setIsInputFocused(false)
            return
        }

        if (!result.length) return

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setSelectedIndex(prev => (prev + 1) % result.length)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setSelectedIndex(prev => (prev - 1 + result.length) % result.length)
        } else if (event.key === 'Enter') {
            event.preventDefault()
            const targetIndex = selectedIndex >= 0 ? selectedIndex : 0
            if (result[targetIndex]) {
                window.location.href = `/${result[targetIndex].path}`
            }
        }
    }

    // Global shortcut (Cmd/Ctrl+K)
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleGlobalKeyDown)
        return () => window.removeEventListener('keydown', handleGlobalKeyDown)
    }, [inputRef])

    return { selectedIndex, handleKeyDown, setSelectedIndex }
}
