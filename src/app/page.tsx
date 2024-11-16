import Main from "@/views/Main/Main";
import config from "@/../config.json";
import VersionProvider from "@/contexts/VersionContext/VersionProvider";

export default async function Post() {
    return (
        <VersionProvider version={config.defaultVersion}>
            <Main />
        </VersionProvider>
    )
}
