'use client'

import { useCallback } from 'react'

/**
 * Provides safe, memoized accessors for browser localStorage with server-side rendering guards.
 *
 * The hook returns three stable callbacks:
 * - `getItem(key)`: retrieves the string value for `key` or `null` if unavailable or on error.
 * - `setItem(key, value)`: stores `value` under `key` and returns `true` on success, `false` if unavailable or on error.
 * - `removeItem(key)`: removes `key` and returns `true` on success, `false` if unavailable or on error.
 *
 * @returns An object containing `{ getItem, setItem, removeItem }` where `getItem` is `(key: string) => string | null`, and `setItem` / `removeItem` are `(key: string, value?: string) => boolean` as described above.
 */
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
