import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TableDataMap } from '@/lib/data'
import { Calendar, MapPin, Tag, Users, ExternalLink, Clock, Trophy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function calculateDaysLeft(endDate: Date | null): number {
  if (!endDate) return 0;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
}

function formatDateString(dateText: string): string {
  // Simple date formatting - you can enhance this based on your date format
  return dateText;
}

export function CompetitionCard({ competition }: { competition: TableDataMap['lomba'] & { registrationEndDate: Date | null } }) {
  const isFree = competition.price_text.toLowerCase().includes('gratis') || competition.price_text.includes('Rp 0');
  const daysLeft = calculateDaysLeft(competition.registrationEndDate);
  const isExpired = daysLeft === 0 && competition.registrationEndDate && competition.registrationEndDate < new Date();

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={competition.poster_url || '/images/placeholder.jpg'}
          alt={`Poster ${competition.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Free badge */}
        {isFree && (
          <span className="absolute top-3 left-3 text-sm font-medium px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
            Gratis
          </span>
        )}
        
        {/* Days left badge */}
        <span className={`absolute top-3 right-3 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${
          isExpired 
            ? 'bg-destructive/10 text-destructive border-destructive/30' 
            : daysLeft <= 7
              ? 'bg-amber-950/50 text-amber-300 border-amber-500/30'
              : 'bg-blue-950/50 text-blue-300 border-blue-500/30'
        }`}>
          {isExpired 
            ? 'Berakhir' 
            : daysLeft === 0 
              ? 'Hari terakhir' 
              : daysLeft === 1 
                ? '1 hari lagi' 
                : `${daysLeft} hari lagi`
          }
        </span>
      </div>

      <CardHeader className="space-y-2 relative">
        <CardTitle className="line-clamp-2 text-xl group-hover:text-[#8B5CF6] transition-colors duration-300">
          {competition.title}
        </CardTitle>
        <p className="text-base text-muted-foreground line-clamp-1">{competition.organizer}</p>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{formatDateString(competition.date_text)}</span>
          </div>
          
          {!isExpired && daysLeft > 0 && (
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-secondary" />
              <span className="text-secondary font-medium">
                {daysLeft === 1 
                  ? 'Tersisa 1 hari lagi!' 
                  : `${daysLeft} hari tersisa`
                }
              </span>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-primary/70" />
            <span>{competition.participant}</span>
          </div>

          {competition.location && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-primary/70" />
              <span className="line-clamp-1">{competition.location}</span>
            </div>
          )}

          {competition.price_text && !isFree && (
            <div className="flex items-center text-sm">
              <Trophy className="mr-2 h-4 w-4 text-accent" />
              <span>Biaya: {competition.price_text}</span>
            </div>
          )}

          {/* Categories or additional info can be added here */}
          <div className="flex flex-wrap gap-2 pt-2">
            {isFree && (
              <Badge className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:text-white hover:bg-emerald-600">
                Gratis
              </Badge>
            )}
            {competition.participant && (
              <Badge className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:text-white">
                {competition.participant}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 mt-auto">
        <Button 
          asChild 
          className={`w-full h-11 text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 ${
            isExpired 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] hover:bg-right text-white hover:text-primary hover:font-bold shadow-[0_4px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)]'
          }`}
          size="lg"
        >
          <Link 
            href={`/lomba/${competition.slug}`}
            className="flex items-center justify-center w-full"
            target="_blank" rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {isExpired ? 'Lomba Berakhir' : 'Lihat Detail'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}