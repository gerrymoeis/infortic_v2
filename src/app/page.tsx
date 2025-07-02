import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { ArrowRight, Search, Trophy, Award, Sparkles } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infortic: Platform Kompetisi, Magang & Pelatihan IT untuk Mahasiswa',
  description: 'Cari informasi lomba pemrograman, magang, beasiswa, dan bootcamp terbaru di Indonesia. Infortic membantu mahasiswa IT mengembangkan skill dan meraih prestasi.',
  keywords: ['kompetisi pemrograman', 'lomba IT', 'magang IT', 'beasiswa teknologi', 'bootcamp coding', 'informasi lomba', 'infortic'],
  openGraph: {
    title: 'Infortic: Platform Kompetisi, Magang & Pelatihan IT untuk Mahasiswa',
    description: 'Temukan semua informasi seputar kompetisi, magang, beasiswa, dan bootcamp IT di satu tempat. Raih potensimu bersama Infortic.',
    images: [
      {
        url: '/images/og-image-homepage.jpg', // Make sure to create this image
        width: 1200,
        height: 630,
        alt: 'Infortic Homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infortic: Platform Kompetisi, Magang & Pelatihan IT untuk Mahasiswa',
    description: 'Temukan semua informasi seputar kompetisi, magang, beasiswa, dan bootcamp IT di satu tempat. Raih potensimu bersama Infortic.',
    images: ['/images/og-image-homepage.jpg'], // Make sure to create this image
  },
}

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-primary opacity-5 blur-[100px]" />
          <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-secondary opacity-5 blur-3xl" />
          <div className="absolute left-0 bottom-1/4 h-64 w-64 rounded-full bg-primary opacity-5 blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Platform Informasi Mahasiswa Terlengkap
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary sm:text-6xl">
              Pusat Informasi Karir & Prestasi Mahasiswa IT Indonesia
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Temukan ribuan peluang kompetisi, magang, beasiswa, dan bootcamp yang terverifikasi untuk mengasah skill, membangun portofolio, dan meluncurkan karir teknologimu. Infortic adalah jembatanmu menuju prestasi.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link href="/lomba">
                  Jelajahi Lomba
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 animate-float-slow">
          <div className="h-20 w-20 rounded-lg border bg-background/50 p-4 backdrop-blur-sm">
            <Trophy className="h-full w-full text-primary" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 animate-float-slow animation-delay-500">
          <div className="h-16 w-16 rounded-lg border bg-background/50 p-3 backdrop-blur-sm">
            <Award className="h-full w-full text-secondary" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 md:py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary opacity-5 blur-3xl" />
          <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-secondary opacity-5 blur-3xl" />
        </div>

        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative rounded-lg border-2 p-8 transition-all hover:border-primary/50 hover:bg-muted/50">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Pencarian Mudah</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Temukan lomba yang sesuai dengan minat dan bidangmu dengan mudah menggunakan fitur pencarian kami.
              </p>
              {/* Hover Border Effect */}
              <div className="absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
              </div>
            </div>
            <div className="group relative rounded-lg border-2 p-8 transition-all hover:border-primary/50 hover:bg-muted/50">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Info Lengkap</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Dapatkan informasi detail tentang setiap lomba, mulai dari hadiah, deadline, hingga persyaratan.
              </p>
              {/* Hover Border Effect */}
              <div className="absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
              </div>
            </div>
            <div className="group relative rounded-lg border-2 p-8 transition-all hover:border-primary/50 hover:bg-muted/50">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Selalu Up-to-Date</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Informasi lomba selalu diperbarui secara otomatis untuk memastikan kamu tidak melewatkan kesempatan.
              </p>
              {/* Hover Border Effect */}
              <div className="absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
