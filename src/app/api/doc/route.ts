import { NextResponse } from 'next/server'
import { readFile } from '@/utils/files'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')
  const doc = await readFile(file ?? '')
  return NextResponse.json({ doc })
}
