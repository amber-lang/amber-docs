'use client'

import useDocument, { DocumentModel, DocumentContext } from './useDocument'
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

export default function DocumentProvider({ children }: Props) {
    const [document, setDocument] = useState<DocumentModel>({ headers: [], content: '' })
    
    const handleSetDocument = (content: string) => {
        const rawHeaders = content.split('\n').filter(line => line.startsWith('#'))
        const headers = rawHeaders.map(header => header.trimStart().replace(/^#+/, '').trim())
        setDocument({ headers, content })
    }

    return (
        <DocumentContext.Provider value={{
            ...document, setDocument: handleSetDocument
        }}>
            {children}
        </DocumentContext.Provider>
    )
}
