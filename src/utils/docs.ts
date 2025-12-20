import { TocSection } from "./docsServer";

export type FlatDoc = { path: string, title: string, disableLevels?: number[], section?: string };
export type DocDescriptor = { index: number } & FlatDoc;

export function getFlatTableOfContents(toc: TocSection[]): FlatDoc[] {
    return toc.map((section: TocSection) => {
        const uniqueDocs = section.docs.filter(d => d.path !== section.path)
        const docsWithSection = uniqueDocs.map(d => ({ ...d, section: section.title }))
        return [{ ...section, section: section.title }, ...docsWithSection]
    }).flat() as FlatDoc[]
}

export function getDocDescriptor(toc: TocSection[], path: string) {
    const docs = getFlatTableOfContents(toc)
    const index = docs.findIndex((doc) => doc.path === path)
    return { index, ...docs[index] }
}
