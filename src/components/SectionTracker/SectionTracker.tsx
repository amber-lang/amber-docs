'use client'

import { useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const LAST_SECTION_KEY = 'amber-docs-last-section'

interface Props {
    path: string
}

/**
 * Persists the provided section path as the last visited section.
 *
 * The path is saved whenever the `path` value changes.
 *
 * @param path - The current section path to record as the last visited
 */
export default function SectionTracker({ path }: Props) {
    const { setItem } = useLocalStorage()

    useEffect(() => {
        setItem(LAST_SECTION_KEY, path)
    }, [path, setItem])

    return null
}
