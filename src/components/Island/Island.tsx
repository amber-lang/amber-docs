import React from 'react'
import { Text } from '@/components/Text'
import { Plane } from '@/components/Plane'
import style from './Island.module.css'

interface Props {
    children: React.ReactNode,
    label: string
}

export default function Island({ children, label }: Props) {
    return (
        <div>
            <div className={style['island-caption']}>
                <Text font='caption'>{label}</Text>
            </div>
            <Plane>
                {children}
            </Plane>
        </div>
    )
}