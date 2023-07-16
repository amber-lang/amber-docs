import React from 'react'
import style from './Text.module.css'

type FontType = 'title' | 'body' | 'caption'

interface Props {
    children: React.ReactNode,
    font?: FontType
}

export default function Text({ children, font = 'body' }: Props) {
    return (
        <span className={style[font]}>
            {children}
        </span>
    )
}