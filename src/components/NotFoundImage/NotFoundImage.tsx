'use client'

import { useTheme } from "@/contexts/ThemeContext";
import style from './NotFoundImage.module.css';
import Link from 'next/link'

export default function NotFoundImage() {
    const { mode } = useTheme()
    return (
        <div className={style['not-found']}>
            <img src={`/internal/not-found-${mode}.svg`} alt="404" />
            <div>
                Whoa, it seems that you&apos;ve been kicked out into
                <span className={style.outer}>outer space!</span>
            </div>
            <Link href='/' className={style['big-link']}>
                Go back to Marble
            </Link>
        </div>
    );
}
