export type Variant = 'body' | 'title'

export interface SearchResult {
    path: string
    title: string
    parentTitle?: string
    matches: number
}

export interface Props {
    variant?: Variant
    placeholder?: string
    dockable?: boolean
}
