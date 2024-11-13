'use client'

import React from 'react'
import { Text } from '@/components/Text'
import Link from 'next/link'
import style from './Breadcrumbs.module.css'
import useVersion from '@/contexts/VersionContext/useVersion'
import config from '@/../config.json'

type Crumb = {
    path: string,
    title: string
}

interface Props {
    path: Crumb[]
}

export default function Breadcrumbs({ path }: Props) {
    const { version } = useVersion()
    const href = `/${version === config.defaultVersion ? ''  : version}`

    return (
        <div className={style.container}>
            <Text font='caption'>
                <Link href={href}>Amber</Link>
                {path.map(({ path, title }) => (
                    <React.Fragment key={path}>
                        <span className={style.separator}>/</span>
                        <Link href={`/${path}`}>{title}</Link>
                    </React.Fragment>
                ))}
            </Text>
        </div>
    )
}
