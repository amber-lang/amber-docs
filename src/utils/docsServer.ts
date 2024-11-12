'use server'

import fs from 'fs/promises'
import config from '@/../config.json'
import path from 'path'

export type TocSection = { path: string, title: string, docs: TocSection[] }

export async function getTableOfContents(version: string = ''): Promise<TocSection[]> {
    const file = await fs.readFile(path.join(
        process.cwd(),
        'docs',
        !version.length ? config.defaultVersion : version,
        'index.json'
    ), 'utf8')
    return JSON.parse(file).docs
}
