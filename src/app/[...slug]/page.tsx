import NotFound from '../not-found'
import { getDocument } from '@/utils/files'
import Main from '@/views/Main/Main'
import Page from '@/views/Page/Page'
import FullPage from '@/views/FullPage/FullPage'
import VersionProvider from '@/contexts/VersionContext/VersionProvider'
import { getLocation, getLocationWithFullPage } from '@/utils/urls'

interface Props {
  params: Promise<{
    slug: string[]
  }>
}

export default async function Post({ params }: Props) {
    const { slug } = await params
    const { location, isFullPage } = getLocationWithFullPage(slug)
    
    // Handle full-page view
    if (isFullPage) {
        return (
            <VersionProvider version={location.version}>
                <FullPage />
            </VersionProvider>
        )
    }
    
    if (location.slug.length == 0) return (
        <VersionProvider version={location.version}>
            <Main location={location} />
        </VersionProvider>
    )
    const document = await getDocument(location.fullPath)
    if (!document) return (
        <VersionProvider version={location.version}>
            <NotFound />
        </VersionProvider>
    )
    return (
        <VersionProvider version={location.version}>
            <Page document={document} location={location} />
        </VersionProvider>
    )
}
