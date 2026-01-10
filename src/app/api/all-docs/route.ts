import { NextResponse } from 'next/server'
import { getTableOfContents, TocSection } from '@/utils/docsServer'
import { readFile, extractKeywords } from '@/utils/files'
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
  
  try {
    const toc = await getTableOfContents(version)
    const docPaths = getAllDocPaths(toc)
    
    const docs: DocContent[] = []
    
    for (const { path, title, section } of docPaths) {
      const fullPath = `${version}/${path}`
      const rawContent = await readFile(fullPath)
      
      if (rawContent) {
        const { content } = extractKeywords(rawContent)
        docs.push({
          path,
          title,
          content,
          section
        })
      }
    }
    
    return NextResponse.json({ docs, version })
  } catch (error) {
    console.error('Error fetching all docs:', error)
    return NextResponse.json({ docs: [], version }, { status: 500 })
  }
}
