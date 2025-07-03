import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { ConditionalBackground } from '@/components/layout/conditional-background'

import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://infortic.vercel.app'),
  title: 'Infortic - Portal Informasi Lomba Indonesia',
  description: 'Temukan informasi lomba, kompetisi, dan event terbaru untuk mahasiswa dan pelajar Indonesia.',
  keywords: 'lomba, kompetisi, mahasiswa, pelajar, indonesia, dicoding, event, himafortic, infortic, unesa, surabaya, puspresnas, gemastik, olivia',
  authors: [{ name: 'Himafortic' }],
  creator: 'Himafortic',
  publisher: 'Himafortic',
  robots: 'index, follow',

  verification: {
    google: 'yXfpuFCl7zavNIz23JXFZY6nfR6y9naUhp_Oey6jJTc',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            {/* Navbar is now rendered inside each page as needed */}
            <ConditionalBackground />
            <Navbar />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        <SpeedInsights />
      </body>
    </html>
  )
}
