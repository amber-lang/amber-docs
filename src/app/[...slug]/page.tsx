'use client'

import Markdown from '@/components/Markdown/Markdown'
import { useDocument } from '@/contexts/DocumentContext'
import { useEffect } from 'react'

interface Props {
  params: {
    slug: string[]
  }
}

export default function Post({ params }: Props) {
  const { content, setDocument } = useDocument()

  const fetchDocuments = async () => {
    const res = await fetch(`/api/doc?file=${params.slug.join('/')}`)
    const file = await res.json()
    setDocument(file.doc)
  }

  useEffect(() => {
    fetchDocuments()
  }, [params.slug])

  
  if (!content) return (
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