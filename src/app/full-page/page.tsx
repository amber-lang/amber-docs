import FullPage from '@/views/FullPage/FullPage'
import VersionProvider from '@/contexts/VersionContext/VersionProvider'
import config from '@/../config.json'

export default function FullPageRoute() {
    return (
        <VersionProvider version={config.defaultVersion}>
            <FullPage />
        </VersionProvider>
    )
}
