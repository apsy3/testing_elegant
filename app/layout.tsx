import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Make all pages dynamic for TESTING (skip prerender traps)
export const dynamic = 'force-dynamic'

// Keep metadata simple — DO NOT put themeColor here
export const metadata: Metadata = {
  title: { default: 'Your Brand', template: '%s | Your Brand' },
  description: 'Modern luxury storefront (test build).',
}

// themeColor belongs in viewport (not metadata)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Any client component that might use useSearchParams MUST be inside Suspense */}
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}
