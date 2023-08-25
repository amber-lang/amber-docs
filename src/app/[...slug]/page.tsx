import ChapterNavigation from '@/components/ChapterNavigation/ChapterNavigation'
import Markdown from '@/components/Markdown/Markdown'
import SideBar from '@/components/SideBar/SideBar'
import style from './page.module.css'
import NotFound from '../not-found'
import { getDoc } from '@/utils/files'
import Sheet from '@/components/Sheet/Sheet'
import SearchBar from '@/components/SearchBar/SearchBar'
import SettingsGrid from '@/components/SettingsGrid/SettingsGrid'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { getDocDescriptor } from '@/utils/docs'
import useSidebar from '@/contexts/DocumentContext/useSidebar'

interface Props {
  params: {
    slug: string[]
  }
}

const getDocument = async (path: string) => {
  const content = await getDoc(path)
  if (!content) return null
  const rawHeaders = content.split('\n').filter(line => line.startsWith('#'))
  const headers = rawHeaders.map(header => header.trimStart().replace(/^#+/, '').trim())
  return { content, headers, path }
}

export default async function Post({ params }: Props) {
  const doc = await getDocument(params.slug.join('/'))
  if (!doc) return <NotFound />
  const docDesc = getDocDescriptor(params.slug.join('/'))

  return (
    <>
      <div className='left'>
        <SideBar headers={doc.headers} isFixed />
      </div>
      <div className='right'>
        <div className={style.main}>
          <Breadcrumbs path={[docDesc!]} />
          <Markdown content={doc.content} />
          <ChapterNavigation path={doc.path} />
        </div>
      </div>
      <Sheet>
        <div className={style.search}>
          <SearchBar variant='body' />
        </div>
        <SideBar headers={doc.headers} />
        <SettingsGrid />
      </Sheet>
    </>
  )
}
