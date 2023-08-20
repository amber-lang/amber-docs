'use client'

import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import { usePathname } from 'next/navigation'
import style from './Navigation.module.css'

export default function Navigation() {
    const pathname = usePathname()
    return <>
            <div className={style.nav}>
                <div className={style.left}>
                    <Link href="/">
                        <img src="internal/amber.svg" alt="amber" className={style.logo} />
                        <span className={style.title}> 
                            Amber
                        </span>
                    </Link>
                </div>
                {pathname !== '/' && <SearchBar />}
                <div className={style.right}>
                    <Button>
                        <Icon src='internal/side-bar.svg' size='2rem' />
                    </Button>
                    <Button>
                        <Icon src='internal/moon.svg' size='2rem' />
                    </Button>
                    <Button>
                        <a href="https://marble.software/">
                            <Icon src='internal/marble.svg' size='2rem' />
                        </a>
                    </Button>
                </div>
            </div>
            </>
}