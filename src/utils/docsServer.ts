'use server'

import fs from 'fs/promises'
import config from '@/../config.json'
import path from 'path'

export type TocSection = { path: string, title: string, docs: TocSection[], disableLevels?: number[] }
type TocSectionInput = { path: string, title: string, docs?: TocSectionInput[], disableLevels?: number[] }
let cachedToc: Map<string, TocSection[]> = new Map()

/**
 * Normalize an array of raw TOC section inputs into the public TocSection shape.
 *
 * @param sections - Array of input TOC sections to normalize; nested `docs` arrays are normalized recursively
 * @returns An array of `TocSection` objects with `docs` normalized to the public shape
 */
function normalizeToc(sections: TocSectionInput[] = []): TocSection[] {
    return sections.map((section) => ({
        path: section.path,
        title: section.title,
        disableLevels: section.disableLevels,
        docs: normalizeToc(section.docs ?? [])
    }))
}

/**
 * Load and return the normalized table of contents for a given documentation version.
 *
 * Caches the normalized TOC in memory and reuses the cached value when running in production.
 *
 * @param version - The documentation version to load; defaults to config.defaultVersion
 * @returns The normalized array of `TocSection` for the specified version
 */
export async function getTableOfContents(version: string = config.defaultVersion): Promise<TocSection[]> {
    if (cachedToc.has(version) && process.env.NODE_ENV === 'production') {
        return cachedToc.get(version)!
    }

    const file = await fs.readFile(path.join(
        process.cwd(),
        'docs',
        version,
        'index.json'
    ), 'utf8')
    const toc = normalizeToc(JSON.parse(file).docs);
    cachedToc.set(version, toc)
    return toc;
}
