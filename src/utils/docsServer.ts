'use server'

import fs from 'fs/promises'
import config from '@/../config.json'
import path from 'path'

export type TocDoc = {
    path: string
    title: string
    disableLevels?: number[]
    url?: string
}

export type TocSection = TocDoc & {
    docs?: TocDoc[]
}
let cachedToc: Map<string, TocSection[]> = new Map()

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
    const toc = JSON.parse(file).docs;
    cachedToc.set(version, toc)
    return toc;
}
