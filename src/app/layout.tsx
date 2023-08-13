import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Link from 'next/link'

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
          <nav>
            <Link href="/">Home</Link>
          </nav>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
