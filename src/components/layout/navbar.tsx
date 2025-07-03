"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ThemeToggleSkeleton = () => {
  return <div className="h-10 w-10 rounded-full bg-muted" />
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Lomba',
      href: '/lomba',
      description: 'Temukan berbagai Lomba dan Kompetisi IT di Indonesia.',
     },
    {
      name: 'Beasiswa',
      href: '/beasiswa',
      description: 'Cari informasi beasiswa untuk mendukung pendidkanmu.',
    },
    {
      name: 'Magang',
      href: '/magang',
      description: 'Magang di perusahaan teknologi terkemuka.',
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between relative">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-3">
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
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  (item.href === '/' ? pathname === item.href : pathname.startsWith(item.href))
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Fixed: Single conditional render with consistent structure */}
        <div className="flex items-center gap-2">
          {!mounted ? (
            <ThemeToggleSkeleton />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b pb-4">
          <nav className="container flex flex-col gap-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  (item.href === '/' ? pathname === item.href : pathname.startsWith(item.href)) 
                    ? 'text-primary font-semibold' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}