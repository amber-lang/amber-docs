import { getTableOfContents } from '@/utils/docs'
import { getDoc } from '@/utils/files'

interface Props {
  params: {
    slug: string[]
  }
}

export default async function Post({ params }: Props) {
  const doc = await getDoc(params.slug.join('/'))
  if (!doc) return (
    <div>
      {params.slug.join('/')}
      <br/>
      Not found
    </div>
  )
  return (
    <div>
      {params.slug.join('/')}
      <br/>
      {doc}
    </div>
  )
}