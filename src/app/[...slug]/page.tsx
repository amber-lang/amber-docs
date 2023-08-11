'use client'

import ChapterNavigation from '@/components/ChapterNavigation/ChapterNavigation'
import Markdown from '@/components/Markdown/Markdown'
import { useDocument } from '@/contexts/DocumentContext'
import { useEffect, useState } from 'react'
import style from './page.module.css'

interface Props {
  params: {
    slug: string[]
  }
}

export default function Post({ params }: Props) {
  const { content, setDocument } = useDocument()
  const [init, setInit] = useState(false)

  const fetchDocuments = async () => {
    const path = params.slug.join('/')
    const res = await fetch(`/api/doc?file=${path}`)
    const file = await res.json()
    setDocument(path, file.doc)
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
    <div className={style.main}>
      <Markdown content={content} />
      <ChapterNavigation />
    </div>
  )
}
