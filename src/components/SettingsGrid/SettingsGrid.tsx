'use client'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import style from './SettingsGrid.module.css'
import { useTheme } from '@/contexts/ThemeContext'
import {useRouter, usePathname} from 'next/navigation'
import useVersion from '@/contexts/VersionContext/useVersion'
import { generateUrl } from '@/utils/urls'

export default function SettingsGrid() {
    const { mode, setThemeMode } = useTheme()
    const router = useRouter()
    const pathname = usePathname()
    const { version } = useVersion()

    const toggleTheme = () => {
        setThemeMode(mode === 'light' ? 'dark' : 'light')
    }

    const navigateToFullPage = () => {
        router.push(`/${generateUrl(version, 'full-page')}`)
    }

    const isFullPage = pathname?.includes('/full-page')

    return (
        <div>
            <div className={style.buttons}>
                <div className={style.button}>
                    <Button onClick={toggleTheme} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/moon.svg' size='1rem'/>
                    </Button>
                </div>
                {!isFullPage && (
                    <Button onClick={navigateToFullPage} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/scroll.svg' size='1rem' />
                    </Button>
                )}
                <div className={style.button}>
                    <Button onClick={() => router.push('https://github.com/amber-lang/amber')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/gh.svg' size='1rem' />
                    </Button>
                </div>
                <div className={style.button}>
                    <Button onClick={() => router.push('https://discord.gg/cjHjxbsDvZ')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/discord.svg' size='1rem' />
                    </Button>
                </div>
                <div className={style.button}>
                    <Button onClick={() => router.push('https://reddit.com/r/amberlang')} style={{ padding: '0.5rem' }}>
                        <Icon src='/internal/reddit.svg' size='1rem' />
                    </Button>
                </div>
                {/* Uncomment when we are ready */}
                {/* <div className={style.button}>
                    <Button>
                        <a href="https://marble.software/">
                            <Icon src='/internal/marble.svg' size='2rem'/>
                        </a>
                    </Button>
                </div> */}
            </div>
        </div>
    )
}