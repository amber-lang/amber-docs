'use client'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Tooltip from '../Tooltip'
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
                    <Tooltip content={mode === 'light' ? 'Dark mode' : 'Light mode'}>
                        <Button onClick={toggleTheme} style={{ padding: '0.5rem' }}>
                            <Icon src='/internal/moon.svg' size='1rem'/>
                        </Button>
                    </Tooltip>
                </div>
                {!isFullPage && (
                    <Tooltip content="Full page view">
                        <Button onClick={navigateToFullPage} style={{ padding: '0.5rem' }}>
                            <Icon src='/internal/scroll.svg' size='1rem' />
                        </Button>
                    </Tooltip>
                )}
                <div className={style.button}>
                    <Tooltip content="GitHub">
                        <Button onClick={() => router.push('https://github.com/amber-lang/amber')} style={{ padding: '0.5rem' }}>
                            <Icon src='/internal/gh.svg' size='1rem' />
                        </Button>
                    </Tooltip>
                </div>
                <div className={style.button}>
                    <Tooltip content="Discord">
                        <Button onClick={() => router.push('https://discord.gg/cjHjxbsDvZ')} style={{ padding: '0.5rem' }}>
                            <Icon src='/internal/discord.svg' size='1rem' />
                        </Button>
                    </Tooltip>
                </div>
                <div className={style.button}>
                    <Tooltip content="Reddit">
                        <Button onClick={() => router.push('https://reddit.com/r/amberlang')} style={{ padding: '0.5rem' }}>
                            <Icon src='/internal/reddit.svg' size='1rem' />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}