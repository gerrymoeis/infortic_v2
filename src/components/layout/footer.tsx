"use client"

import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaYoutube, FaTiktok, FaGlobe } from 'react-icons/fa'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 bottom-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary opacity-5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1 space-y-4">
             <div className="flex items-center space-x-3">
              <Link href="/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/himafortic-logo.png"
                alt="Himafortic Logo"
                width={40}
                height={40}
                style={{ width: 'auto' }}
                priority={true}
                className="h-12 w-16"
              />
              </Link>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  Infortic
                </span>
                <p className="text-sm text-muted-foreground"><Link href="https://himafortic.mi.unesa.ac.id/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300">Himafortic</Link></p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Pusat informasi terverifikasi untuk kompetisi, magang, beasiswa, dan bootcamp IT di Indonesia.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Peluang</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/lomba" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Lomba</Link></li>
                <li><Link href="/beasiswa" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Beasiswa</Link></li>
                <li><Link href="/magang" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Magang</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Hima</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/tentang-kami" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Tentang Kami</Link></li>
                <li><Link href="/kontak" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Kontak</Link></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/kebijakan-privasi" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/syarat-ketentuan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
              </ul>
            </div> */}
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Sosial</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="https://himafortic.mi.unesa.ac.id/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"><FaGlobe className="h-4 w-4" /> Website</Link></li>
                <li><Link href="https://www.instagram.com/himafortic_unesa/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"><FaInstagram className="h-4 w-4" /> Instagram</Link></li>
                <li><Link href="https://www.youtube.com/@himaforticunesa1170" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"><FaYoutube className="h-4 w-4" /> Youtube</Link></li>
                <li><Link href="https://www.tiktok.com/@himafortic_unesa" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"><FaTiktok className="h-4 w-4" /> Tiktok</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} <span className="text-primary">Infortic.</span></p>
          <p>Dibuat dengan ❤️ untuk <span className="text-secondary">Mahasiswa Indonesia.</span></p>
        </div>
      </div>
    </footer>
  )
}
