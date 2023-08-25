import style from './Icon.module.css'

interface Props {
    src: string
    size: string
    color?: string
}

export default function Icon({ src, size, color }: Props) {
    return (
        <div style={{ maskImage: `url(${src})`, width: size, height: size, backgroundColor: color }} className={style.icon}>
        </div>
    )
}