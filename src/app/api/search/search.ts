import { readFile, extractKeywords } from '@/utils/files'
import { getFlatTableOfContents, FlatDoc } from '@/utils/docs'
import { getTableOfContents } from '@/utils/docsServer'
import config from '@/../config.json'
import { slugify } from '@/utils/urls'

interface Documentation {
    toc: FlatDoc[]
    docs: string[]
    keywords: { file: string[], headers: Map<string, string[]> }[]
}

function matchesKeyword(query: string, keyword: string): boolean {
    const q = query.toLowerCase()
    const k = keyword.toLowerCase()
    if (Math.abs(k.length - q.length) > 1) return false
    return k.includes(q) || q.includes(k)
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default class Search {
    private versionMap: Map<string, Documentation> = new Map()

    async init() {
        for (const version of config.visibleVersions) {
            const toc = getFlatTableOfContents(await getTableOfContents(version))
            const rawDocs = await Promise.all(toc.map(async (file) => await readFile(`${version}/${file.path}`) ?? ''))
            
            const processed = rawDocs.map(raw => extractKeywords(raw))
            const docs = processed.map(p => p.content)
            const keywords = processed.map(p => ({ file: p.keywords, headers: p.headerKeywords }))

            this.versionMap.set(version, { toc, docs, keywords })
        }
    }

    async search(version: string, query: string) {
        if (!this.versionMap.size) await this.init()
        const documentation = this.versionMap.get(version)
        if (!documentation) return []

        const results: any[] = []

        documentation.docs.forEach((doc, index) => {
            const tocItem = documentation.toc[index]
            const meta = documentation.keywords[index]
            
            // Check File Keywords
            let fileKeywordBonus = 0
            if (meta.file.some(k => matchesKeyword(query, k))) {
                fileKeywordBonus = 1000 // High priority for explicit file tags
            }

            // Check content matches
            const regex = new RegExp(escapeRegex(query), 'gi')
            const contentMatches = [...doc.match(regex) ?? [], ...tocItem.title.match(regex) ?? []]

            // Check File Title Match (Priority similar to Heading Text Match)
            let fileTitleBonus = 0
            if (tocItem.title.match(regex)) {
                fileTitleBonus = 750
            }
            
            if (contentMatches.length > 0 || fileKeywordBonus > 0 || fileTitleBonus > 0) {
                const result = { 
                    ...tocItem, 
                    matches: contentMatches.length + fileKeywordBonus + fileTitleBonus,
                    path: `${version}/${tocItem.path}`,
                    parentTitle: tocItem.section // Context for file matches
                }
                results.push(result)
            }

            // Check Headers (Keywords + Text)
            meta.headers.forEach((kws, headerTitle) => {
                const cleanTitle = headerTitle.replace(/^#+\s*/, '')
                let headerScore = 0

                // 1. Heading Keywords
                if (kws.some(k => matchesKeyword(query, k))) {
                    headerScore = Math.max(headerScore, 10000)
                }

                // 3. Heading Text Match (Priority over matched file text)
                // We use 750 to ensure it's below File Keywords (1000) but well above typical text counts
                const headerRegex = new RegExp(escapeRegex(query), 'gi')
                if (cleanTitle.match(headerRegex)) {
                    headerScore = Math.max(headerScore, 750) 
                }

                if (headerScore > 0) {
                    // Context for header matches: "Section > Page"
                    const context = tocItem.section ? `${tocItem.section} > ${tocItem.title}` : tocItem.title
                    
                    results.push({
                        title: cleanTitle,
                        path: `${version}/${tocItem.path}#${slugify(cleanTitle)}`,
                        matches: headerScore, 
                        parentTitle: context
                    })
                }
            })
        })

        return results.sort((a, b) => (b.matches ?? 0) - (a.matches ?? 0))
    }
}
