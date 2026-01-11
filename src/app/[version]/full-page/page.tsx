import FullPage from '@/views/FullPage/FullPage'
import VersionProvider from '@/contexts/VersionContext/VersionProvider'
import { notFound } from 'next/navigation'
import config from '@/../config.json'

interface Props {
    params: Promise<{
        version: string
    }>
}

export default async function VersionedFullPageRoute({ params }: Props) {
    const { version } = await params
    
    // Validate version
    const versionRegex = /^(?:\d+\.\d+\.\d+(?:-(?:alpha|beta))?|nightly(?:-alpha)?)$/
    if (!versionRegex.test(version)) {
        notFound()
    }
    
    // Check if version exists
    if (!config.allVersions.includes(version)) {
        notFound()
    }
    
    return (
        <VersionProvider version={version}>
            <FullPage />
        </VersionProvider>
    )
}
