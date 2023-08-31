'use client'

import React from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'
import { getTableOfContents } from '@/utils/docs'
import Link from 'next/link'
import useSidebar from '@/contexts/DocumentContext/useSidebar'

interface Props {
    headers: string[],
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
        const level = getHeaderLevel(header) - 1
        const relation = getRelation(level, prevLevel)
        const distance = distances[level]
        for (const i of distances.keys()) {
            if (i < level) distances[i]++
            else if (i >= level) distances[i] = 0
        }
        prevLevel = level
        return {
            level,
            title: header.replace(/^#+\s/, ''),
            relation,
            distance
        }
    })
}

export default function SideBar({ headers, isFixed = false }: Props) {
    const topics = getTableOfContents()
    const { isOpen } = useSidebar()
    const formattedHeaders = getHeaders(headers)

    const getHeaderLink = (header: string) => {        
        return ['#', header.toLowerCase().replace(/[^\w]+/g, '-')].join('')
    }

    return (
        <div className={`${isFixed && style.fixed} ${isOpen && style.open}`}>
            <div className={`${style.container}`}>
                {headers.length > 0 && (
                    <Island label="On this page">
                        <div className={style.links}>
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
                    <div className={style.links}>
                        {topics.map(({ path, title, docs }) => (
                                <React.Fragment key={path}>
                                    <Link href={`/${path}`} key={path}>
                                        <Text block>
                                            <div className={style.indent}>{title}</div>
                                        </Text>
                                    </Link>
                                    {docs && docs.map(({ path, title }, index) => (
                                        <React.Fragment key={path}>
                                            <Link href={`/${path}`}>
                                                <Text block>
                                                    <div
                                                        className={style.indent}
                                                        style={{ '--distance': '0' } as any}
                                                        {...{ indent: 1, relation: index === 0 ? 'child' : 'sibling' }}
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