import style from './page.module.css'
import { getTableOfContents } from '@/utils/docs'
import Link from 'next/link'

export default function Post() {
  const [toc] = getTableOfContents()

  return (
    <>
      <div className={style.container}>
        <div className={style.jumbotron}></div>
        <div className={style.title}>
          <span className={style.bold}>Amber</span>
          <span className={style.light}>Docs</span>
        </div>
        <Link href={toc.path} className={style['big-link']}>
          {toc.title}
        </Link>
      </div>
    </>
  )
}
