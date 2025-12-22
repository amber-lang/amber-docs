import Link from 'next/link'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './OnThisPage.module.css'
import { cleanHeading, slugify } from '@/utils/urls'
import { DocDescriptor } from '@/utils/docs'

interface Props {
    headers: string[]
    docDesc?: DocDescriptor
    fullHeight?: boolean
}

type Header = {
    level: number
    title: string
    slug: string
    relation: string
    distance: number
}

function getHeaderLevel(header: string): number {
    const matches = header.match(/^#+\s/)
    return matches ? matches[0].length - 1 : 0
}

function getRelation(level: number, prevLevel: number): string {
    switch (level - prevLevel) {
        case 1:
            return 'child'
        case 0:
            return 'sibling'
        default:
            return 'detached'
    }
}

function getHeaders(headers: string[], disableLevels?: number[]): Header[] {
    let distances = [0, 0, 0]
    let prevLevel = NaN
    const filterHeaders = (header: string) => (
        header.startsWith('#') && !disableLevels?.includes(getHeaderLevel(header))
    )
    return headers.filter(filterHeaders).map(header => {
        const level = Math.min(getHeaderLevel(header), 3) - 1
        const relation = getRelation(level, prevLevel)
        const distance = distances[level]
        for (const i of distances.keys()) {
            if (i < level) distances[i]++
            else if (i >= level) distances[i] = 0
        }
        prevLevel = level
        return {
            level,
            title: cleanHeading(header),
            slug: slugify(header),
            relation,
            distance
        }
    })
}

export default function OnThisPage({ headers, docDesc, fullHeight = false }: Props) {
    const titleHeader = docDesc?.title ? `# ${docDesc.title}` : ""
    const formattedHeaders = getHeaders([titleHeader, ...headers], docDesc?.disableLevels)

    const getHeaderLink = (slug: string) => {
        return ['#', slug].join('')
    }

    if (headers.length === 0) return null

    return (
        <div className={style.container}>
            <Island label="On this page">
                <div className={[style.links, style.page, fullHeight && style.fullHeight].filter(Boolean).join(' ')}>
                    {formattedHeaders.map(({ level, title, slug, relation, distance }, index) => (
                        <Link href={getHeaderLink(slug)} key={slug + index}>
                            <Text block>
                                <div
                                    className={style.indent}
                                    style={{ '--distance': distance.toString() } as any}
                                    data-indent={level}
                                    data-relation={relation}
                                >
                                    <div className={style.text}>
                                        {title}
                                    </div>
                                </div>
                            </Text>
                        </Link>
                    ))}
                </div>
            </Island>
        </div>
    )
}
