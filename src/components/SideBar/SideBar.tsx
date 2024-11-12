'use client'

import React, { useEffect } from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'
import { DocDescriptor } from '@/utils/docs'
import { TocSection } from '@/utils/docsServer'
import Link from 'next/link'
import useSidebar from '@/contexts/DocumentContext/useSidebar'

interface Props {
    headers: string[],
    docDesc?: DocDescriptor,
    toc: TocSection[],
    isFixed?: boolean
}

type Header = {
    level: number,
    title: string,
    relation: string,
    distance: number
}

function getHeaderLevel(header: string): number {
    const matches = header.match(/^#+\s/)
    return matches![0].length - 1
}

function getRelation(level: number, prevLevel: number): string {
    switch (level - prevLevel) {
        case 1:
            return 'child'
        case 0:
            return 'sibling'
        default:
            return 'detached'
    }
}

function getHeaders(headers: string[]): Header[] {
    let distances = [0, 0, 0]
    let prevLevel = NaN
    return headers.map(header => {
        const level = Math.min(getHeaderLevel(header), 3) - 1
        const relation = getRelation(level, prevLevel)
        const distance = distances[level]
        for (const i of distances.keys()) {
            if (i < level) distances[i]++
            else if (i >= level) distances[i] = 0
        }
        prevLevel = level
        return {
            level,
            title: header.replace(/^#+\s/, '').replaceAll(/`([^`]+)`/g, '$1'),
            relation,
            distance
        }
    })
}

export default function SideBar({ headers, docDesc, toc = [], isFixed = false }: Props) {
    const { isOpen } = useSidebar()
    const formattedHeaders = getHeaders(headers)
    const onPageRef = React.useRef<HTMLDivElement>(null)
    const tocRef = React.useRef<HTMLDivElement>(null)

    const getHeaderLink = (header: string) => {
        return ['#', header.toLowerCase().replace(/[^\w]+/g, '-')].join('')
    }

    useEffect(() => {
        if (onPageRef.current && tocRef.current && isFixed) {
            const tocHeight = tocRef.current.clientHeight

            const setSize = () => {
                if (!tocRef.current || !onPageRef.current) return
                const height = onPageRef.current.clientHeight
                tocRef.current.style.height = `calc(100vh - ${height + 250}px)`
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
                {headers.length > 0 && (
                    <Island label="On this page">
                        <div className={[style.links, style.page].join(' ')} ref={onPageRef}>
                            {formattedHeaders.map(({ level, title, relation, distance }, index) => (
                                <Link href={getHeaderLink(title)} key={title + index}>
                                    <Text block>
                                        <div
                                            className={style.indent}
                                            style={{ '--distance': distance.toString()} as any}
                                            {...{ indent: level, relation }}
                                        >
                                            <div className={style.text}>
                                                {title}
                                            </div>
                                        </div>
                                    </Text>
                                </Link>
                            ))}
                        </div>
                    </Island>
                )}
                <div className={style.spacer}/>
                <Island label="Table of contents">
                    <div className={[style.links, !headers.length && style.toc].join(' ')} ref={tocRef}>
                        {toc.map(({ path, title, docs }) => (
                                <React.Fragment key={path}>
                                    <Link href={`/${path}`} key={path}>
                                        <Text block>
                                            <div className={style.indent} {...{ indent: "0", path }}>{title}</div>
                                        </Text>
                                    </Link>
                                    {docs && docs.map(({ path, title }, index) => (
                                        <React.Fragment key={path}>
                                            <Link href={`/${path}`}>
                                                <Text block>
                                                    <div
                                                        className={style.indent}
                                                        style={{ '--distance': '0' } as any}
                                                        {...{ indent: 1, path, relation: index === 0 ? 'child' : 'sibling' }}
                                                    >
                                                        {title}
                                                    </div>
                                                </Text>
                                            </Link>
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
