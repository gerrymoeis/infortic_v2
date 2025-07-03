import { Metadata } from 'next';
import Image from 'next/image';
import { Globe, Users, Target, Lightbulb, Palette, PenTool, Briefcase, Handshake, Church, Home, Star, Coins } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami | Infortic',
  description: 'Mengenal lebih dekat dengan Himpunan Mahasiswa D4 Manajemen Informatika (HIMAFORTIC) Universitas Negeri Surabaya, visi, misi, dan struktur organisasi kami.',
  keywords: ['Himafortic', 'Manajemen Informatika', 'Unesa', 'Tentang Kami', 'Himpunan Mahasiswa'],
  openGraph: {
    title: 'Tentang Kami | Infortic',
    description: 'Mengenal lebih dekat dengan HIMAFORTIC Unesa.',
    url: '/tentang-kami',
    siteName: 'Infortic',
    images: [
      {
        url: '/images/og-image-tentang.jpg', 
        width: 1200,
        height: 630,
        alt: 'Tentang Himafortic Unesa',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

const departments = [
  { name: 'BPH', description: 'Badan Pengurus Harian', icon: <Briefcase className="h-8 w-8 text-primary" /> },
  { name: 'PSDM', description: 'Pengembangan Sumber Daya Mahasiswa', icon: <Users className="h-8 w-8 text-primary" /> },
  { name: 'KOMINFO', description: 'Komunikasi dan Informasi', icon: <Globe className="h-8 w-8 text-primary" /> },
  { name: 'PENRISTEK', description: 'Penelitian dan Riset Teknologi', icon: <Lightbulb className="h-8 w-8 text-primary" /> },
  { name: 'DEPLU', description: 'Departemen Luar Negeri', icon: <Handshake className="h-8 w-8 text-primary" /> },
  { name: 'AGSOS', description: 'Departemen Agama', icon: <Church className="h-8 w-8 text-primary" /> },
  { name: 'DAGRI', description: 'Departemen Dalam Negeri', icon: <Home className="h-8 w-8 text-primary" /> },
  { name: 'MNB', description: 'Minat dan Bakat', icon: <Star className="h-8 w-8 text-primary" /> },
  {name: 'EKRAF', description: 'Departemen Ekonomi Kreatif', icon: <Coins className="h-8 w-8 text-primary" /> },
];

const missions = [
  'Mewujudkan HMP yang berisi pribadi mahasiswa yang berkualitas dan bertanggung jawab.',
  'Mewadahi aspirasi mahasiswa prodi manajemen informatika.',
  'Mengoptimalkan perencanaan dan pelaksanaan di setiap kegiatan.',
];

export default function TentangKamiPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-card p-6 sm:p-8 rounded-2xl shadow-lg ring-1 ring-white/10">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Tentang Himafortic Unesa
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Himpunan Mahasiswa D4 Manajemen Informatika (HIMAFORTIC) Universitas Negeri Surabaya, berdiri sejak 1 Agustus 2021.
          </p>
        </header>

        <section id="visi-misi" className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-foreground mb-4">Visi Kami</h2>
              <p className="text-xl text-muted-foreground italic">
                “Mewujudkan HMP Manajemen Informatika sebagai organisasi yang memiliki keunggulan dan kekeluargaan tinggi dalam membangun kemajuan Prodi.”
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
                <Target className="h-32 w-32 text-secondary animate-pulse" />
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Misi Kami</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {missions.map((mission, index) => (
                <div key={index} className="bg-background/50 p-6 rounded-lg ring-1 ring-white/10 text-center">
                  <h3 className="font-bold text-primary text-5xl mb-3">{index + 1}</h3>
                  <p className="text-muted-foreground">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="departemen" className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Struktur Departemen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-background/50 p-4 rounded-lg ring-1 ring-white/10 flex flex-col items-center text-center transform transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30">
                {dept.icon}
                <h3 className="mt-4 font-bold text-lg text-foreground">{dept.name}</h3>
                <p className="text-sm text-muted-foreground">{dept.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="logo">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Filosofi Logo</h2>
          <div className="bg-background/50 p-8 rounded-lg ring-1 ring-white/10 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <Image src="/images/himafortic-logo.png" alt="Logo Himafortic" width={200} height={200} className="object-contain" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-xl text-foreground flex items-center mb-2"><PenTool className="mr-2 h-6 w-6 text-primary"/>Bentuk</h3>
                <p className="text-muted-foreground">Bentuk logo diambil dari ciri khas tag HTML (`{'<>'}`) dan dimodifikasi dengan huruf M dan I, melambangkan Manajemen Informatika. Logo ini menggambarkan bahwa HIMAFORTIC mewadahi ide kreatif dan inovatif seluruh mahasiswa.</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-foreground flex items-center mb-2"><Palette className="mr-2 h-6 w-6 text-primary"/>Warna</h3>
                <p className="text-muted-foreground">Warna biru dan oranye melambangkan tujuan yang akan dicapai oleh himpunan, yaitu membangun keluarga besar Manajemen Informatika yang memiliki semangat kekeluargaan yang kuat.</p>
              </div>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
