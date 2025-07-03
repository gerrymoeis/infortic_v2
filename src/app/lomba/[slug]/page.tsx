import { getCompetitionBySlug, getAllLombaSlugs } from '@/lib/data';
import { parseRegistrationEndDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Users, Tag, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateStaticParams() {
  const slugs = await getAllLombaSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const competition = await getCompetitionBySlug(params.slug);

  if (!competition) {
    return {
      title: 'Lomba Tidak Ditemukan | Infortic',
    };
  }

  const description = `Diselenggarakan oleh ${competition.organizer}. ${competition.description.replace(/<[^>]*>?/gm, '').substring(0, 150)}...`;

  return {
    title: `${competition.title} | Infortic`,
    description,
    keywords: [competition.title, competition.organizer, competition.participant, 'lomba IT', 'kompetisi mahasiswa', 'info lomba'],
    openGraph: {
      title: competition.title,
      description,
      url: `/lomba/${competition.slug}`,
      siteName: 'Infortic',
      images: [
        {
          url: competition.poster_url || '/images/og-image-lomba.jpg',
          width: 1200,
          height: 630,
          alt: `Poster Lomba ${competition.title}`,
        },
      ],
      locale: 'id_ID',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: competition.title,
      description,
      images: [competition.poster_url || '/images/og-image-lomba.jpg'],
    },
  };
}

export default async function LombaDetailPage({ params }: Props) {
  const competition = await getCompetitionBySlug(params.slug);

  if (!competition) {
    notFound();
  }

  const isFree = competition.price_text.toLowerCase().includes('gratis') || competition.price_text.includes('Rp 0');
  const registrationEndDate = parseRegistrationEndDate(competition.date_text);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: competition.title,
    startDate: registrationEndDate ? registrationEndDate.toISOString() : undefined,
    endDate: registrationEndDate ? registrationEndDate.toISOString() : undefined, // Assuming same day, adjust if you have end date
    description: competition.description.replace(/<[^>]*>?/gm, ''),
    image: competition.poster_url,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: competition.location || 'Online',
      address: competition.location || 'Online',
    },
    organizer: {
      '@type': 'Organization',
      name: competition.organizer,
      url: competition.source_url,
    },
    offers: {
      '@type': 'Offer',
      price: isFree ? '0' : competition.price_text.replace(/[^0-9]/g, ''),
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      url: competition.registration_url, // Use registration_url for the offer
      validFrom: new Date().toISOString(),
    },
    performer: {
      '@type': 'PerformingGroup',
      name: competition.participant,
    },
  };

  return (
    <>
      <Script
        id="lomba-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg ring-1 ring-white/10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={competition.poster_url || '/placeholder.png'}
              alt={`Poster for ${competition.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {competition.title}
          </h1>
          <div className="mt-4 flex items-center text-lg text-muted-foreground">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{competition.organizer}</span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <Calendar className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Tanggal Penting</h2>
                <p className="text-muted-foreground">{competition.date_text}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Peserta</h2>
                <p className="text-muted-foreground">{competition.participant}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Tag className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Biaya Pendaftaran</h2>
                <Badge variant={isFree ? 'default' : 'secondary'} className={`text-base ${isFree ? 'bg-green-500 text-white' : ''}`}>
                  {isFree ? 'Gratis' : competition.price_text}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" disabled={!competition.registration_url}>
              <a href={competition.registration_url || '#'} target="_blank" rel="noopener noreferrer" className={!competition.registration_url ? 'cursor-not-allowed' : ''}>
                Daftar Sekarang <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={competition.source_url} target="_blank" rel="noopener noreferrer">
                Sumber Informasi
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold">Deskripsi Lomba</h2>
        <div
          className="prose prose-invert mt-4 max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: competition.description }}
        />
      </div>
    </article>
    </div>
    </>
  );
}
