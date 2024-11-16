'use client'

import { useDebounceCallback } from 'usehooks-ts'
import style from './SearchBar.module.css'
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import useVersion from '@/contexts/VersionContext/useVersion'

type Variant = 'body' | 'title'

interface Props {
    variant?: Variant,
    placeholder?: string
}

function useSearchResult(version: string, query: string) {
    const { data, error } = useSWR(query ? `/api/search?v=${version}&q=${query}` : null, (url) => fetch(url).then(res => res.json()))
    return { result: data?.results.slice(0, 3) ?? [], isLoading: !error && !data, error }
}

export default function SearchBar({ variant = 'body', placeholder = 'Search documentation' }: Props) {
    const { version } = useVersion()
    const [query, setQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const debounceQuery = useDebounceCallback(setQuery, 500)
    const { result, isLoading } = useSearchResult(version, query)
    const showResults = isInputFocused && query.length > 0 && !isLoading

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debounceQuery(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && result.length > 0) {
            window.location.href = `/${result[0].path}`
        }
    }

    return (
        <div className={[style[variant], style.base].join('\n')}>
            <input
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
            <div className={[style.options, showResults && style.show].join(' ')}>
                {result?.map((item: any) => (
                    <Link href={`/${item.path}`} key={item.path}>
                        <div className={style.option}>{item.title}</div>
                    </Link>
                ))}
                {result?.length === 0 && (
                    <div className={[style.option, style.disabled].join(' ')}>No results found</div>
                )}
            </div>
        </div>
    )
}
