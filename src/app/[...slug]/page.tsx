'use client'

import Markdown from '@/components/Markdown/Markdown'
import { useDocument } from '@/contexts/DocumentContext'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    slug: string[]
  }
}

export default function Post({ params }: Props) {
  const { content, setDocument } = useDocument()
  const [init, setInit] = useState(false)

  const fetchDocuments = async () => {
    const res = await fetch(`/api/doc?file=${params.slug.join('/')}`)
    const file = await res.json()
    setDocument(file.doc)
    setInit(true)
  }

  useEffect(() => {
    fetchDocuments()
  }, [params.slug])

  
  if (!content && init) return (
    <div>
      {params.slug.join('/')}
      <br/>
      Not found
    </div>
  )
  return (
    <>
      <Markdown content={content} />
    </>
  )
}
