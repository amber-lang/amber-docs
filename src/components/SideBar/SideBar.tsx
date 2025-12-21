'use client'

import React, { useEffect } from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'
import { DocDescriptor } from '@/utils/docs'
import { TocSection } from '@/utils/docsServer'
import Link from 'next/link'
import PrefetchLink from '@/components/PrefetchLink'
import useSidebar from '@/contexts/DocumentContext/useSidebar'
import useVersion from '@/contexts/VersionContext/useVersion'
import { generateUrl, slugify } from '@/utils/urls'

import OnThisPage from '@/components/OnThisPage/OnThisPage'

interface Props {
    headers: string[]
    docDesc?: DocDescriptor
    toc?: TocSection[]
    isFixed?: boolean
}

export default function SideBar({ headers, docDesc, toc = [], isFixed = false }: Props) {
    const { version } = useVersion()
    const { isOpen } = useSidebar()
    const tocRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (tocRef.current && isFixed) {
            const tocHeight = tocRef.current.clientHeight

            const setSize = () => {
                if (!tocRef.current) return
                // Calculate "table of content" height based on "on this page" height
                const otpReserved = headers.length > 0 ? 'var(--otp-reserved-height, 0px)' : '0px';
                tocRef.current.style.height = `calc(100svh - 200px - ${otpReserved})`
                if (tocHeight < tocRef.current.clientHeight) {
                    tocRef.current.style.height = `${tocHeight}px`
                }
            }

            addEventListener('resize', setSize)
            setSize()
        }
    }, [])

    useEffect(() => {
        if (!docDesc) return;
        const currentDoc = document.querySelector(`[path="${docDesc.path}"]`)
        if (currentDoc) {
            currentDoc.scrollIntoView({ block: 'center' })
        }
    }, [])

    return (
        <div className={`${isFixed && style.fixed} ${isOpen && style.open}`}>
            <div className={`${style.container}`}>
                <div className={style.onThisPageWrapper}>
                    <OnThisPage headers={headers} docDesc={docDesc} />
                </div>
                {headers.length > 0 && <div className={style.spacer}/>}
                <Island label="Table of contents">
                    <div className={[style.links, !headers.length && style.toc].join(' ')} ref={tocRef}>
                        {toc.map(({ path, title, docs }) => (
                                <React.Fragment key={path}>
                                    <PrefetchLink href={`/${generateUrl(version, path)}`} key={path} docPath={`${version}/${path}`}>
                                        <Text block>
                                            <div className={style.indent} {...{ indent: "0", path }}>{title}</div>
                                        </Text>
                                    </PrefetchLink>
                                    {docs && docs.map(({ path, title }, index) => (
                                        <React.Fragment key={path}>
                                            <PrefetchLink href={`/${generateUrl(version, path)}`} docPath={`${version}/${path}`}>
                                                <Text block>
                                                    <div
                                                        className={style.indent}
                                                        style={{ '--distance': '0' } as any}
                                                        {...{ indent: 1, path, relation: index === 0 ? 'child' : 'sibling' }}
                                                    >
                                                        {title}
                                                    </div>
                                                </Text>
                                            </PrefetchLink>
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )
                        )}
                    </div>
                </Island>
            </div>
        </div>
    )
}

