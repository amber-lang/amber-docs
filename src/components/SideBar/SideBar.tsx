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

export default function SideBar({ headers, isFixed = false }: Props) {
    const topics = getTableOfContents()
    const { isOpen } = useSidebar()

    const getHeaderLink = (header: string) => {
        return ['#', header.toLowerCase().replace(/[^\w]+/g, '-')].join('')
    }

    return (
        <div className={`${isFixed && style.fixed} ${isOpen && style.open}`}>
            <div className={`${style.container}`}>
                {headers.length > 0 && (
                    <Island label="On this page">
                        <div className={style.links}>
                            {headers.map(header => (
                                <Link href={getHeaderLink(header)} key={header}>
                                    <Text block>{header}</Text>
                                </Link>
                            ))}
                        </div>
                    </Island>
                )}
                <div className={style.spacer}/>
                <Island label="Table of contents">
                    <div className={style.links}>
                        {topics.map(({ path, title }) => (
                            <Link href={path} key={path}><Text block>{title}</Text></Link>
                        ))}
                    </div>
                </Island>
            </div>
        </div>
    )
}