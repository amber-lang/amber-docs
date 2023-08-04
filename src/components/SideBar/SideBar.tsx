'use client'

import React from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'
import { getTableOfContents } from '@/utils/docs'
import { usePathname } from 'next/navigation'

interface Props {}

export default function SideBar({}: Props) {
    const topics = getTableOfContents()
    const pathname = usePathname()

    return (
        <div>
            {pathname !== '/' && (
                <Island label="On this page">
                    <div className={style.links}>
                        <a href="/"><Text block>What is Amber?</Text></a>
                        <a href="/"><Text block>What is it not</Text></a>
                        <a href="/"><Text block>Main Advantages</Text></a>
                    </div>
                </Island>
            )}
            <div className={style.spacer}/>
            <Island label="Table of contents">
                <div className={style.links}>
                    {topics.map(({ path, title }) => (
                        <a href={path} key={path}><Text block>{title}</Text></a>
                    ))}
                </div>
            </Island>
        </div>
    )
}