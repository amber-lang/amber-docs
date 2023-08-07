import React, { ReactNode } from 'react'
import style from './Plane.module.css'

interface Props {
    children: ReactNode,
    blur?: number,
    isBlock?: boolean
}

export default function Plane({ children, blur, isBlock }: Props) {
    const customStyle = {
        ...(blur && { backdropFilter: `blur(${blur})`}),
        ...(isBlock && { display: 'block'}),
    }
    return (
        <div className={style.plane} style={customStyle}>
            {children}
        </div>
    )
}