import { getBeasiswa, getBeasiswaTotalPages, getBeasiswaTotalCount, getBeasiswaEducationLevels, getBeasiswaLocations } from '@/lib/data'
import { BeasiswaCard } from '@/components/ui/beasiswa-card'
import Pagination from '@/components/ui/pagination'
import { BeasiswaSkeleton } from '@/components/ui/beasiswa-skeleton'
import { Suspense } from 'react'
import type { Metadata } from 'next'

type BeasiswaPageProps = {
  searchParams?: {
    query?: string
    page?: string
    education?: string
    location?: string
  }
}

export async function generateMetadata({ searchParams }: BeasiswaPageProps): Promise<Metadata> {
  const query = searchParams?.query || ''
  const education = searchParams?.education || ''
  const location = searchParams?.location || ''

  let title = 'Daftar Beasiswa S1 & S2 Terbaru | Infortic'
  let description = 'Temukan berbagai peluang beasiswa S1, S2, dalam dan luar negeri untuk mahasiswa Indonesia. Raih pendanaan untuk pendidikanmu bersama Infortic.'

  if (query) {
    title = `Hasil Pencarian untuk "${query}" | Infortic`
    description = `Menampilkan hasil pencarian beasiswa untuk kata kunci "${query}". Temukan peluang beasiswa yang paling relevan untukmu.`
  } else if (education || location) {
    title = `Filter Beasiswa: ${education || ''} ${location || ''} | Infortic`
    description = `Menampilkan daftar beasiswa yang telah difilter berdasarkan jenjang pendidikan: ${education} dan lokasi: ${location}.`
  }

  return {
    title,
    description,
    keywords: ['beasiswa s1', 'beasiswa s2', 'beasiswa mahasiswa', 'info beasiswa', 'beasiswa 2025', 'beasiswa luar negeri', 'beasiswa dalam negeri', 'peluang beasiswa'],
    openGraph: {
      title,
      description,
      url: '/beasiswa',
      siteName: 'Infortic',
      images: [
        {
          url: '/images/og-image-beasiswa.jpg', // Pastikan gambar ini ada di folder public
          width: 1200,
          height: 630,
          alt: 'Daftar Beasiswa S1 & S2 di Infortic',
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-beasiswa.jpg'],
    },
  }
}

import { BeasiswaSearchBar } from '@/components/ui/beasiswa-search-bar'
import { Search as SearchIcon, Sparkles } from 'lucide-react'

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
          <h3 className="text-xl font-semibold text-foreground mb-2">Tidak ada beasiswa ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah kata kunci pencarian atau filter yang digunakan
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
  const education = searchParams?.education || ''
  const location = searchParams?.location || ''

  const totalPages = await getBeasiswaTotalPages(query, education, location)
  const educationLevels = await getBeasiswaEducationLevels()
  const beasiswaLocations = await getBeasiswaLocations()

  return (
    <>
      <div className="min-h-screen bg-background/25">
        <div className="container pt-24 pb-12">
          {/* Hero Section */}
          <div className="relative z-10 text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                Peluang Beasiswa
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Temukan dan raih kesempatan beasiswa impianmu. Mulai dari pendanaan penuh, parsial, hingga bantuan biaya hidup untuk masa depan yang lebih cerah!
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <BeasiswaSearchBar educationLevels={educationLevels} beasiswaLocations={beasiswaLocations} />
          </div>

          {/* Beasiswa Grid */}
          <div className="relative z-10">
            <Suspense key={JSON.stringify(searchParams)} fallback={<BeasiswaListSkeleton />}>
              <BeasiswaList 
                query={query} 
                currentPage={currentPage} 
                education={education}
                location={location}
              />
            </Suspense>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function BeasiswaListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="w-32 h-4 bg-muted rounded animate-pulse" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <BeasiswaSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}