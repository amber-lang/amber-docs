import React from 'react'
import {Plane} from '@/components/Plane'
import style from './Button.module.css'

interface Props {
    children: React.ReactNode
}


export default function Button({ children }: Props) {
    return (
        <button className={style.button}>
            <Plane>
                {children}
            </Plane>
        </button>
    )
}
///  <Plane style={{ borderRadius: '1rem'}}>