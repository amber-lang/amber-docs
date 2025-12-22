import React from 'react'
import styles from './Button.module.css'

interface Props {
    children: React.ReactNode,
    onClick?: () => void,
    style?: React.CSSProperties
}


export default function Button({ children, onClick, style }: Props) {
    return (
        <button className={styles.button} onClick={onClick} style={style}>
                {children}
        </button>
    )
}