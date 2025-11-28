import { TocSection } from "./docsServer";

export type FlatDoc = { path: string, title: string, disableLevels?: number[] };
export type DocDescriptor = { index: number } & FlatDoc;

export function getFlatTableOfContents(toc: TocSection[]): FlatDoc[] {
    return toc.map((doc: FlatDoc & { docs: FlatDoc[] }) => [doc, ...doc.docs]).flat() as FlatDoc[]
}

export function getDocDescriptor(toc: TocSection[], path: string) {
    const docs = getFlatTableOfContents(toc)
    const index = docs.findIndex((doc) => doc.path === path)
    return { index, ...docs[index] }
}
