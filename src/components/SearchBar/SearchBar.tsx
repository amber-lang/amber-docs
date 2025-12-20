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
    placeholder?: string
}

function useSearchResult(version: string, query: string) {
    const { data, error } = useSWR(query ? `/api/search?v=${version}&q=${query}` : null, (url) => fetch(url).then(res => res.json()))
    return { result: data?.results.slice(0, 5) ?? [], isLoading: !error && !data, error }
}

export default function SearchBar({ variant = 'body', placeholder = 'Search documentation' }: Props) {
    const { version } = useVersion()
    const [query, setQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [dropdownPos, setDropdownPos] = useState<{ left: number, top: number, width: number } | null>(null)
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

    // Update dropdown position when focused
    useEffect(() => {
        if (isInputFocused && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setDropdownPos({
                left: rect.left + rect.width / 2,
                top: rect.bottom + 8,
                width: 400
            })
        }
    }, [isInputFocused])

    const dropdown = (
        <div 
            className={[style.options, showResults && style.show].join(' ')}
            style={dropdownPos ? {
                position: 'fixed',
                left: dropdownPos.left,
                top: dropdownPos.top,
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

    return (
        <div ref={containerRef} className={[style[variant], style.base].join('\n')}>
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
        </div>
    )
}
