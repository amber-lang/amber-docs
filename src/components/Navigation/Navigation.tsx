'use client'

import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import { usePathname } from 'next/navigation'
import style from './Navigation.module.css'
import useSidebar from '@/contexts/DocumentContext/useSidebar'
import { useTheme } from '@/contexts/ThemeContext'
import { Text } from '@/components/Text'
import Image from 'next/image'

export default function Navigation() {
    const pathname = usePathname()
    const { isOpen, setSidebar } = useSidebar()
    const { mode, setThemeMode } = useTheme()

    const toggleSideBar = () => {
        setSidebar(!isOpen)
    }

    const toggleDarkMode = () => {
        setThemeMode(mode === 'light' ? 'dark' : 'light')
    }

    return <>
            <div className={style.nav}>
                <div className={style.left}>
                    <Link href="/">
                        <div className={style.logo}>
                            <Image src="/internal/amber.svg" alt="amber" fill />
                        </div>
                        <div className={style.title}>
                            amber
                        </div>
                        <div className={style.tag}>
                            alpha
                        </div>
                    </Link>
                </div>
                <div className={style.center}>
                    {pathname !== '/' && <SearchBar />}
                </div>
                <div className={style.right}>
                    <Button onClick={toggleSideBar}>
                        <Icon src='/internal/side-bar.svg' size='2rem' />
                    </Button>
                    <Button onClick={toggleDarkMode}>
                        <Icon src='/internal/moon.svg' size='2rem' />
                    </Button>
                    {/* Uncomment when we are ready */}
                    {/* <Button>
                        <a href="https://marble.software/">
                            <Icon src='/internal/marble.svg' size='2rem' />
                        </a>
                    </Button> */}
                </div>
            </div>
            </>
}
