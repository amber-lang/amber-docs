import React from 'react'
import style from './Button.module.css'

interface Props {
    children: React.ReactNode,
    onClick?: () => void
}


export default function Button({ children, onClick }: Props) {
    return (
        <button className={style.button} onClick={onClick}>
                {children}
        </button>
    )
}