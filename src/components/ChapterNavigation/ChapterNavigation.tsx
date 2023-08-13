'use client'

import React from 'react'
import style from './ChapterNavigation.module.css'
import { Text } from '../Text'
import { useDocument } from '@/contexts/DocumentContext'
import { getTableOfContents } from '@/utils/docs'
import Link from 'next/link'

interface Props {}

export default function ChapterNavigation({}: Props) {
    const toc = getTableOfContents()
    const { path } = useDocument()

    const index = toc.findIndex(item => item.path === path)
    const prev = toc[index - 1]
    const next = toc[index + 1]

    return (
        <div className={style.container}>
            <div className={`${style.part} ${style.left}`}>
                {prev && (
                    <>
                        <div className={`${style.reverse} ${style.icon}`}></div>
                        <Text><Link href={prev.path}>{prev.title}</Link></Text>
                    </>
                )}
            </div>
            <div className={`${style.part} ${style.center} ${style['page-indicator']}`}>
                <Text>{index + 1}/{toc.length}</Text>
            </div>
            <div className={`${style.part} ${style.right}`}>
                {next && (
                    <>
                        <Text><Link href={next.path}>{next.title}</Link></Text>
                        <div className={style.icon}></div>
                    </>
                )}
            </div>
        </div>
    )
}