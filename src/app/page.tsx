'use client'

import { useDocument } from "@/contexts/DocumentContext"
import { useEffect } from "react"

export default function Post() {
  const { setDocument } = useDocument()

  useEffect(() => {
    setDocument('')
  }, [])

  return (
    <>
      Welcome to Home Page
    </>
  )
}
