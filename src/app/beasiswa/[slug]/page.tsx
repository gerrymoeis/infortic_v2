import { getBeasiswaBySlug, getAllBeasiswaSlugs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, ExternalLink, Briefcase, Download, Link as LinkIcon } from 'lucide-react';
import { formatDate, getDaysLeft } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllBeasiswaSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const beasiswa = await getBeasiswaBySlug(params.slug);

  if (!beasiswa) {
    return {
      title: 'Beasiswa Tidak Ditemukan',
      description: 'Halaman beasiswa yang Anda cari tidak dapat ditemukan.',
    };
  }

  // Basic text extraction for description
  const plainDescription = beasiswa.description?.replace(/<[^>]+>/g, '').substring(0, 155) || 'Informasi detail beasiswa.';

  return {
    title: `${beasiswa.title} | Infortic`,
    description: `${plainDescription}...`,
    openGraph: {
      title: `${beasiswa.title} | Infortic`,
      description: `Detail beasiswa ${beasiswa.title}.`,
      images: [
        {
          url: beasiswa.image_url || '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: beasiswa.title,
        },
      ],
    },
  };
}

export default async function BeasiswaDetailPage({ params }: Props) {
  const beasiswa = await getBeasiswaBySlug(params.slug);

  if (!beasiswa) {
    notFound();
  }

  const daysLeft = getDaysLeft(beasiswa.deadline_date);
  const formattedDeadline = formatDate(beasiswa.deadline_date);

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg ring-1 ring-white/10">
        <header className="mb-8">
          <div className="relative aspect-[16/9] w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={beasiswa.image_url || '/images/placeholder.webp'}
              alt={`Poster ${beasiswa.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">{beasiswa.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            <span className="text-primary">Diselenggarakan oleh {beasiswa.organizer || 'Tidak diketahui'}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">Deskripsi Beasiswa</h2>
            <div
              className="prose dark:prose-invert mt-4 max-w-none description-content"
              dangerouslySetInnerHTML={{ __html: beasiswa.description || '<p>Tidak ada deskripsi detail.</p>' }}
            />
          </div>
          
          <aside className="space-y-6 lg:mt-12">
            <div className="bg-background/50 p-4 rounded-lg ring-1 ring-white/10">
              <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">Informasi Penting</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <CalendarDays className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Batas Pendaftaran</span>
                    <p className="text-muted-foreground">{formattedDeadline}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Jenjang</span>
                    <p className="text-muted-foreground">{beasiswa.education_level}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Lokasi</span>
                    <p className="text-muted-foreground">{beasiswa.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {daysLeft !== null && (
              <div className={`text-center p-3 rounded-lg font-bold text-white ${daysLeft < 0 ? 'bg-destructive/80' : daysLeft <= 7 ? 'bg-amber-600/80' : 'bg-primary/80'}`}>
                {daysLeft < 0 ? 'Pendaftaran Telah Ditutup' : daysLeft === 0 ? 'Hari Terakhir Pendaftaran!' : `${daysLeft} Hari Tersisa`}
              </div>
            )}

            <div className="space-y-3">
              {beasiswa.source_url && (
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Link href={beasiswa.source_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Sumber Informasi
                  </Link>
                </Button>
              )}
              {beasiswa.booklet_url && (
                <Button asChild size="lg" variant="outline" className="w-full font-semibold">
                  <Link href={beasiswa.booklet_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Unduh Booklet
                  </Link>
                </Button>
              )}
            </div>

          </aside>
        </div>
      </article>
    </div>
  );
}
