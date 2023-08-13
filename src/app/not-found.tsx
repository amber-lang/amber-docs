'use client'

import style from './not-found.module.css'
import { useTheme } from '@/contexts/ThemeContext'
import SideBar from '@/components/SideBar/SideBar'
import Link from 'next/link'

export default function NotFound() {
    const { mode } = useTheme()
    return (
        <>
            <div className='left'>
                <SideBar headers={[]} />
            </div>
            <div className='right'>
                <div className={style['not-found']}>
                    <img src={`internal/not-found-${mode}.svg`} alt="404" />
                    <div>
                        Whoa, it seems that you&apos;ve been kicked out into
                        <span className={style.outer}>outer space!</span>
                    </div>
                    <Link href='/' className={style['big-link']}>
                        Go back to Marble
                    </Link>
                </div>
            </div>
        </>
    )
}