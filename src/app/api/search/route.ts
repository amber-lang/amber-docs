import { NextResponse } from 'next/server'
import Search from './search'
import config from "@/../config.json"

const search = new Search()
search.init()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const version = searchParams.get('v')
    const results = await search.search(version ?? config.defaultVersion, query ?? '')
    return NextResponse.json({ results })
}
