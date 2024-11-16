'use client'

import config from "@/../config.json"
import { VersionContext } from './useVersion'

interface Props {
    children: React.ReactNode,
    version: string,
}

export default function VersionProvider({ children, version }: Props) {
    return (
        <VersionContext.Provider value={{ version }}>
            {children}
        </VersionContext.Provider>
    )
}
