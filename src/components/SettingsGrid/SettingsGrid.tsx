import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import style from './SettingsGrid.module.css'

export default function SettingsGrid() {
    return (
        <div>
            <div className={style.buttons}>
                <div className={style.button}>
                    <Button>
                        <Icon src='internal/moon.svg' size='2rem' />
                    </Button>
                </div>
                <div className={style.button}>
                    <Button>
                        <a href="https://marble.software/">
                            <Icon src='internal/marble.svg' size='2rem' />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}