import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import SideBar from '@/components/SideBar/SideBar'

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
        <link rel='icon' href='/favicon.png'/>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
            <nav>
              <a href="/">Home</a>
            </nav>
            <main>
              <div className='left'>
                <SideBar />
              </div>
              <div className='right'>
                {/* <Page /> */}
                {children}
              </div>
            </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
