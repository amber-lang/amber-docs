import { readFile } from '@/utils/files'
import { getFlatTableOfContents, FlatDoc } from '@/utils/docs'
import { getTableOfContents } from '@/utils/docsServer'
import config from '@/../config.json'

interface Documentation {
    toc: FlatDoc[]
    docs: string[]
}

export default class Search {
    private versionMap: Map<string, Documentation> = new Map()

    async init() {
        for (const version of config.visibleVersions) {
            const toc = getFlatTableOfContents(await getTableOfContents(version))
            const docs = await Promise.all(toc.map(async (file) => await readFile(`${version}/${file.path}`) ?? ''))
            this.versionMap.set(version, { toc, docs })
        }
    }

    async search(version: string, query: string) {
        if (!this.versionMap.size) await this.init()
        const documentation = this.versionMap.get(version)
        if (!documentation) return []
        const results = documentation.docs.map((doc, index) => {
            const regex = new RegExp(query, 'gi')
            const matches = [...doc.match(regex) ?? [], ...documentation.toc[index].title.match(regex) ?? []]
            if (!matches.length) return null
            const result = { ...documentation.toc[index], matches: matches.length }
            result.path = `${version}/${result.path}`
            return result
        }).filter(Boolean)
        return results.filter((item) => item?.matches).sort((a, b) => (b?.matches ?? 0) - (a?.matches ?? 0))
    }
}
