"use client"

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Building, ExternalLink, Tag, Clock, CircleDollarSign } from 'lucide-react'
import { formatDate, getDaysUntilDeadline } from '@/lib/utils'
import { Bootcamp } from '@/types/database'

interface BootcampCardProps {
  bootcamp: Bootcamp
}

export function BootcampCard({ bootcamp }: BootcampCardProps) {
  const daysUntilDeadline = getDaysUntilDeadline(bootcamp.deadline)
  const isExpired = bootcamp.deadline ? daysUntilDeadline < 0 : false

  const formatPrice = (price: number | null) => {
    if (price === null) return 'N/A'
    if (price === 0) return 'Gratis'
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
  }

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={bootcamp.image_url || '/images/placeholder-bootcamp.jpg'}
          alt={bootcamp.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {bootcamp.deadline && (
          <span className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${
            isExpired 
              ? 'bg-destructive/10 text-destructive border-destructive/30' 
              : daysUntilDeadline <= 7
                ? 'bg-amber-950/50 text-amber-300 border-amber-500/30'
                : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
          }`}>
            {isExpired 
              ? 'Pendaftaran ditutup' 
              : daysUntilDeadline === 0 
                ? 'Hari terakhir' 
                : `${daysUntilDeadline} hari lagi`
            }
          </span>
        )}
      </div>
      <CardHeader className="space-y-2 relative">
        <CardTitle className="line-clamp-2 text-xl group-hover:text-[#8B5CF6] transition-colors duration-300">
          {bootcamp.title}
        </CardTitle>
        {bootcamp.provider && (
            <div className="flex items-center text-base text-muted-foreground">
                <Building className="mr-2 h-4 w-4 text-primary/70" />
                <p className="line-clamp-1">{bootcamp.provider}</p>
            </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
            {bootcamp.cost_in_idr !== null && (
                <div className="flex items-center text-sm">
                    <CircleDollarSign className="mr-2 h-4 w-4 text-primary" />
                    <span>Biaya: {formatPrice(bootcamp.cost_in_idr)}</span>
                </div>
            )}
            {bootcamp.duration_in_weeks && (
                <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>Durasi: {bootcamp.duration_in_weeks} minggu</span>
                </div>
            )}
            {bootcamp.deadline && (
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>Batas Pendaftaran: {formatDate(bootcamp.deadline)}</span>
                </div>
            )}
            {bootcamp.skills_covered && bootcamp.skills_covered.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                    {bootcamp.skills_covered.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">{skill}</span>
                    ))}
                </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          asChild 
          className={`w-full h-11 text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 ${
            isExpired 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] hover:bg-right text-white shadow-[0_4px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)]'
          }`}
          size="lg"
          disabled={isExpired || !bootcamp.source_url}
        >
          <a 
            href={bootcamp.source_url || '#'}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {isExpired ? 'Pendaftaran Ditutup' : 'Lihat Detail'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
