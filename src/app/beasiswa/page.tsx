import { Suspense } from 'react'
import type { Metadata } from 'next'

import { BackgroundElements } from '@/components/ui/background-elements'
import { CompetitionSkeleton } from '@/components/ui/competition-skeleton' // TODO: Create BeasiswaSkeleton
import { BeasiswaSearchBar } from '@/components/ui/beasiswa-search-bar'
import { BeasiswaCard } from '@/components/ui/beasiswa-card'
import { getBeasiswa, getBeasiswaTotalPages, getBeasiswaTotalCount } from '@/lib/data'

import { Search as SearchIcon, Sparkles } from 'lucide-react'
import Pagination from '@/components/ui/pagination'

type BeasiswaPageProps = {
  searchParams?: {
    query?: string
    page?: string
    education?: string
    location?: string
  }
}

export const metadata: Metadata = {
  title: 'Cari Beasiswa Terbaru | Infortic',
  description: 'Temukan berbagai peluang beasiswa S1, S2, dalam dan luar negeri untuk mahasiswa Indonesia. Raih pendanaan untuk pendidikanmu bersama Infortic.',
  keywords: ['beasiswa s1', 'beasiswa s2', 'beasiswa mahasiswa', 'info beasiswa', 'beasiswa 2025', 'beasiswa luar negeri', 'beasiswa dalam negeri'],
  openGraph: {
    title: 'Cari Beasiswa Terbaru | Infortic',
    description: 'Temukan berbagai peluang beasiswa untuk mahasiswa Indonesia.',
    url: '/beasiswa',
    siteName: 'Infortic',
    images: [
      {
        url: '/images/og-image-beasiswa.jpg', // Pastikan gambar ini ada
        width: 1200,
        height: 630,
        alt: 'Peluang Beasiswa di Infortic',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cari Beasiswa Terbaru | Infortic',
    description: 'Temukan berbagai peluang beasiswa untuk mahasiswa Indonesia.',
    images: ['/images/og-image-beasiswa.jpg'],
  },
}

async function BeasiswaList({ 
  query, 
  currentPage, 
  education,
  location
}: {
  query: string; 
  currentPage: number; 
  education?: string;
  location?: string;
}) {
  const beasiswa = await getBeasiswa(query, currentPage, education, location);
  const totalCount = await getBeasiswaTotalCount(query, education, location);

  if (beasiswa.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Beasiswa tidak ditemukan</h3>
          <p className="text-muted-foreground">
            Coba gunakan kata kunci atau filter yang berbeda.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>{totalCount} beasiswa ditemukan</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beasiswa.map((item) => (
          <BeasiswaCard key={item.id} beasiswa={item} />
        ))}
      </div>
    </div>
  )
}

export default async function BeasiswaPage({ searchParams }: BeasiswaPageProps) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const education = searchParams?.education
  const location = searchParams?.location

  const totalPages = await getBeasiswaTotalPages(query, education, location)

  return (
    <main className="min-h-screen">
      <div className="relative isolate overflow-hidden">
        <BackgroundElements />
        <div className="container relative z-10 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Peluang Beasiswa
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Temukan dan raih kesempatan beasiswa impianmu. Mulai dari pendanaan penuh, parsial, hingga bantuan biaya hidup.
            </p>
          </div>

          <div className="mt-16">
            <BeasiswaSearchBar />
          </div>

          <div className="mt-8">
            <Suspense key={query + currentPage + education + location} fallback={<CompetitionSkeleton />}>
              <BeasiswaList 
                query={query} 
                currentPage={currentPage} 
                education={education}
                location={location}
              />
            </Suspense>
          </div>

          <div className="mt-12 flex justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  )
}
