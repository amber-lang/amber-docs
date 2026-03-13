'use client'

import { useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const LAST_SECTION_KEY = 'amber-docs-last-section'

interface Props {
    path: string
}

export default function SectionTracker({ path }: Props) {
    const { setItem } = useLocalStorage()

    useEffect(() => {
        setItem(LAST_SECTION_KEY, path)
    }, [path, setItem])

    return null
}
