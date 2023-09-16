import { getDoc } from '@/utils/files'
import { getFlatTableOfContents, FlatDoc } from '@/utils/docs'

export default class Search {
    private toc: FlatDoc[] = []
    private docs: string[] = []

    constructor() {
        this.toc = Array.from(getFlatTableOfContents())
    }

    async index() {
        this.docs = await Promise.all(this.toc.map(async (file) => await getDoc(file.path) ?? ''))
    }

    async search(query: string) {
        if (!this.docs.length) await this.index()
        const results = this.docs.map((doc, index) => {
            const regex = new RegExp(query, 'gi')
            const matches = [...doc.match(regex) ?? [], ...this.toc[index].title.match(regex) ?? []]
            return matches ? { ...this.toc[index], matches: matches.length } : null
        }).filter(Boolean)
        return results.filter((item) => item?.matches).sort((a, b) => (b?.matches ?? 0) - (a?.matches ?? 0))
    }
}