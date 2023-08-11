import style from './Icon.module.css'

interface Props {
    src: string
    size: string
}

export default function Icon({ src, size }: Props) {
    return (
        <div style={{ maskImage: `url(${src})`, width: size, height: size }} className={style.icon}>

        </div>
    )
}