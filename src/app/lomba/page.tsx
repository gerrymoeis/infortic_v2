import { getCompetitions, getCompetitionsTotalPages, getCompetitionsTotalCount, getLombaParticipantCategories, getLombaPriceRanges } from '@/lib/data'
import { CompetitionCard } from '@/components/ui/competition-card'
import Pagination from '@/components/ui/pagination'
import { CompetitionSkeleton } from '@/components/ui/competition-skeleton'
import { Suspense } from 'react'
import type { Metadata } from 'next'

type LombaPageProps = {
  searchParams?: {
    query?: string
    page?: string
    participant?: string
    price?: string
  }
}

export async function generateMetadata({ searchParams }: LombaPageProps): Promise<Metadata> {
  const query = searchParams?.query || ''
  const participantCategory = searchParams?.participant || ''
  const priceRange = searchParams?.price || ''

  let title = 'Daftar Lomba IT & Desain Terbaru | Infortic'
  let description = 'Temukan dan ikuti berbagai kompetisi IT, pemrograman, desain UI/UX, dan teknologi lainnya untuk mahasiswa dan siswa. Tingkatkan skill dan raih prestasi bersama Infortic.'

  if (query) {
    title = `Hasil Pencarian untuk "${query}" | Infortic`
    description = `Menampilkan hasil pencarian lomba untuk kata kunci "${query}". Temukan kompetisi yang paling relevan untukmu.`
  } else if (participantCategory || priceRange) {
    title = `Filter Lomba: ${participantCategory || ''} ${priceRange || ''} | Infortic`
    description = `Menampilkan daftar lomba yang telah difilter berdasarkan kategori peserta: ${participantCategory} dan rentang harga: ${priceRange}.`
  }

  return {
    title,
    description,
    keywords: ['lomba IT', 'kompetisi pemrograman', 'lomba desain', 'gemastik', 'olivia', 'lomba mahasiswa', 'infolomba', 'event mahasiswa'],
    openGraph: {
      title,
      description,
      url: '/lomba',
      siteName: 'Infortic',
      images: [
        {
          url: '/images/og-image-lomba.jpg', // Pastikan gambar ini ada di folder public
          width: 1200,
          height: 630,
          alt: 'Daftar Lomba IT & Desain di Infortic',
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-lomba.jpg'],
    },
  }
}
import { CompetitionSearchBar } from '@/components/ui/competition-search-bar'
import { Search as SearchIcon, Sparkles } from 'lucide-react'



async function Competitions({ 
  query, 
  currentPage, 
  participantCategory,
  priceRange
}: {
  query: string; 
  currentPage: number; 
  participantCategory?: string;
  priceRange?: string;
}) {
  const competitions = await getCompetitions(query, currentPage, participantCategory, priceRange);
  const totalCount = await getCompetitionsTotalCount(query, participantCategory, priceRange);

  if (competitions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Tidak ada kompetisi ditemukan</h3>
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
          <span>{totalCount} kompetisi ditemukan</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  )
}

export default async function LombaPage({ searchParams }: LombaPageProps) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const participantCategory = searchParams?.participant || ''
  const priceRange = searchParams?.price || ''

  const totalPages = await getCompetitionsTotalPages(query, participantCategory, priceRange);
  const participantCategories = await getLombaParticipantCategories();
  const priceRanges = await getLombaPriceRanges();

  return (
    <>
      <div className="min-h-screen bg-background/25">
        <div className="container pt-24 pb-12">
          {/* Hero Section */}
          <div className="relative z-10 text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                Daftar Lomba & Kompetisi
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Temukan dan ikuti berbagai kompetisi pemrograman, desain UI/UX, dan cabang lomba lainnya. 
                Saatnya mengasah skill dan meraih prestasi terbaikmu!
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <CompetitionSearchBar 
              participantCategories={participantCategories}
              priceRanges={priceRanges}
            />
          </div>

          {/* Competitions Grid */}
          <div className="relative z-10">
            <Suspense key={JSON.stringify(searchParams)} fallback={<CompetitionsSkeleton />}>
              <Competitions 
                query={query} 
                currentPage={currentPage} 
                participantCategory={participantCategory}
                priceRange={priceRange}
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

function CompetitionsSkeleton() {
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
          <CompetitionSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}