'use client'

import React, { useCallback, useMemo } from 'react'
import { SWRConfig } from 'swr'
import { DocsCacheContext, prefetchDocument, useDocument } from './useDocsCache'

interface Props {
    children: React.ReactNode
}

export default function DocsCacheProvider({ children }: Props) {
    const prefetch = useCallback((path: string) => {
        prefetchDocument(path)
    }, [])

    const contextValue = useMemo(() => ({
        prefetch,
        useDocument
    }), [prefetch])

    return (
        <SWRConfig value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }}>
            <DocsCacheContext.Provider value={contextValue}>
                {children}
            </DocsCacheContext.Provider>
        </SWRConfig>
    )
}
