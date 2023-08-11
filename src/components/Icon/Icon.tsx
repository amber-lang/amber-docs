import style from './Icon.module.css'

interface Props {
    src: string
    wdth: string
    hght: string
}

export default function Icon({ src, wdth, hght }: Props) {
    return (
        <div style={{ maskImage: `url(${src})`, width: wdth, height: hght }} className={style.icon}>
            <button type='button'>

            </button>
        </div>
    )
}