import { getTableOfContents } from '@/utils/docs'

interface Props {
  params: {
    slug: string[]
  }
}

export default async function Post({ params }: Props) {
  const toc = getTableOfContents()
  return (
    <div>
      {params.slug.join('/')}
      <br/>
      {toc.join(', ')}
    </div>
  )
}