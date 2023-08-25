import style from './Card.module.css';

interface Props {
    children: React.ReactNode
}

export default function Card({ children }: Props) {
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}