'use client'

import { useTheme } from '@/contexts/ThemeContext';
import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
    const { theme, mode } = useTheme()
    return (
        <NextTopLoader
            color={theme[mode].accent}
            initialPosition={0.08}
            crawlSpeed={1000}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={500}
        />
    )
}