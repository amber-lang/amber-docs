import { useState, useEffect } from 'react'

/**
 * Manages the docked state logic for mobile experiences.
 */
export function useDockedSearch(
    isInputFocused: boolean, 
    dockable: boolean, 
    inputRef: React.RefObject<HTMLInputElement | null>,
    containerRef: React.RefObject<HTMLDivElement | null>
) {
    const [isDocked, setIsDocked] = useState(false)

    // Update docked state on resize/focus
    useEffect(() => {
        if (isInputFocused && containerRef.current) {
            const updateDocked = () => {
                const isMobile = window.innerWidth <= 1000
                const docked = isMobile && dockable && isInputFocused
                setIsDocked(docked)
            }

            updateDocked()
            window.addEventListener('resize', updateDocked)
            return () => window.removeEventListener('resize', updateDocked)
        } else {
            setIsDocked(false)
        }
    }, [isInputFocused, dockable, containerRef])

    // Handle scroll dismissal when docked
    useEffect(() => {
        if (isDocked) {
            const handleScroll = () => {
                inputRef.current?.blur()
            }
            // Delay listener to avoid initial keyboard layout shift triggering it
            const timer = setTimeout(() => {
                window.addEventListener('scroll', handleScroll, { passive: true })
            }, 500)
            
            return () => {
                clearTimeout(timer)
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [isDocked, inputRef])

    return { isDocked }
}
