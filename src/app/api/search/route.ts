import { NextResponse } from 'next/server'
import Search from './search'

const search = new Search()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const results = await search.search(query ?? '')
    return NextResponse.json({ results })
}
