import 'cal-sans'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import SidebarProvider from '@/contexts/DocumentContext/SidebarProvider'
import TopLoader from '@/components/TopLoader/TopLoader'

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
    <html lang="en">
      <head>
        <link rel='icon' href='/internal/favicon.png'/>
        <meta name='view-transition' content='same-origin'/>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider>
            <TopLoader />
            <main>
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
