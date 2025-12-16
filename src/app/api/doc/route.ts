import { NextResponse } from 'next/server'
import { readFile } from '@/utils/files'

function getHeaders(content: string): string[] {
  let inCodeBlock = false
  return content.split('\n').filter(line => {
    if (line.startsWith('```')) inCodeBlock = !inCodeBlock
    return !inCodeBlock && /^#+\s/.test(line)
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')
  const doc = await readFile(file ?? '')
  const headers = doc ? getHeaders(doc) : []
  return NextResponse.json({ doc, headers })
}
