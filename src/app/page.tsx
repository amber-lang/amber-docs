import style from './page.module.css'
import { getTableOfContents } from '@/utils/docs'
import SideBar from '@/components/SideBar/SideBar'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'

export default function Post() {
  const [toc] = getTableOfContents()

  return (
    <>
      <div className='left'>
        <SideBar headers={[]} />
      </div>
      <div className='right'>
        <div className={style.container}>
          <div className={style.jumbotron}></div>
          <div className={style.title}>
            <span className={style.bold}>Amber</span>
            <span className={style.light}>Docs</span>
          </div>
          <SearchBar variant='title' />
          <Link href={toc.path} className={style['big-link']}>
            {toc.title}
          </Link>
        </div>
      </div>
    </>
  )
}
