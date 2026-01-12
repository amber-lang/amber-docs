'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import style from './FullPage.module.css'
import Markdown from '@/components/Markdown/Markdown'
import NavigationLayout from '@/layouts/NavigationLayout/NavigationLayout'
import useVersion from '@/contexts/VersionContext/useVersion'
import Link from 'next/link'
import FullPageSideBar from './SideBar/FullPageSideBar'
import FullPageRightSidebar from './RightSidebar/FullPageRightSidebar'
import SettingsGrid from '@/components/SettingsGrid/SettingsGrid'
import Sheet from '@/components/Sheet/Sheet'
import SearchBar from '@/components/SearchBar/SearchBar'

interface DocContent {
    path: string
    title: string
    content: string
    section: string
}

const LAST_SECTION_KEY = 'amber-docs-last-section'
export const SCROLL_OFFSET = 110

export default function FullPage() {
    const { version } = useVersion()
    const [docs, setDocs] = useState<DocContent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasScrolled, setHasScrolled] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const docRefs = useRef<Map<string, HTMLDivElement>>(new Map())

    // Fetch all docs
    useEffect(() => {
        async function fetchDocs() {
            try {
                setIsLoading(true)
                const res = await fetch(`/api/all-docs?v=${encodeURIComponent(version)}`)
                if (!res.ok) throw new Error('Failed to fetch documents')
                const data = await res.json()
                setDocs(data.docs)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }
        fetchDocs()
    }, [version])

    // Set up IntersectionObserver to track visible section
    useEffect(() => {
        if (docs.length === 0) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const path = entry.target.getAttribute('data-doc-path')
                        if (path) {
                            localStorage.setItem(LAST_SECTION_KEY, path)
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

        docRefs.current.forEach((el) => {
            observerRef.current?.observe(el)
        })

        return () => {
            observerRef.current?.disconnect()
        }
    }, [docs])

    // Scroll to last section once docs are loaded
    useEffect(() => {
        if (docs.length === 0 || hasScrolled) return

        const lastSection = localStorage.getItem(LAST_SECTION_KEY)
        
        if (lastSection) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const element = docRefs.current.get(lastSection)
                if (element) {
                    const elementTop = element.getBoundingClientRect().top + window.scrollY
                    window.scrollTo({ top: Math.max(elementTop - SCROLL_OFFSET, 0), behavior: 'auto' })
                }
                setHasScrolled(true)
            }, 100)
        } else {
            setHasScrolled(true)
        }
    }, [docs, hasScrolled])

    const setDocRef = useCallback((path: string, el: HTMLDivElement | null) => {
        if (el) {
            docRefs.current.set(path, el)
        } else {
            docRefs.current.delete(path)
        }
    }, [])

    if (isLoading) {
        return (
            <NavigationLayout>
                <div className={style.loading}>
                    <div className={style.loadingLogo} />
                </div>
            </NavigationLayout>
        )
    }

    if (error) {
        return (
            <NavigationLayout>
                <div className={style.error}>
                    <div className={style.errorMessage}>{error}</div>
                    <Link href={`/${version}`} className={style.backButton}>
                        Go back
                    </Link>
                </div>
            </NavigationLayout>
        )
    }

    // Group docs by section
    const sections = docs.reduce<Record<string, DocContent[]>>((acc, doc) => {
        if (!acc[doc.section]) {
            acc[doc.section] = []
        }
        acc[doc.section].push(doc)
        return acc
    }, {})

    const sectionOrder = [...new Set(docs.map(d => d.section))]

    return (
        <NavigationLayout>
            <div className='left'>
                <FullPageSideBar docs={docs} isFixed />
            </div>
            <div className='right'>
                <div className={style.container}>
                    {sectionOrder.map((section) => (
                        <div key={section} data-section={section}>
                            <h1 className={style.sectionTitle}>{section}</h1>
                            {sections[section].map((doc) => (
                                <div
                                    key={doc.path}
                                    ref={(el) => setDocRef(doc.path, el)}
                                    data-doc-path={doc.path}
                                    className={style.docContent}
                                >
                                    {doc.title !== section && (
                                        <h1 className={style.docTitle}>{doc.title}</h1>
                                    )}
                                    <Markdown content={doc.content} currentPath={`/${version}/${doc.path}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <FullPageRightSidebar docs={docs} />
            <Sheet>
                <div className={style.search}>
                    <SearchBar variant='body' dockable />
                </div>
                <FullPageSideBar docs={docs} />
                <SettingsGrid />
            </Sheet>
        </NavigationLayout>
    )
}
