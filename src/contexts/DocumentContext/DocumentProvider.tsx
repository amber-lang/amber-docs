'use client'

import useDocument, { DocumentModel, DocumentContext } from './useDocument'
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

export default function DocumentProvider({ children }: Props) {
    const [document, setDocument] = useState<DocumentModel>({ headers: [], content: '', path: '' })
    
    const handleSetDocument = (path: string, content: string) => {
        const rawHeaders = content.split('\n').filter(line => line.startsWith('#'))
        const headers = rawHeaders.map(header => header.trimStart().replace(/^#+/, '').trim())
        setDocument({ headers, content, path })
    }

    return (
        <DocumentContext.Provider value={{
            ...document, setDocument: handleSetDocument
        }}>
            {children}
        </DocumentContext.Provider>
    )
}
