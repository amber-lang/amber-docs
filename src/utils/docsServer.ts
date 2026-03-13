'use server'

import fs from 'fs/promises'
import config from '@/../config.json'
import path from 'path'

export type TocSection = { path: string, title: string, docs: TocSection[], disableLevels?: number[] }
type TocSectionInput = { path: string, title: string, docs?: TocSectionInput[], disableLevels?: number[] }
let cachedToc: Map<string, TocSection[]> = new Map()

function normalizeToc(sections: TocSectionInput[] = []): TocSection[] {
    return sections.map((section) => ({
        path: section.path,
        title: section.title,
        disableLevels: section.disableLevels,
        docs: normalizeToc(section.docs ?? [])
    }))
}

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
