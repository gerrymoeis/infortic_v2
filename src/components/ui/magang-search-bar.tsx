'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { magangFields, magangLocations } from '@/lib/utils';
import { Button } from './button';

export function MagangSearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilterChange = (filterType: 'field' | 'location') => (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value && value !== 'all') {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    replace(pathname);
  };

  return (
    <div className="p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 lg:col-span-2">
          <Input
            placeholder="Cari posisi atau perusahaan..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            className="w-full bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Select onValueChange={handleFilterChange('field')} defaultValue={searchParams.get('field') || 'all'}>
          <SelectTrigger className="w-full bg-gray-900/50 border-gray-600 text-white">
            <SelectValue placeholder="Bidang" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-600">
            <SelectItem value="all">Semua Bidang</SelectItem>
            {magangFields.map((field) => (
              <SelectItem key={field} value={field}>{field}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleFilterChange('location')} defaultValue={searchParams.get('location') || 'all'}>
          <SelectTrigger className="w-full bg-gray-900/50 border-gray-600 text-white">
            <SelectValue placeholder="Lokasi" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-600">
            <SelectItem value="all">Semua Lokasi</SelectItem>
            {magangLocations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleReset} variant="outline" className="w-full lg:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
          Reset
        </Button>
      </div>
    </div>
  );
}
