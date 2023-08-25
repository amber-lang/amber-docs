'use client'

import { SidebarModel, SidebarContext } from './useSidebar'
import React, { useState } from 'react'

interface Props {
    children: React.ReactNode
}

export default function SidebarProvider({ children }: Props) {
    const [sideBar, setSidebar] = useState<SidebarModel>({ isOpen: true })
    
    const handleSetSidebar = (isOpen: boolean) => {
        setSidebar({ isOpen })
    }

    return (
        <SidebarContext.Provider value={{
            ...sideBar, setSidebar: handleSetSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}
