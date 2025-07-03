import { getMagang, getMagangTotalPages, getMagangTotalCount, getMagangFields, getMagangLocations } from '@/lib/data'
import { MagangCard } from '@/components/ui/magang-card'
import Pagination from '@/components/ui/pagination'
import { MagangSkeleton } from '@/components/ui/magang-skeleton'
import { Suspense } from 'react'
import type { Metadata } from 'next'

type MagangPageProps = {
  searchParams?: {
    query?: string
    page?: string
    field?: string
    location?: string
  }
}

export async function generateMetadata({ searchParams }: MagangPageProps): Promise<Metadata> {
  const query = searchParams?.query || ''
  const field = searchParams?.field || ''
  const location = searchParams?.location || ''

  let title = 'Daftar Magang IT & Teknologi Terbaru | Infortic'
  let description = 'Temukan peluang magang di bidang teknologi, desain, pemrograman, dan lainnya. Filter berdasarkan bidang dan lokasi untuk menemukan yang paling cocok untukmu.'

  if (query) {
    title = `Hasil Pencarian untuk "${query}" | Infortic`
    description = `Menampilkan hasil pencarian magang untuk kata kunci "${query}". Temukan kesempatan magang yang paling relevan untukmu.`
  } else if (field || location) {
    title = `Filter Magang: ${field || ''} ${location || ''} | Infortic`
    description = `Menampilkan daftar magang yang telah difilter berdasarkan bidang: ${field} dan lokasi: ${location}.`
  }

  return {
    title,
    description,
    keywords: ['magang', 'internship', 'lowongan magang', 'magang IT', 'magang desain', 'magang teknologi', 'peluang magang', 'magang mahasiswa'],
    openGraph: {
      title,
      description,
      url: '/magang',
      siteName: 'Infortic',
      images: [
        {
          url: '/images/og-image-magang.jpg', // Pastikan gambar ini ada di folder public
          width: 1200,
          height: 630,
          alt: 'Daftar Magang IT & Teknologi di Infortic',
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-magang.jpg'],
    },
  }
}

import { MagangSearchBar } from '@/components/ui/magang-search-bar'
import { Search as SearchIcon, Sparkles } from 'lucide-react'

async function MagangList({ 
  query, 
  currentPage, 
  field,
  location
}: {
  query: string; 
  currentPage: number; 
  field?: string;
  location?: string;
}) {
  const magang = await getMagang(query, currentPage, field, location);
  const totalCount = await getMagangTotalCount(query, field, location);

  if (magang.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Tidak ada magang ditemukan</h3>
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
          <span>{totalCount} magang ditemukan</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {magang.map((item) => (
          <MagangCard key={item.id} magang={item} />
        ))}
      </div>
    </div>
  )
}

export default async function MagangPage({ searchParams }: MagangPageProps) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const field = searchParams?.field || ''
  const location = searchParams?.location || ''

  const totalPages = await getMagangTotalPages(query, field, location)
  const magangFields = await getMagangFields()
  const magangLocations = await getMagangLocations()

  return (
    <>
      
      
      <div className="min-h-screen bg-background/25">
        <div className="container pt-24 pb-12">
          {/* Hero Section */}
          <div className="relative z-10 text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                Peluang Magang
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Temukan kesempatan magang impianmu di berbagai perusahaan teknologi terkemuka. 
                Saatnya memulai karier dan mengembangkan skill profesionalmu!
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <MagangSearchBar magangFields={magangFields} magangLocations={magangLocations} />
          </div>

          {/* Magang Grid */}
          <div className="relative z-10">
            <Suspense key={JSON.stringify(searchParams)} fallback={<MagangListSkeleton />}>
              <MagangList 
                query={query} 
                currentPage={currentPage} 
                field={field}
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

function MagangListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="w-32 h-4 bg-muted rounded animate-pulse" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <MagangSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}