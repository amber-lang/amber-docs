import 'cal-sans'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import SidebarProvider from '@/contexts/DocumentContext/SidebarProvider'

import VersionProvider from '@/contexts/VersionContext/VersionProvider'
import config from '@/../config.json'
import ThemeScript from '@/contexts/ThemeContext/ThemeScript'
import ThemeStyles from '@/contexts/ThemeContext/ThemeStyles'
import { defaultThemeConfig } from '@/contexts/ThemeContext/config'
import { DocsCacheProvider } from '@/contexts/DocsCache'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Amber Documentation',
    description: 'Documentation for Amber programming language',
    openGraph: {
        title: 'Amber Documentation',
        siteName: 'Documentation for Amber programming language',
        type: 'website',
        images: [
            {
                url: 'https://docs.amber-lang.com/og.jpeg'
            }
        ]
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
        <html lang="en" suppressHydrationWarning>
            <head>
            <link rel='icon' href='/internal/favicon.png'/>
            <meta name='view-transition' content='same-origin'/>
            <ThemeScript />
            <ThemeStyles theme={defaultThemeConfig()} />
            </head>
            <body className={inter.className}>
                <ThemeProvider>
                    <SidebarProvider>
                        <DocsCacheProvider>
                            <VersionProvider version={config.defaultVersion}>
                                    <main>
                                        {children}
                                    </main>
                            </VersionProvider>
                        </DocsCacheProvider>
                    </ SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

