'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Briefcase, MapPin, X } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type MagangSearchBarProps = {
  magangFields: string[];
  magangLocations: string[];
};

export function MagangSearchBar({ magangFields, magangLocations }: MagangSearchBarProps) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('field')
    params.delete('location')
    params.delete('query')
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  const hasActiveFilters = searchParams.has('field') || searchParams.has('location') || searchParams.has('query')

  return (
    <motion.div 
      className="relative flex w-full items-center gap-2 rounded-full border border-input bg-background/50 p-2 pl-8 pr-8 shadow-sm backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-md hover:shadow-md"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <SearchIcon className="h-7 w-7 text-muted-foreground" />
      <Input
        id="search"
        className="peer flex-grow border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Cari posisi atau perusahaan..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      
      <div className="h-6 border-l border-input"></div>

      <Select
        onValueChange={(value) => handleFilterChange('field', value)}
        value={searchParams.get('field') || 'all'}
      >
        <SelectTrigger className="w-auto border-0 bg-transparent p-0 pr-2 text-sm focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none">
          <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
          <SelectValue placeholder="Bidang" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Bidang</SelectItem>
          {magangFields.map((field) => (
            <SelectItem key={field} value={field}>{field}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="h-6 border-l border-input"></div>

      <Select
        onValueChange={(value) => handleFilterChange('location', value)}
        value={searchParams.get('location') || 'all'}
      >
        <SelectTrigger className="w-auto border-0 bg-transparent p-0 pr-2 text-sm focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none">
          <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
          <SelectValue placeholder="Lokasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Lokasi</SelectItem>
          {magangLocations.map((location) => (
            <SelectItem key={location} value={location}>{location}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button onClick={handleReset} variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <X className="h-6 w-6 rounded-full transition-colors duration-300 hover:bg-blue-500/50 hover:text-white" />
          <span className="sr-only">Atur Ulang Filter</span>
        </Button>
      )}
    </motion.div>
  )
}