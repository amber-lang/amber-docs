'use client'

import React from 'react'
import useSidebar from '@/contexts/DocumentContext/useSidebar'
import style from './RightSidebar.module.css'
import OnThisPage from '@/components/OnThisPage/OnThisPage'
import { DocDescriptor } from '@/utils/docs'

interface Props {
    headers: string[]
    docDesc?: DocDescriptor
}

export default function RightSidebar({ headers, docDesc }: Props) {
    const { isOpen } = useSidebar()

    return (
        <div className={`${style.aside} ${isOpen ? style.open : ''}`}>
            <div className={style.container}>
                <OnThisPage headers={headers} docDesc={docDesc} fullHeight={true} />
            </div>
        </div>
    )
}
