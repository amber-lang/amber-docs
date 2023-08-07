'use client'

import React from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'
import { getTableOfContents } from '@/utils/docs'
import Link from 'next/link'
import { useDocument } from '@/contexts/DocumentContext/index'

interface Props {}

export default function SideBar({}: Props) {
    const topics = getTableOfContents()
    const { headers } = useDocument()

    return (
        <div>
            {headers.length > 0 && (
                <Island label="On this page">
                    <div className={style.links}>
                        {headers.map(header => (
                            <Link href={`#${header}`} key={header}><Text block>{header}</Text></Link>
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
    )
}