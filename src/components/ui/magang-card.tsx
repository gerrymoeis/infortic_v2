import { Magang } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function MagangCard({ magang }: { magang: Magang }) {
  const formattedDate = magang.created_at
    ? format(parseISO(magang.created_at), 'd MMMM yyyy', { locale: id })
    : 'Tanggal tidak tersedia';

  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white h-full flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-indigo-500/30">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={magang.logo_image_url || '/images/placeholder-logo.png'}
              alt={`${magang.company} logo`}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-lg leading-tight">{magang.intern_position}</h3>
            <p className="text-gray-400 text-sm">{magang.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">{magang.description}</p>
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{magang.field}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{magang.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Diposting: {formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Link href={`/magang/${magang.slug}`} className="w-full">
          <Badge className="w-full text-center justify-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-300">
            Lihat Detail
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
}
