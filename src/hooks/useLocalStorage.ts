'use client'

import { useCallback } from 'react'

export default function useLocalStorage() {
    const getItem = useCallback((key: string): string | null => {
        try {
            if (typeof window === 'undefined') return null
            return window.localStorage.getItem(key)
        } catch {
            return null
        }
    }, [])

    const setItem = useCallback((key: string, value: string): boolean => {
        try {
            if (typeof window === 'undefined') return false
            window.localStorage.setItem(key, value)
            return true
        } catch {
            return false
        }
    }, [])

    const removeItem = useCallback((key: string): boolean => {
        try {
            if (typeof window === 'undefined') return false
            window.localStorage.removeItem(key)
            return true
        } catch {
            return false
        }
    }, [])

    return { getItem, setItem, removeItem }
}
