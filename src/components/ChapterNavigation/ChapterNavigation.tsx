'use client'

import React from 'react'
import style from './ChapterNavigation.module.css'

import { FlatDoc } from '@/utils/docs'
import Link from 'next/link'
import { generateUrl } from '@/utils/urls'
import useVersion from '@/contexts/VersionContext/useVersion'

interface Props {
    index: number,
    flatToc: FlatDoc[]
}

export default function ChapterNavigation({ index, flatToc }: Props) {
    const { version } = useVersion()
    const prev = flatToc[index - 1]
    const next = flatToc[index + 1]
    return (
        <div className={style.container}>
            <div className={`${style.part} ${style.left}`}>
                {prev && (
                    <>
                        <div className={`${style.reverse} ${style.icon}`}></div>
                        <Link href={`/${generateUrl(version, prev.path)}`}>
                            <span className={style.text}>
                                {prev.title}
                            </span>
                        </Link>
                    </>
                )}
            </div>
            <div className={`${style.part} ${style.center} ${style['page-indicator']}`}>
                {index + 1}/{flatToc.length}
            </div>
            <div className={`${style.part} ${style.right}`}>
                {next && (
                    <>
                        <Link href={`/${generateUrl(version, next.path)}`}>
                            <span className={style.text}>
                                {next.title}
                            </span>
                        </Link>
                        <div className={style.icon}></div>
                    </>
                )}
            </div>
        </div>
    )
}
