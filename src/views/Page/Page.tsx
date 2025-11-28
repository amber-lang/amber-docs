
import ChapterNavigation from '@/components/ChapterNavigation/ChapterNavigation'
import SideBar from '@/components/SideBar/SideBar'
import style from './Page.module.css'
import { Location } from '@/utils/urls'
import { Document } from '@/utils/files'
import Sheet from '@/components/Sheet/Sheet'
import SearchBar from '@/components/SearchBar/SearchBar'
import SettingsGrid from '@/components/SettingsGrid/SettingsGrid'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { getDocDescriptor, getFlatTableOfContents } from '@/utils/docs'
import { getTableOfContents } from '@/utils/docsServer'
import InfoCard from '@/components/InfoCard/InfoCard'
import NavigationLayout from '@/layouts/NavigationLayout/NavigationLayout'
import dynamic from 'next/dynamic'
const Markdown = dynamic(() => import('@/components/Markdown/Markdown'), { ssr: false })

interface Props {
    location: Location,
    document: Document
}

export default async function Page({ location, document }: Props) {
    const toc = await getTableOfContents(location.version)
    const docDesc = getDocDescriptor(toc, location.slug.join('/'))
    const flatToc = getFlatTableOfContents(toc)

    return (
        <NavigationLayout>
            <div className='left'>
                <SideBar toc={toc} headers={document.headers} docDesc={docDesc} isFixed />
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
                    <Markdown content={document.content} />
                    <ChapterNavigation flatToc={flatToc} index={docDesc.index} />
                </div>
            </div>
            <Sheet>
                <div className={style.search}>
                    <SearchBar variant='body' />
                </div>
                <SideBar toc={toc} headers={document.headers} docDesc={docDesc} />
                <SettingsGrid />
            </Sheet>
        </NavigationLayout>
    )
}
