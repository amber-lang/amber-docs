import { promises as fs } from 'fs'
import path from 'path'

export async function readFile(givenPath: string) {
    const PATH = path.join(process.cwd(), 'docs', `${givenPath}.md`)
    try { await fs.access(PATH) } catch {
        return null
    }
    return await fs.readFile(PATH, 'utf-8')
}

export interface Document {
    content: string
    headers: string[]
    path: string
}

const getHeaders = (content: string) => {
    let markdown = false
    return content.split('\n').filter(line => {
        if (line.startsWith('```')) markdown = !markdown
        return !markdown && /^#+\s/.test(line)
    })
}

const cachedDocs = new Map<string, Document>()

export async function getDocument(path: string): Promise<Document | null> {
    if (cachedDocs.has(path) && process.env.NODE_ENV === 'production') {
        return cachedDocs.get(path)!
    }

    const content = await readFile(path)
    if (!content) return null
    const headers = getHeaders(content)
    const document = { content, headers, path }

    cachedDocs.set(path, document)
    return document
}
