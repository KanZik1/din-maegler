import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Navigation from '@/components/navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Din Mægler',
  description: 'Find din drømmebolig med Din Mægler',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <Header />
        <Navigation />
        <main className="max-w-[1600px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}