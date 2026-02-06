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
    keywords?: string[]
    headerKeywords?: Map<string, string[]>
}

const getHeaders = (content: string) => {
    let markdown = false
    return content.split('\n').filter(line => {
        if (line.startsWith('```')) markdown = !markdown
        return !markdown && /^#+\s/.test(line)
    })
}

const cachedDocs = new Map<string, Document>()
const keywordSplitRegex = /[\s,]+/

export function extractKeywords(content: string) {
    const headerKeywords = new Map<string, string[]>()
    let fileKeywords: string[] = []
    let processedContent = content

    // File level keywords at the very top (start of string)
    const fileLevelKeywordsRegex = /^\s*\{#([^{}]+)\}\s*/
    const fileMatch = processedContent.match(fileLevelKeywordsRegex)
    if (fileMatch) {
         fileKeywords = fileMatch[1].split(keywordSplitRegex).map(k => k.trim().replace(/^#/, '')).filter(k => k.length > 0)
         processedContent = processedContent.replace(fileLevelKeywordsRegex, '')
    }

    // Header level keywords
    // Match line: # Title {#keywords}
    const headerRegex = /^(#+\s+.*?)\s*\{#([^{}]+)\}\s*$/gm
    processedContent = processedContent.replace(headerRegex, (_match, titlePart, tagContent) => {
        const kws = tagContent.split(keywordSplitRegex).map((k: string) => k.trim().replace(/^#/, '')).filter((k: string) => k.length > 0)
        headerKeywords.set(titlePart.trim(), kws)
        fileKeywords.push(...kws) 
        return titlePart
    })

    // Index all headers (even those without keywords) for search
    const allHeaders = getHeaders(processedContent)
    allHeaders.forEach(h => {
        const trimmed = h.trim()
        if (!headerKeywords.has(trimmed)) {
            headerKeywords.set(trimmed, [])
        }
    })

    return {
        content: processedContent,
        keywords: fileKeywords,
        headerKeywords
    }
}

export async function getDocument(docPath: string): Promise<Document | null> {
    if (cachedDocs.has(docPath) && process.env.NODE_ENV === 'production') {
        return cachedDocs.get(docPath)!
    }

    const rawContent = await readFile(docPath)
    if (!rawContent) return null
    
    const { content, keywords, headerKeywords } = extractKeywords(rawContent)
    const headers = getHeaders(content)
    const document = { content, headers, path: docPath, keywords, headerKeywords }

    cachedDocs.set(docPath, document)
    return document
}

