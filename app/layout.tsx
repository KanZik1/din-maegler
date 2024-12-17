import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Suspense } from 'react'
import Loading from './loading'
import ErrorBoundary from '@/components/error-boundary'

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
        <ErrorBoundary>
          <Header />
          <Navigation />
          <Suspense fallback={<Loading />}>
            <main className="max-w-[1600px] mx-auto">
              {children}
            </main>
          </Suspense>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}