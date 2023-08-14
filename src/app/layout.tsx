import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'

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
              <div className='nav-left'>
              <Link href="https://marble.software/" className='link'>
                  <img src="internal/amber.svg" alt="amber" className='logo'/>
                </Link>
              <span className='title'>
                <Link href="/">
                  Amber
                </Link>
              </span>
              </div>
                <SearchBar/>
              <div className='nav-right'>
                <Button>
                <Icon src='internal/side-bar.svg' size='2rem'/>
                </Button>
                <Button>
                <Icon src='internal/moon.svg' size='2rem'/>
                </Button>
                <Button>
                <Icon src='internal/marble.svg' size='2rem'/>
                </Button>
              </div>
        </nav>
              <main>
                {children}
              </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
