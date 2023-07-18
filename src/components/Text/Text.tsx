import React from 'react'
import style from './Text.module.css'

type FontType = 'title' | 'body' | 'caption'

interface Props {
    children: React.ReactNode,
    font?: FontType,
    block?: boolean
}

export default function Text({ children, font = 'body', block }: Props) {
    const display = block ? 'block' : 'inline'
    return (
        <div className={style[font]} style={{ display }}>
            {children}
        </div>
    )
}