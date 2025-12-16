'use client'

import React, { createContext, useCallback } from 'react'
import useSWR, { preload } from 'swr'

export interface CachedDocument {
    content: string
    headers: string[]
}

interface DocsCacheContext {
    prefetch: (path: string) => void
    useDocument: (path: string | null) => {
        document: CachedDocument | null
        isLoading: boolean
        error: Error | null
    }
}

const fetcher = async (url: string): Promise<CachedDocument> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch document')
    const data = await res.json()
    return {
        content: data.doc ?? '',
        headers: data.headers ?? []
    }
}

const getDocUrl = (path: string) => `/api/doc?file=${encodeURIComponent(path)}`

export const DocsCacheContext = createContext<DocsCacheContext | null>(null)

export function useDocsCache(): DocsCacheContext {
    const ctx = React.useContext(DocsCacheContext)
    if (!ctx) throw new Error('useDocsCache must be used within a DocsCacheProvider')
    return ctx
}

export function useDocument(path: string | null) {
    const url = path ? getDocUrl(path) : null
    const { data, error, isLoading } = useSWR<CachedDocument>(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1 minute deduplication
    })
    
    return {
        document: data ?? null,
        isLoading,
        error: error ?? null
    }
}

export function prefetchDocument(path: string) {
    const url = getDocUrl(path)
    preload(url, fetcher)
}
