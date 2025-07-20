import { Metadata } from 'next';
import Link from 'next/link';
import { Instagram, Youtube, Globe, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak Kami | Infortic',
  description: 'Hubungi Himpunan Mahasiswa D4 Manajemen Informatika (HIMAFORTIC) Universitas Negeri Surabaya melalui media sosial kami.',
  keywords: ['Kontak Himafortic', 'Instagram Himafortic', 'TikTok Himafortic', 'YouTube Himafortic', 'Unesa'],
  openGraph: {
    title: 'Kontak Kami | Infortic',
    description: 'Hubungi HIMAFORTIC Unesa melalui media sosial kami.',
    url: '/kontak',
    siteName: 'Infortic',
    images: [
      {
        url: '/images/og-image-kontak.jpg',
        width: 1200,
        height: 630,
        alt: 'Kontak Himafortic Unesa',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

const socialLinks = [
  {
    name: 'Website Resmi',
    href: 'https://himafortic.mi.unesa.ac.id/',
    icon: <Globe className="h-8 w-8" />,
    handle: 'himafortic.mi.unesa.ac.id',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/himafortic_unesa/',
    icon: <Instagram className="h-8 w-8" />,
    handle: '@himafortic_unesa',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@himafortic_unesa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 6.5a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z"/>
        <path d="M16.5 6.5v9a3 3 0 0 1-3-3"/>
        <path d="M16.5 15.5a3 3 0 0 1-3-3"/>
      </svg>
    ),
    handle: '@himafortic_unesa',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@himaforticunesa1170',
    icon: <Youtube className="h-8 w-8" />,
    handle: 'Himafortic Unesa',
  },
];

export default function KontakPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Hubungi Kami
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Terhubung dengan kami melalui kanal resmi Himafortic Unesa. Kami siap menerima aspirasi, pertanyaan, dan kolaborasi.
          </p>
        </header>

        <section id="social-media">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((social) => (
              <Link href={social.href} key={social.name} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-background/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center space-x-4 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transform hover:-translate-y-1">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{social.name}</h3>
                    <p className="text-sm text-muted-foreground">{social.handle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact-info" className="mt-16 text-center">
           <div className="bg-background/50 p-8 rounded-lg border border-slate-200 dark:border-slate-800">
             <MessageSquare className="h-12 w-12 text-secondary mx-auto mb-4"/>
             <h2 className="text-2xl font-bold text-foreground mb-2">Punya Pertanyaan atau Aspirasi?</h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
                Jangan ragu untuk menghubungi kami melalui media sosial di atas. Tim kami akan dengan senang hati membantu Anda.
             </p>
           </div>
        </section>

      </article>
    </div>
  );
}
