import Main from "@/views/Main/Main";
import config from "@/../config.json";

export default async function Post() {
    return (
        <Main version={config.defaultVersion} />
    )
}
