'use client'

import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import { usePathname, useRouter } from 'next/navigation'
import style from './Navigation.module.css'
import useSidebar from '@/contexts/DocumentContext/useSidebar'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'
import Dropdown from '../Dropdown/Dropdown'
import config from "@/../config.json"
import useVersion from '@/contexts/VersionContext/useVersion'

interface Props {
    hideSearch?: boolean
}

export default function Navigation({ hideSearch = false }: Props) {
    const { version } = useVersion()
    const pathname = usePathname()
    const { isOpen, setSidebar } = useSidebar()
    const { mode, setThemeMode } = useTheme()
    const router = useRouter()

    const toggleSideBar = () => {
        setSidebar(!isOpen)
    }

    const toggleDarkMode = () => {
        setThemeMode(mode === 'light' ? 'dark' : 'light')
    }

    const versions = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
        ? config.visibleVersions
        : config.allVersions

    return <>
            <div className={style.nav}>
                <div className={style.left}>
                    <Link href={`/${version}`}>
                        <div className={style.logo}>
                            <Image src="/internal/amber.svg" alt="amber" fill />
                        </div>
                        <div className={style.title}>
                            amber
                        </div>
                    </Link>
                    <div className={style.version}>
                        <Dropdown
                            value={version}
                            onChange={(value: Object) => router.push(`/${value.toString()}`)}
                            options={versions.toReversed()}
                            getLabel={(option: Object) => (option.toString()).replace(/-(alpha|beta)/, "")}
                            width="6rem"
                        />
                    </div>
                    {version.includes("alpha") && (
                        <div className={style.tag}>
                            alpha
                        </div>
                    )}
                </div>
                <div className={style.center}>
                    {!hideSearch && <SearchBar />}
                </div>
                <div className={style.right}>
                    <Button onClick={toggleSideBar} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/side-bar.svg' size='1rem' />
                    </Button>
                    <Button onClick={toggleDarkMode} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/moon.svg' size='1rem' />
                    </Button>
                    <Button onClick={() => router.push('https://github.com/amber-lang/amber')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/gh.svg' size='1rem' />
                    </Button>
                    <Button onClick={() => router.push('https://discord.gg/cjHjxbsDvZ')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/discord.svg' size='1rem' />
                    </Button>
                    <Button onClick={() => router.push('https://reddit.com/r/amberlang')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/reddit.svg' size='1rem' />
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
