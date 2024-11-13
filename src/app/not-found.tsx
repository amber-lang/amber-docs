import SideBar from '@/components/SideBar/SideBar'
import Sheet from '@/components/Sheet/Sheet'
import SettingsGrid from '@/components/SettingsGrid/SettingsGrid'
import NotFoundImage from '@/components/NotFoundImage/NotFoundImage'
import NavigationLayout from '@/layouts/NavigationLayout/NavigationLayout'
import { getTableOfContents } from '@/utils/docsServer'

export default async function NotFound() {
    const toc = await getTableOfContents()
    return (
        <NavigationLayout>
            <div className='left'>
                <SideBar toc={toc} headers={[]} isFixed />
            </div>
            <div className='right'>
                <NotFoundImage />
            </div>
            <Sheet>
                <SideBar toc={toc} headers={[]} />
                <SettingsGrid />
            </Sheet>
        </NavigationLayout>
    )
}
