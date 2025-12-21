import useSWR from 'swr'
import { SearchResult } from './types'

/**
 * Manages data fetching for search results.
 */
export function useSearchResult(version: string, query: string) {
    const { data, error } = useSWR(
        query ? `/api/search?v=${version}&q=${query}` : null, 
        (url) => fetch(url).then(res => res.json())
    )
    return { 
        result: (data?.results.slice(0, 5) ?? []) as SearchResult[], 
        isLoading: !error && !data, 
        error 
    }
}
