'use client'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import style from './SettingsGrid.module.css'
import { useTheme } from '@/contexts/ThemeContext'
import {useRouter} from 'next/navigation'

export default function SettingsGrid() {
    const { mode, setThemeMode } = useTheme()
    const router = useRouter()

    const toggleTheme = () => {
        setThemeMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <div>
            <div className={style.buttons}>
                <div className={style.button}>
                    <Button onClick={toggleTheme}>
                        <Icon src='/internal/moon.svg' size='2rem'/>
                    </Button>
                </div>
                <div className={style.button}>
                    <Button onClick={() => router.push('https://github.com/amber-lang/amber')}>
                        <Icon src='/internal/gh.svg' size='2rem'/>
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