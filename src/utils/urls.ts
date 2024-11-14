import config from "@/../config.json"

export function generateUrl(version: string, path: string) {
    if (version === config.defaultVersion) {
        return path
    }
    return `${version}/${path}`
}

export interface Location {
    version: string
    slug: string[]
    fullPath: string
}

export function getLocation (slug: string[]): Location {
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
