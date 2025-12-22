'use client'

import { useDebounceCallback } from 'usehooks-ts'
import style from './SearchBar.module.css'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useVersion from '@/contexts/VersionContext/useVersion'
import Icon from '@/components/Icon/Icon'
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useInteractions, FloatingPortal } from '@floating-ui/react'
import { Props } from './types'
import { useSearchResult } from './useSearchResult'
import { useDockedSearch } from './useDockedSearch'
import { useSearchKeyboard } from './useSearchKeyboard'
import { SearchDropdown } from './SearchDropdown'

export default function SearchBar({ variant = 'body', placeholder = 'Search documentation', dockable = false }: Props) {
    const { version } = useVersion()
    const [query, setQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const internalRef = useRef<HTMLDivElement | null>(null)
    const { result, isLoading } = useSearchResult(version, query)
    const { isDocked } = useDockedSearch(isInputFocused, dockable, inputRef, internalRef)
    const { selectedIndex, handleKeyDown, setSelectedIndex } = useSearchKeyboard(result, inputRef, setIsInputFocused)

    // Floating UI
    const { refs, floatingStyles, context, placement } = useFloating({
        open: isInputFocused,
        onOpenChange: setIsInputFocused,
        middleware: [
            offset(8),
            flip({ fallbackAxisSideDirection: 'end' }),
            shift({ padding: 10 })
        ],
        whileElementsMounted: autoUpdate,
        placement: 'bottom',
        strategy: 'fixed'
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useDismiss(context)
    ])

    // Sync floating ref
    useEffect(() => {
        if (internalRef.current) {
            refs.setReference(internalRef.current)
        }
    }, [internalRef, refs])

    const debounceQuery = useDebounceCallback((val) => {
        setQuery(val)
        setSelectedIndex(-1)
    }, 500)

    const showResults = isInputFocused && query.length > 0 && !isLoading
    // Viewport tracking for mobile keyboard
    const [bottomOffset, setBottomOffset] = useState(0)

    useEffect(() => {
        if (!isDocked || typeof window === 'undefined' || !window.visualViewport) return

        const updateOffset = () => {
            const vvh = window.visualViewport?.height || window.innerHeight
            const vh = window.innerHeight // Use innerHeight for the layout viewport height
            // When keyboard is visible, visualViewport is smaller than innerHeight
            // We want to lift the search bar by the difference
            setBottomOffset(vh - vvh)
        }

        updateOffset()
        window.visualViewport.addEventListener('resize', updateOffset)
        window.visualViewport.addEventListener('scroll', updateOffset)

        return () => {
            window.visualViewport?.removeEventListener('resize', updateOffset)
            window.visualViewport?.removeEventListener('scroll', updateOffset)
        }
    }, [isDocked])

    return (
        <div 
            ref={internalRef} 
            className={[style[variant], !isDocked && style.base, isDocked && style.docked].filter(Boolean).join(' ')}
            style={isDocked ? { bottom: bottomOffset } : undefined}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                onChange={(e) => debounceQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
                onKeyDown={handleKeyDown}
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
            />
            
            {!query && !isInputFocused && (
                <div className={style.shortcut}>
                    <Icon src="/internal/shortcut.svg" size="40px" color="var(--description)" />
                </div>
            )}

            {typeof window !== 'undefined' ? (
                <FloatingPortal>
                    <SearchDropdown 
                        results={result}
                        selectedIndex={selectedIndex}
                        show={showResults}
                        isDocked={isDocked}
                        refs={refs}
                        floatingStyles={floatingStyles}
                        getFloatingProps={getFloatingProps}
                        placement={placement}
                        onSelect={() => setIsInputFocused(false)}
                    />
                </FloatingPortal>
            ) : null}

            {isDocked && typeof window !== 'undefined' && createPortal(
                <div className={style.backdrop} onClick={() => inputRef.current?.blur()} />,
                document.body
            )}
        </div>
    )
}
