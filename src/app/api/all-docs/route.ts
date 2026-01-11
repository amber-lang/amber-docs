import { NextResponse } from 'next/server'
import { getTableOfContents, TocSection } from '@/utils/docsServer'
import { getDocument } from '@/utils/files'
import { getCachedAllDocsGzip, getCachedAllDocs } from './cache'
import config from '@/../config.json'

export interface DocContent {
  path: string
  title: string
  content: string
  section: string
}

function getAllDocPaths(toc: TocSection[]): { path: string; title: string; section: string }[] {
  const paths: { path: string; title: string; section: string }[] = []
  
  for (const section of toc) {
    // Add section's main doc
    paths.push({ path: section.path, title: section.title, section: section.title })
    
    // Add all docs in the section
    if (section.docs) {
      for (const doc of section.docs) {
        // Skip if same as section path (already added)
        if (doc.path !== section.path) {
          paths.push({ path: doc.path, title: doc.title, section: section.title })
        }
      }
    }
  }
  
  return paths
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get('v') ?? config.defaultVersion
  
  // Check if client accepts gzip
  const acceptEncoding = request.headers.get('accept-encoding') ?? ''
  const supportsGzip = acceptEncoding.includes('gzip')
  
  // Try to serve pre-computed cached response
  if (supportsGzip) {
    const cachedGzip = getCachedAllDocsGzip(version)
    if (cachedGzip) {
      return new Response(new Uint8Array(cachedGzip), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
  }
  
  // Try cached JSON (uncompressed)
  const cachedJson = getCachedAllDocs(version)
  if (cachedJson) {
    return NextResponse.json(cachedJson)
  }
  
  // Fallback: fetch docs on demand (shouldn't happen if preload worked)
  try {
    const toc = await getTableOfContents(version)
    const docPaths = getAllDocPaths(toc)
    
    // Fetch all docs in parallel using cached getDocument
    const docResults = await Promise.all(
      docPaths.map(async ({ path, title, section }) => {
        const fullPath = `${version}/${path}`
        const doc = await getDocument(fullPath)
        
        if (doc) {
          return {
            path,
            title,
            content: doc.content,
            section
          }
        }
        return null
      })
    )
    
    // Filter out null results
    const docs = docResults.filter((doc): doc is DocContent => doc !== null)
    
    return NextResponse.json({ docs, version })
  } catch (error) {
    console.error('Error fetching all docs:', error)
    return NextResponse.json({ docs: [], version }, { status: 500 })
  }
}
