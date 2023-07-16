import React, { ReactNode } from 'react'
import style from './Plane.module.css'

interface Props {
    children: ReactNode,
    blur?: number
}

export default function Plane({ children, blur }: Props) {
    const blurStyle = blur ? { backdropFilter: `blur(${blur})` } : {}
    return (
        <div className={style.plane} style={blurStyle}>
            {children}
        </div>
    )
}