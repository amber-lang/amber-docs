import NotFound from '../not-found'
import { getDocument } from '@/utils/files'
import Main from '@/views/Main/Main'
import Page from '@/views/Page/Page'
import VersionProvider from '@/contexts/VersionContext/VersionProvider'
import { getLocation } from '@/utils/urls'

interface Props {
  params: Promise<{
    slug: string[]
  }>
}

export default async function Post({ params }: Props) {
    const { slug } = await params
    const location = getLocation(slug)
    
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
