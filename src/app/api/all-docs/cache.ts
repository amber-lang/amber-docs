import { promises as fs } from 'fs'
import path from 'path'
import { gzip } from 'zlib'
import { promisify } from 'util'
import config from '@/../config.json'
import { getFlatTableOfContents } from '@/utils/docs'
import { getDocument } from '@/utils/files'

const gzipAsync = promisify(gzip)

interface AllDocsResponse {
    docs: {
        path: string
        title: string
        content: string
        section: string
    }[]
    version: string
}

const cachedAllDocsGzip = new Map<string, Buffer>()
const cachedAllDocsJson = new Map<string, AllDocsResponse>()

/**
 * Get the pre-computed gzipped all-docs response for a version
 */
export function getCachedAllDocsGzip(version: string): Buffer | null {
    return cachedAllDocsGzip.get(version) ?? null
}

/**
 * Get the pre-computed all-docs JSON response for a version
 */
export function getCachedAllDocs(version: string): AllDocsResponse | null {
    return cachedAllDocsJson.get(version) ?? null
}

/**
 * Preload all docs and pre-compute gzipped responses for all versions.
 * This should be called from instrumentation.ts
 */
export async function preloadAllDocs() {
    const versions = config.allVersions
    let totalDocs = 0
    
    for (const version of versions) {
        try {
            // Read the index.json for this version
            const indexPath = path.join(process.cwd(), 'docs', version, 'index.json')
            const indexContent = await fs.readFile(indexPath, 'utf-8')
            const { docs: toc } = JSON.parse(indexContent)
            
            // Flatten TOC and add fullPath for each doc
            const flatDocs = getFlatTableOfContents(toc)
            const docMeta = flatDocs.map(doc => ({
                ...doc,
                section: doc.section ?? doc.title,
                fullPath: `${version}/${doc.path}`
            }))
            
            // Load all docs in parallel (populates cachedDocs in files.ts)
            const loadedDocs = await Promise.all(
                docMeta.map(async ({ path: docPath, title, section, fullPath }) => {
                    const doc = await getDocument(fullPath)
                    if (doc) {
                        return { path: docPath, title, section, content: doc.content }
                    }
                    return null
                })
            )
            
            // Filter out null results and create response
            const docs = loadedDocs.filter((d): d is NonNullable<typeof d> => d !== null)
            const response: AllDocsResponse = { docs, version }
            
            // Cache JSON response
            cachedAllDocsJson.set(version, response)
            
            // Pre-compute gzipped response
            const jsonString = JSON.stringify(response)
            const gzipped = await gzipAsync(jsonString)
            cachedAllDocsGzip.set(version, gzipped)
            
            totalDocs += docs.length
        } catch (error) {
            console.error(`Failed to preload docs for version ${version}:`, error)
        }
    }
    
    console.log(`✓ Preloaded ${totalDocs} docs into memory cache (with gzip)`)
}
