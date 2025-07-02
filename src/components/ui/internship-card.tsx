'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ExternalLink, Building, Clock, MapPin, DollarSign } from 'lucide-react'
import { formatDate, getDaysUntilDeadline } from '@/lib/utils'
import { Internship } from '@/types'

interface InternshipCardProps {
  internship: Internship
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const daysUntilDeadline = getDaysUntilDeadline(internship.deadline)

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 relative mr-4 flex-shrink-0">
             <Image
                src={internship.image_url || '/images/placeholder-internship.jpg'}
                alt={`${internship.company_name} logo`}
                fill
                className="object-contain rounded-lg bg-white p-1 shadow-md"
                sizes="64px"
              />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {internship.title}
            </h3>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Building className="h-4 w-4 mr-2" />
              <span>{internship.company_name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{internship.is_paid ? 'Dibayar' : 'Tidak Dibayar'}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Batas Pendaftaran: {formatDate(internship.deadline)}</span>
          </div>
           {daysUntilDeadline !== null && daysUntilDeadline >= 0 && (
             <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${daysUntilDeadline <= 7 ? 'bg-destructive/80 text-destructive-foreground' : 'bg-primary/80 text-primary-foreground'} backdrop-blur-sm`}>
               <Clock className="h-3 w-3" />
               {daysUntilDeadline === 0 ? 'Hari ini!' : `${daysUntilDeadline} hari lagi`}
             </div>
           )}
        </div>
      </CardContent>

      <CardFooter className="p-6 bg-transparent transition-colors duration-300">
        <Button asChild className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30">
          <Link href={internship.source_url || '#'} target="_blank" rel="noopener noreferrer">
            Lihat Detail
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
