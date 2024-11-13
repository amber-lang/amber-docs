import NotFound from '../not-found'
import { getDocument } from '@/utils/files'
import config from "@/../config.json"
import Main from '@/views/Main/Main'
import Page from '@/views/Page/Page'
import VersionProvider from '@/contexts/VersionContext/VersionProvider'

interface Props {
  params: {
    slug: string[]
  }
}

export interface Location {
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

export default async function Post({ params }: Props) {
    const location = getLocation(params.slug)
    if (location.slug.length == 0) return (
        <VersionProvider version={location.version}>
            <Main />
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
