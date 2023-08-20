import style from './SearchBar.module.css'

type Variant = 'body' | 'title'

interface Props {
    variant?: Variant,
    placeholder?: string
}

export default function SearchBar({ variant = 'body', placeholder = 'Search' }: Props) {
    return (
        <div className={style[variant]}>
            <input type="text" placeholder={placeholder} />
        </div>
    )
}