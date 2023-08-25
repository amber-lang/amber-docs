import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navigation from '@/components/Navigation/Navigation'
import SidebarProvider from '@/contexts/DocumentContext/SidebarProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amber Docs',
  description: 'Documentation for Amber programming language',
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
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider>
            <Navigation/>
            <main>
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
