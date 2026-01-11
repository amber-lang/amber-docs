'use client'

import React, { useEffect, useState } from 'react'
import useSidebar from '@/contexts/DocumentContext/useSidebar'
import style from './FullPageRightSidebar.module.css'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'

interface DocContent {
    path: string
    title: string
    section: string
}

interface Props {
    docs: DocContent[]
    currentDocPath?: string
}

export default function FullPageRightSidebar({ docs, currentDocPath }: Props) {
    const { isOpen } = useSidebar()
    const [activeDocPath, setActiveDocPath] = useState<string | null>(currentDocPath ?? null)

    // Track which document is currently visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const path = entry.target.getAttribute('data-doc-path')
                        if (path) {
                            setActiveDocPath(path)
                        }
                        break
                    }
                }
            },
            {
                root: null,
                rootMargin: '-100px 0px -50% 0px',
                threshold: 0
            }
        )

        // Observe all doc elements
        const docElements = document.querySelectorAll('[data-doc-path]')
        docElements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [docs])

    // Find current section
    const activeDoc = docs.find(d => d.path === activeDocPath)

    return (
        <div className={`${style.aside} ${isOpen ? style.open : ''}`}>
            <div className={style.container}>
                {activeDoc && (
                    <Island label=''>
                        <div className={style.currentLabel}>Currently reading</div>
                        <div className={style.currentTitle}>{activeDoc.title}</div>
                    </Island>
                )}
            </div>
        </div>
    )
}
