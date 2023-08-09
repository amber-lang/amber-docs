import style from './SearchBar.module.css'


export default function SearchBar() {
    return (
        <div className={style['search-bar']}>
            <input type="text" placeholder="Search" className={style['search-bar']}/>
        </div>
    )
}