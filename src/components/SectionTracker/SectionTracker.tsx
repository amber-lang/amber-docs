'use client'

import { useEffect } from 'react'

const LAST_SECTION_KEY = 'amber-docs-last-section'

interface Props {
    path: string
}

export default function SectionTracker({ path }: Props) {
    useEffect(() => {
        // Save the current section to localStorage
        localStorage.setItem(LAST_SECTION_KEY, path)
    }, [path])

    return null
}
