import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { ConditionalBackground } from '@/components/layout/conditional-background'

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
import { JsonLd } from '@/components/common/json-ld'

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
      <head>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Infortic',
          'url': 'https://infortic.vercel.app',
          'logo': 'https://infortic.vercel.app/images/logo.png',
          'sameAs': [
            'https://www.instagram.com/himafortic_unesa/',
            'https://www.youtube.com/@himaforticunesa1170',
            'https://www.tiktok.com/@himafortic_unesa'
          ]
        }} />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'url': 'https://infortic.vercel.app',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://infortic.vercel.app/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }} />
      </head>
            <body className={inter.className}>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K19R0CPLKS"></Script>
        <Script id="google-analytics">
          {
            `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-K19R0CPLKS');
            `
          }
        </Script>
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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
