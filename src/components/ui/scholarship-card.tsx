"use client"

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Building, ExternalLink } from 'lucide-react'
import { formatDate, getDaysUntilDeadline } from '@/lib/utils'
import { Scholarship } from '@/types/database'

interface ScholarshipCardProps {
  scholarship: Scholarship
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const daysUntilDeadline = getDaysUntilDeadline(scholarship.deadline)
  const isExpired = scholarship.deadline ? daysUntilDeadline < 0 : false

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={scholarship.image_url || '/images/placeholder-scholarship.jpg'}
          alt={scholarship.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {scholarship.deadline && (
          <span className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${
            isExpired 
              ? 'bg-destructive/10 text-destructive border-destructive/30' 
              : daysUntilDeadline <= 7
                ? 'bg-amber-950/50 text-amber-300 border-amber-500/30'
                : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
          }`}>
            {isExpired 
              ? 'Berakhir' 
              : daysUntilDeadline === 0 
                ? 'Hari terakhir' 
                : `${daysUntilDeadline} hari lagi`
            }
          </span>
        )}
      </div>
      <CardHeader className="space-y-2 relative">
        <CardTitle className="line-clamp-2 text-xl group-hover:text-[#8B5CF6] transition-colors duration-300">
          {scholarship.title}
        </CardTitle>
        {scholarship.provider && (
            <div className="flex items-center text-base text-muted-foreground">
                <Building className="mr-2 h-4 w-4 text-primary/70" />
                <p className="line-clamp-1">{scholarship.provider}</p>
            </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {scholarship.deadline && (
                <div className="flex items-center text-base">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    <span>Batas Waktu: {formatDate(scholarship.deadline)}</span>
                </div>
            )}
            {scholarship.description && (
                <p className="text-base text-muted-foreground line-clamp-3">
                {scholarship.description}
                </p>
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
          disabled={isExpired || !scholarship.website_url}
        >
          <a 
            href={scholarship.website_url || '#'}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {isExpired ? 'Beasiswa Ditutup' : 'Lihat Detail'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
