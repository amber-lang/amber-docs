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
    const versionRegex = /^(?:\d+\.\d+\.\d+(?:-(?:alpha|beta))?|nightly(?:-alpha)?)$/
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

export function getLocationWithFullPage(slug: string[]): { location: Location; isFullPage: boolean } {
    const versionRegex = /^(?:\d+\.\d+\.\d+(?:-(?:alpha|beta))?|nightly(?:-alpha)?)$/
    const fullPageSlug = 'full-page'
    
    // Check if first segment is a version
    if (versionRegex.test(slug[0])) {
        const isFullPage = slug[1] === fullPageSlug
        if (isFullPage) {
            return {
                location: {
                    version: slug[0],
                    slug: [],
                    fullPath: slug[0]
                },
                isFullPage: true
            }
        }
        return {
            location: getLocation(slug),
            isFullPage: false
        }
    }
    
    // No version prefix - check if first segment is full-page
    const isFullPage = slug[0] === fullPageSlug
    if (isFullPage) {
        return {
            location: {
                version: config.defaultVersion,
                slug: [],
                fullPath: config.defaultVersion
            },
            isFullPage: true
        }
    }
    
    return {
        location: getLocation(slug),
        isFullPage: false
    }
}
