'use client'

import { useDebounce } from 'usehooks-ts'
import style from './SearchBar.module.css'
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

type Variant = 'body' | 'title'

interface Props {
    variant?: Variant,
    placeholder?: string
}

function useSearchResult(query: string) {
    const { data } = useSWR(query ? `/api/search?q=${query}` : null, (url) => fetch(url).then(res => res.json()))
    return { result: data?.results ?? [] }
}

export default function SearchBar({ variant = 'body', placeholder = 'Search' }: Props) {
    const [query, setQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const debouncedQuery = useDebounce(query, 500)
    const { result } = useSearchResult(debouncedQuery)
    const showResults = result?.length > 0 && isInputFocused;
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <div className={[style[variant], style.base].join('\n')}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
            />
            <div className={[style.options, showResults && style.show].join(' ')}>
                {result?.map((item: any) => (
                    <Link href={item.path} key={item.path}>
                        <div className={style.option}>{item.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}