import { Magang } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function MagangCard({ magang }: { magang: Magang }) {
  const formattedDate = magang.created_at
    ? format(parseISO(magang.created_at), 'd MMMM yyyy', { locale: id })
    : 'Tanggal tidak tersedia';

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:border-[#4F46E5]/30 bg-background/80 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={magang.logo_image_url || '/images/placeholder-logo.png'}
              alt={`${magang.company} logo`}
              fill
              className="object-contain rounded-md"
              placeholder="blur"
              blurDataURL={magang.logo_image_url || '/images/placeholder-logo.png'}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-lg leading-tight group-hover:text-[#8B5CF6] transition-colors duration-300">
              {magang.intern_position}
            </h3>
            <p className="text-muted-foreground text-sm">{magang.company}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{magang.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Briefcase className="mr-2 h-4 w-4 text-primary" />
            <span>{magang.field}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-primary/70" />
            <span>{magang.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-primary/70" />
            <span>Diposting: {formattedDate}</span>
          </div>
          
          {/* Additional badges section */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:text-white hover:bg-blue-600">
              {magang.field}
            </Badge>
            <Badge className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-600 border border-green-500/20 hover:text-white hover:bg-green-600">
              {magang.location}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 mt-auto">
        <Link href={`/magang/${magang.slug}`} target="_blank" rel="noopener noreferrer" className="w-full">
          <Badge className="w-full text-center justify-center py-3 h-11 text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] hover:bg-right text-white hover:text-primary hover:font-bold shadow-[0_4px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)] cursor-pointer">
            <ExternalLink className="mr-2 h-5 w-5" />
            Lihat Detail
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
}