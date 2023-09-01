'use client'

import React from 'react'
import style from './ChapterNavigation.module.css'
import { Text } from '../Text'
import { getFlatTableOfContents } from '@/utils/docs'
import Link from 'next/link'

interface Props {
    index: number
}

export default function ChapterNavigation({ index }: Props) {
    const toc = Array.from(getFlatTableOfContents())
    const prev = toc[index - 1]
    const next = toc[index + 1]
    return (
        <div className={style.container}>
            <div className={`${style.part} ${style.left}`}>
                {prev && (
                    <>
                        <div className={`${style.reverse} ${style.icon}`}></div>
                        <Text>
                            <Link href={`/${prev.path}`}>
                                <span className={style.text}>
                                    {prev.title}
                                </span>
                            </Link>
                        </Text>
                    </>
                )}
            </div>
            <div className={`${style.part} ${style.center} ${style['page-indicator']}`}>
                <Text>{index + 1}/{toc.length}</Text>
            </div>
            <div className={`${style.part} ${style.right}`}>
                {next && (
                    <>
                        <Text>
                            <Link href={`/${next.path}`}>
                                <span className={style.text}>
                                    {next.title}
                                </span>
                            </Link>
                        </Text>
                        <div className={style.icon}></div>
                    </>
                )}
            </div>
        </div>
    )
}