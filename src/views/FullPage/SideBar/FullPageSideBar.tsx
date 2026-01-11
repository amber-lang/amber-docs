'use client'

import React from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './FullPageSideBar.module.css'
import useSidebar from '@/contexts/DocumentContext/useSidebar'

interface DocContent {
    path: string
    title: string
    section: string
}

interface Props {
    docs: DocContent[]
    isFixed?: boolean
}

export default function FullPageSideBar({ docs, isFixed = false }: Props) {
    const { isOpen } = useSidebar()
    const tocRef = React.useRef<HTMLDivElement>(null)

    // Group docs by section
    const sections = docs.reduce<Record<string, DocContent[]>>((acc, doc) => {
        if (!acc[doc.section]) {
            acc[doc.section] = []
        }
        acc[doc.section].push(doc)
        return acc
    }, {})

    const sectionOrder = [...new Set(docs.map(d => d.section))]

    const scrollToDoc = (path: string) => {
        const element = document.querySelector(`[data-doc-path="${path}"]`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className={`${isFixed && style.fixed} ${isOpen && style.open}`}>
            <div className={style.container}>
                <Island label="Documentation">
                    <div className={style.links} ref={tocRef}>
                        {sectionOrder.map((section) => (
                            <React.Fragment key={section}>
                                <button
                                    onClick={() => scrollToDoc(sections[section][0].path)}
                                    className={style.sectionButton}
                                >
                                    <Text block>
                                        <div className={style.indent} data-indent="0">
                                            {section}
                                        </div>
                                    </Text>
                                </button>
                                {sections[section].map((doc, index) => (
                                    doc.title !== section && (
                                        <button
                                            key={doc.path}
                                            onClick={() => scrollToDoc(doc.path)}
                                            className={style.docButton}
                                        >
                                            <Text block>
                                                <div
                                                    className={style.indent}
                                                    style={{ '--distance': '0' } as React.CSSProperties}
                                                    data-indent="1"
                                                    data-relation={index === 0 ? 'child' : 'sibling'}
                                                >
                                                    {doc.title}
                                                </div>
                                            </Text>
                                        </button>
                                    )
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </Island>
            </div>
        </div>
    )
}
