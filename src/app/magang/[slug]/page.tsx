import { getMagangBySlug, getAllMagangSlugs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Users, Tag, ArrowUpRight, Building, Briefcase, Target, BookOpen, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Script from 'next/script';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllMagangSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const magang = await getMagangBySlug(params.slug);

  if (!magang) {
    return {
      title: 'Magang Tidak Ditemukan | Infortic',
    };
  }

  const description = `Peluang magang di ${magang.company} sebagai ${magang.intern_position}. ${magang.description.replace(/<[^>]*>?/gm, '').substring(0, 150)}...`;

  return {
    title: `${magang.intern_position} di ${magang.company} | Infortic`,
    description,
    keywords: [magang.intern_position, magang.company, magang.field || 'General', 'magang IT', 'internship', 'info magang'],
    openGraph: {
      title: `${magang.intern_position} di ${magang.company}`,
      description,
      url: `/magang/${magang.slug}`,
      siteName: 'Infortic',
      images: [
        {
          url: magang.logo_image_url || '/images/og-image-magang.jpg',
          width: 1200,
          height: 630,
          alt: `Logo ${magang.company}`,
        },
      ],
      locale: 'id_ID',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${magang.intern_position} di ${magang.company}`,
      description,
      images: [magang.logo_image_url || '/images/og-image-magang.jpg'],
    },
  };
}

export default async function MagangDetailPage({ params }: Props) {
  const magang = await getMagangBySlug(params.slug);

  if (!magang) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: magang.intern_position,
    description: magang.description.replace(/<[^>]*>?/gm, ''),
    identifier: {
      '@type': 'PropertyValue',
      name: magang.company,
      value: magang.id.toString(),
    },
    datePosted: magang.created_at,
    hiringOrganization: {
      '@type': 'Organization',
      name: magang.company,
      sameAs: magang.company_page_url,
      logo: magang.logo_image_url,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: magang.location,
        addressCountry: 'ID',
      },
    },
    employmentType: 'INTERN',
    responsibilities: magang.responsibilities,
    skills: magang.criteria,
    educationRequirements: magang.criteria,
    experienceRequirements: 'No experience required',
  };

  return (
    <>
      <Script
        id="magang-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg ring-1 ring-white/10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg bg-white p-4">
              <Image
                src={magang.logo_image_url || '/placeholder.png'}
                alt={`Logo for ${magang.company}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <Badge variant="secondary" className="mb-2">{magang.field || 'General'}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {magang.intern_position}
            </h1>
            <div className="mt-4 flex items-center text-lg text-muted-foreground">
              <Building className="mr-2 h-5 w-5" />
              <span>{magang.company}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{magang.location}</span>
            </div>

            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <a href={magang.detail_page_url} target="_blank" rel="noopener noreferrer">
                  Lamar Sekarang <ArrowUpRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              {magang.contact_email && (
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${magang.contact_email}`}>
                    Hubungi HR <Mail className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 grid md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Briefcase className="mr-2 h-6 w-6 text-primary"/>Deskripsi Pekerjaan</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: magang.description }}
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Users className="mr-2 h-6 w-6 text-primary"/>Tanggung Jawab</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: magang.responsibilities }}
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Target className="mr-2 h-6 w-6 text-primary"/>Kriteria</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: magang.criteria }}
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center"><BookOpen className="mr-2 h-6 w-6 text-primary"/>Hasil Pembelajaran</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: magang.learning_outcome }}
                />
            </div>
        </div>
      </article>
    </div>
    </>
  );
}
