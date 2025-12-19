'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import { prefetchDocument } from '@/contexts/DocsCache'
import { getLocation } from '@/utils/urls'

interface Props extends React.ComponentProps<typeof Link> {
    /** The full path to prefetch (e.g., "0.5.1-alpha/getting_started/installation") */
    docPath?: string
    children: React.ReactNode
}

/**
 * A Link component that prefetches document content on hover.
 * Use `docPath` to specify the full document path for prefetching.
 * If not provided, it will try to extract it from the href.
 */
export default function PrefetchLink({ docPath, children, onMouseEnter, ...props }: Props) {
    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        // Get the document path to prefetch
        let pathToPrefetch = docPath
        
        if (!pathToPrefetch && typeof props.href === 'string') {
            // Extract path from href (remove leading slash)
            const href = props.href.startsWith('/') ? props.href.slice(1) : props.href
            // Skip hash-only links
            if (!href.startsWith('#') && href.length > 0) {
                // Use getLocation to properly parse version and slug
                const parts = href.split('/')
                const location = getLocation(parts)
                pathToPrefetch = location.fullPath
            }
        }

        if (pathToPrefetch) {
            prefetchDocument(pathToPrefetch)
        }

        // Call original handler if provided
        onMouseEnter?.(e)
    }, [docPath, props.href, onMouseEnter])

    return (
        <Link {...props} onMouseEnter={handleMouseEnter}>
            {children}
        </Link>
    )
}
