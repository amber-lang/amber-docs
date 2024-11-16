'use client'

import React, { createContext } from 'react'

interface Context {
    version: string
}

// Create context based on the os preference
export const VersionContext = createContext<Context | null>(null)

export default function useVersion(): Context {
    const ctx = React.useContext(VersionContext)
    if (!ctx) throw new Error('useVersion must be used within a VersionProvider')
    return ctx
}
