import config from "@/../config.json"
import path from 'path'

export function generateUrl(version: string, pathname: string) {
    if (version === config.defaultVersion) {
        return pathname
    }
    return path.join(version, pathname)
}

export function cleanHeading(text: string) {
    return text
        .replace(/^#+\s*/, '') // Remove # markers
        .replace(/`([^`]+)`/g, '$1') // Remove code backticks but keep content
        .replace(/\{#?[^}]*\}/g, '') // Remove and clean custom anchor tags like {#id}
        .replace(/\s*<!--.*?-->\s*/g, '') // Remove comments
        .trim()
}

export function slugify(text: string) {
    return cleanHeading(text)
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
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
