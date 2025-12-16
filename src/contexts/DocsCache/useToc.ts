'use client'

import useSWR from 'swr'
import { TocSection } from '@/utils/docsServer'

const fetcher = async (url: string): Promise<TocSection[]> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch TOC')
    const data = await res.json()
    return data.toc ?? []
}

export function useToc(version: string) {
    const { data, error, isLoading } = useSWR<TocSection[]>(
        `/api/toc?v=${encodeURIComponent(version)}`,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    )

    return {
        toc: data ?? [],
        isLoading,
        error: error ?? null
    }
}
