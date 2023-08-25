'use client'

import React, { createContext } from 'react'

export interface SidebarModel {
    isOpen: boolean
}

export interface SidebarActions {
    setSidebar: (isOpen: boolean) => void
}

// Create context based on the os preference
export const SidebarContext = createContext<SidebarModel & SidebarActions | null>(null)

export default function useSidebar(): SidebarModel & SidebarActions {
    const ctx = React.useContext(SidebarContext)
    if (!ctx) throw new Error('useSidebar must be used within a DocumentProvider')
    return ctx
}

