'use client'

import Markdown from '@/components/Markdown/Markdown'
import { useDocument } from '@/contexts/DocumentContext'
import { useEffect, useState } from 'react'
<<<<<<< Updated upstream
=======
import style from './page.module.css'
import NotFound from '../not-found'
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    setDocument(file.doc)
=======
    if (file.doc) setDocument(path, file.doc)
>>>>>>> Stashed changes
    setInit(true)
  }

  useEffect(() => {
    fetchDocuments()
  }, [params.slug])

  if (!content && init) return <NotFound />

  return (
    <>
      <Markdown content={content} />
    </>
  )
}
