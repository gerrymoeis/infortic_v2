import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Tables } from '@/lib/types'
import { cn, getDaysLeft, formatDate } from '@/lib/utils'
import { Briefcase, MapPin, CalendarDays, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type BeasiswaCardProps = {
  beasiswa: Tables<'beasiswa'>
}

export function BeasiswaCard({ beasiswa }: BeasiswaCardProps) {
  const daysLeft = getDaysLeft(beasiswa.deadline_date)
  const formattedDeadline = formatDate(beasiswa.deadline_date)

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full">
          <Image
            src={beasiswa.image_url || '/images/placeholder.webp'}
            alt={`Logo ${beasiswa.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={beasiswa.image_url || '/images/placeholder.webp'}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${
          daysLeft !== null && daysLeft < 0 
            ? 'bg-destructive/10 text-destructive border-destructive/30' 
            : daysLeft !== null && daysLeft <= 14
              ? 'bg-amber-950/50 text-amber-300 border-amber-500/30'
              : 'bg-blue-950/50 text-blue-300 border-blue-500/30'
        }`}>
          {daysLeft !== null && daysLeft < 0 
            ? 'Ditutup' 
            : daysLeft === 0 
              ? 'Hari terakhir' 
              : daysLeft === 1 
                ? '1 hari lagi' 
                : `${daysLeft} hari lagi`
          }
        </span>
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <CardTitle className="text-lg font-bold text-white leading-tight line-clamp-2">
            <Link href={`/beasiswa/${beasiswa.slug}`} className="hover:underline">
              {beasiswa.title}
            </Link>
          </CardTitle>
          {beasiswa.organizer && (
            <p className="text-sm text-white/80 mt-1">{beasiswa.organizer}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Briefcase className="mr-2 h-4 w-4 text-primary/70" />
            <span>{beasiswa.education_level}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-primary/70" />
            <span className="line-clamp-1">{beasiswa.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="mr-2 h-4 w-4 text-primary/70" />
            <span className="line-clamp-1">{formattedDeadline}</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500 hover:text-white">
              {beasiswa.education_level}
            </Badge>
            <Badge className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 hover:bg-purple-500 hover:text-white">
              {beasiswa.location}
            </Badge>
            {/* {daysLeft !== null && (
              <Badge
                className={cn(
                  'px-2 py-1 text-xs rounded-full border',
                  daysLeft < 0
                    ? 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                    : daysLeft <= 7
                    ? 'bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500 hover:text-white'
                    : daysLeft <= 30
                    ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500 hover:text-white'
                    : 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500 hover:text-white'
                )}
              >
                {daysLeft < 0
                  ? 'Ditutup'
                  : daysLeft === 0
                  ? 'Hari Ini'
                  : `${daysLeft} hari lagi`}
              </Badge>
            )} */}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 mt-auto">
        <Button 
          asChild 
          className={`w-full h-11 text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 ${
            daysLeft !== null && daysLeft < 0 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] hover:bg-right text-white hover:text-primary hover:font-bold shadow-[0_4px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)]'
          }`}
          size="lg"
        >
          <Link 
            href={`/beasiswa/${beasiswa.slug}`}
            className="flex items-center justify-center w-full"
            target="_blank" rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {daysLeft !== null && daysLeft < 0 ? 'Pendaftaran Ditutup' : 'Lihat Detail'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
