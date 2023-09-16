'use client'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import style from './SettingsGrid.module.css'
import { useTheme } from '@/contexts/ThemeContext'

export default function SettingsGrid() {
    const { mode, setThemeMode } = useTheme()

    const toggleTheme = () => {
        setThemeMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <div>
            <div className={style.buttons}>
                <div className={style.button}>
                    <Button onClick={toggleTheme}>
                        <Icon src='/internal/moon.svg' size='2rem' />
                    </Button>
                </div>
                <div className={style.button}>
                    <Button>
                        <a href="https://marble.software/">
                            <Icon src='/internal/marble.svg' size='2rem' />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}