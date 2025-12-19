import { NextResponse } from 'next/server'
import { getTableOfContents } from '@/utils/docsServer'
import config from '@/../config.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get('v') ?? config.defaultVersion
  
  try {
    const toc = await getTableOfContents(version)
    return NextResponse.json({ toc })
  } catch {
    return NextResponse.json({ toc: [] }, { status: 404 })
  }
}
