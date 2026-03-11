import { TocSection } from "./docsServer";

export type FlatDoc = { path: string, title: string, disableLevels?: number[], section?: string };
export type DocDescriptor = { index: number } & FlatDoc;

/**
 * Produce a flat array of document entries from a hierarchical table of contents, attaching each entry's section title.
 *
 * Section entries are included followed by their child documents. If a section's `docs` is absent it is treated as empty,
 * and any doc whose `path` equals the section's `path` is excluded.
 *
 * @param toc - Array of table-of-contents sections to flatten
 * @returns An array of `FlatDoc` objects where each item includes a `section` property containing the parent section's title; section entries appear immediately before their associated docs
 */
export function getFlatTableOfContents(toc: TocSection[]): FlatDoc[] {
    return toc.map((section: TocSection) => {
        const uniqueDocs = (section.docs ?? []).filter(d => d.path !== section.path)
        const docsWithSection = uniqueDocs.map(d => ({ ...d, section: section.title }))
        return [{ ...section, section: section.title }, ...docsWithSection]
    }).flat() as FlatDoc[]
}

export function getDocDescriptor(toc: TocSection[], path: string) {
    const docs = getFlatTableOfContents(toc)
    const index = docs.findIndex((doc) => doc.path === path)
    return { index, ...docs[index] }
}
