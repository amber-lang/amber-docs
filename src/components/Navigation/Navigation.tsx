import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import style from './Navigation.module.css'
export default function Navigation() {
    return <>
            <div className={style.nav}>
                <div className={style.navLeft}>
                    <Link href="https://marble.software/" className={style.link}>
                        <img src="internal/amber.svg" alt="amber" className={style.logo} />
                    </Link>
                    <span className={style.title}>
                        <Link href="/">
                            Amber
                        </Link>
                    </span>
                </div>
                <SearchBar />
                <div className={style.navRight}>
                        <Button>
                            <Icon src='internal/side-bar.svg' size='2rem' />
                        </Button>
                        <Button>
                            <Icon src='internal/moon.svg' size='2rem' />
                        </Button>
                        <Button>
                            <Icon src='internal/marble.svg' size='2rem' />
                        </Button>
                </div>
            </div>
            </>
}