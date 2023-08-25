import { Text } from '@/components/Text'
import Link from 'next/link'
import style from './Breadcrumbs.module.css'

type Crumb = {
    path: string,
    title: string
}

interface Props {
    path: Crumb[]
}

export default function Breadcrumbs({ path }: Props) {
    return (
        <div className={style.container}>
            <Text font='caption'>
                <Link href='/'>Amber</Link>
                {path.map(({ path, title }) => (
                    <>
                        <span className={style.separator}>/</span>
                        <Link href={path}>{title}</Link>
                    </>
                ))}
            </Text>
        </div>
    )
}