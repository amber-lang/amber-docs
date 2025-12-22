import useSWR from 'swr'
import { SearchResult } from './types'
import { useMemo } from 'react'

/**
 * Manages data fetching for search results.
 */
export function useSearchResult(version: string, query: string) {
    const { data, error } = useSWR(
        query ? `/api/search?v=${version}&q=${query}` : null, 
        (url) => fetch(url).then(res => res.json())
    )
    
    return useMemo(() => ({ 
        result: (data?.results.slice(0, 5) ?? []) as SearchResult[], 
        isLoading: !error && !data, 
        error 
    }), [data, error])
}
