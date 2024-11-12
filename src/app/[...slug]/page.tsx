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
import { getDocDescriptor, getFlatTableOfContents } from '@/utils/docs'
import { getTableOfContents } from '@/utils/docsServer'
import InfoCard from '@/components/InfoCard/InfoCard'
import config from "@/../config.json"
import Main from '@/views/Main/Main'
import NavigationLayout from '@/layouts/NavigationLayout/NavigationLayout'

interface Props {
  params: {
    slug: string[]
  }
}

interface Location {
    version: string
    slug: string[]
    fullPath: string
}

const getLocation = (slug: string[]): Location => {
    const versionRegex = /^\d+\.\d+\.\d+(?:-(?:alpha|beta))?$/
    if (versionRegex.test(slug[0])) {
        return {
            version: slug[0],
            slug: slug.slice(1),
            fullPath: slug.join('/')
        }
    }
    return {
        version: config.defaultVersion,
        slug,
        fullPath: [config.defaultVersion, ...slug].join('/')
    }
}

const getHeaders = (content: string) => {
    let markdown = false
    return content.split('\n').filter(line => {
        if (line.startsWith('```')) markdown = !markdown
        return !markdown && /^#+\s/.test(line)
    })
}

const getDocument = async (path: string) => {
  const content = await getDoc(path)
  if (!content) return null
  const headers = getHeaders(content)
  return { content, headers, path }
}

export default async function Post({ params }: Props) {
    const location = getLocation(params.slug)
    if (location.slug.length == 0) return <Main version={location.version} />
    const doc = await getDocument(location.fullPath)
    if (!doc) return <NotFound />
    const toc = await getTableOfContents()
    const docDesc = getDocDescriptor(toc, location.slug.join('/'))
    const flatToc = getFlatTableOfContents(toc)

    return (
        <NavigationLayout version={location.version}>
            <div className='left'>
                <SideBar toc={toc} headers={doc.headers} isFixed />
            </div>
            <div className='right'>
                <div className={style.main}>
                    <Breadcrumbs path={[docDesc]} />
                    <div className={style['no-hover']}>
                        <InfoCard
                            id='swipe-to-copy'
                            title='Swipe to copy'
                            content="You can swipe heading to copy link or swipe codeblock to copy its contents."
                            icon='/internal/swipe-to-copy.svg'
                        />
                    </div>
                    <div className={style.title}>
                        {docDesc.title}
                    </div>
                    <Markdown content={doc.content} />
                    <ChapterNavigation flatToc={flatToc} index={docDesc.index} />
                </div>
            </div>
            <Sheet>
                <div className={style.search}>
                    <SearchBar variant='body' />
                </div>
                <SideBar toc={toc} headers={doc.headers} docDesc={docDesc} />
                <SettingsGrid />
            </Sheet>
        </NavigationLayout>
    )
}
