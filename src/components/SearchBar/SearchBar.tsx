'use client'

import { useDebounceCallback } from 'usehooks-ts'
import style from './SearchBar.module.css'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useSWR from 'swr'
import Link from 'next/link'
import useVersion from '@/contexts/VersionContext/useVersion'
import Icon from '@/components/Icon/Icon'

type Variant = 'body' | 'title'

interface Props {
    variant?: Variant,
    placeholder?: string,
    dockable?: boolean
}

function useSearchResult(version: string, query: string) {
    const { data, error } = useSWR(query ? `/api/search?v=${version}&q=${query}` : null, (url) => fetch(url).then(res => res.json()))
    return { result: data?.results.slice(0, 5) ?? [], isLoading: !error && !data, error }
}

export default function SearchBar({ variant = 'body', placeholder = 'Search documentation', dockable = false }: Props) {
    const { version } = useVersion()
    const [query, setQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [dropdownPos, setDropdownPos] = useState<{ left: number, top?: number, bottom?: number, width: number, isFlipped: boolean } | null>(null)
    const [isDocked, setIsDocked] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const debounceQuery = useDebounceCallback((val) => {
        setQuery(val)
        setSelectedIndex(-1)
    }, 500)
    
    const { result, isLoading } = useSearchResult(version, query)
    const showResults = isInputFocused && query.length > 0 && !isLoading

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debounceQuery(event.target.value)
    }

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

    useEffect(() => {
        // Focus to search bar shortcut
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleGlobalKeyDown)
        return () => window.removeEventListener('keydown', handleGlobalKeyDown)
    }, [])

    // Update dropdown position and docked state
    useEffect(() => {
        if (isInputFocused && containerRef.current) {
            const updatePos = () => {
                if (!containerRef.current) return
                const rect = containerRef.current.getBoundingClientRect()
                const isMobile = window.innerWidth <= 1000
                const vh = window.innerHeight
                const vvh = window.visualViewport?.height || vh
                
                const isKeyboardOpen = isMobile && (vvh < vh * 0.9)
                const docked = isMobile && dockable && isInputFocused
                setIsDocked(docked)
                
                if (docked || isKeyboardOpen) {
                    const bottomOffset = vh - vvh
                    setDropdownPos({
                        left: docked ? window.innerWidth / 2 : rect.left + rect.width / 2,
                        bottom: (docked ? bottomOffset + 60 : (vh - rect.top)) + 8,
                        width: Math.min(400, window.innerWidth - 40),
                        isFlipped: true
                    })
                } else {
                    setDropdownPos({
                        left: rect.left + rect.width / 2,
                        top: rect.bottom + 8,
                        width: isMobile ? Math.min(400, window.innerWidth - 40) : 400,
                        isFlipped: false
                    })
                }
            }

            updatePos()
            window.visualViewport?.addEventListener('resize', updatePos)
            window.addEventListener('resize', updatePos)
            return () => {
                window.visualViewport?.removeEventListener('resize', updatePos)
                window.removeEventListener('resize', updatePos)
            }
        } else {
            setIsDocked(false)
        }
    }, [isInputFocused, dockable])

    // Use global listeners for docked state
    useEffect(() => {
        if (isDocked) {
            const handleScroll = () => {
                inputRef.current?.blur()
            }
            // Delay adding the scroll listener to avoid triggering it on initial layout shift (keyboard opening)
            const timer = setTimeout(() => {
                window.addEventListener('scroll', handleScroll, { passive: true })
            }, 500)
            
            return () => {
                clearTimeout(timer)
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [isDocked])

    const dropdown = (
        <div 
            className={[style.options, showResults && style.show, dropdownPos?.isFlipped && style.flip].filter(Boolean).join(' ')}
            style={dropdownPos ? {
                position: 'fixed',
                left: dropdownPos.left,
                top: dropdownPos.top ?? 'auto',
                bottom: dropdownPos.bottom ?? 'auto',
                width: dropdownPos.width,
                transform: 'translateX(-50%) translateZ(0)'
            } : undefined}
        >
            {result?.map((item: any, index: number) => (
                <Link href={`/${item.path}`} key={item.path} onClick={() => setIsInputFocused(false)}>
                    <div className={`${style.option} ${index === selectedIndex ? style.selected : ''}`}>
                        <Icon
                            src={item.matches >= 1000 ? '/internal/hash.svg' : '/internal/document.svg'}
                            size="14px"
                            color="var(--border)"
                        />
                        {item.parentTitle ? (
                            <span>
                                <span style={{ opacity: 0.5 }}>{item.parentTitle} {'>'} </span>
                                {item.title}
                            </span>
                        ) : (
                            item.title
                        )}
                    </div>
                </Link>
            ))}
            {result?.length === 0 && (
                <div className={[style.option, style.disabled].join(' ')}>No results found</div>
            )}
        </div>
    )

    const vvh = typeof window !== 'undefined' ? (window.visualViewport?.height || window.innerHeight) : 0
    const vh = typeof window !== 'undefined' ? window.innerHeight : 0

    return (
        <div 
            ref={containerRef} 
            className={[style[variant], !isDocked && style.base, isDocked && style.docked].filter(Boolean).join(' ')}
            style={isDocked ? {
                bottom: vh - vvh
            } : undefined}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
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
            {typeof window !== 'undefined' ? createPortal(dropdown, document.body) : dropdown}
            {isDocked && typeof window !== 'undefined' && createPortal(
                <div className={style.backdrop} onClick={() => inputRef.current?.blur()} />,
                document.body
            )}
        </div>
    )
}
