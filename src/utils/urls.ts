import config from "@/../config.json"

export function generateUrl(version: string, path: string) {
    if (version === config.defaultVersion) {
        return path
    }
    return `${version}/${path}`
}
