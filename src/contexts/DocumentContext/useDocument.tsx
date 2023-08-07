'use client'

import React, { createContext } from 'react'

export interface DocumentModel {
    headers: string[],
    content: string,
}

export interface DocumentActions {
    setDocument: (content: string) => void,
}

// Create context based on the os preference
export const DocumentContext = createContext<DocumentModel & DocumentActions | null>(null)

export default function useDocument(): DocumentModel & DocumentActions {
    const ctx = React.useContext(DocumentContext)
    if (!ctx) throw new Error('useDocument must be used within a DocumentProvider')
    return ctx
}

