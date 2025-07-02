'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Users, CircleDollarSign, X } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { participantCategories, priceRanges } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CompetitionSearchBar() {
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
    params.delete('participant')
    params.delete('price')
    params.delete('query')
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  const hasActiveFilters = searchParams.has('participant') || searchParams.has('price') || searchParams.has('query')

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
        placeholder="Cari nama lomba atau penyelenggara..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      
      <div className="h-6 border-l border-input"></div>

      <Select
        onValueChange={(value) => handleFilterChange('participant', value)}
        value={searchParams.get('participant') || 'all'}
      >
        <SelectTrigger className="w-auto border-0 bg-transparent p-0 pr-2 text-sm focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none">
          <Users className="mr-2 h-5 w-5 text-muted-foreground" />
          <SelectValue placeholder="Peserta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Peserta</SelectItem>
          {participantCategories.map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="h-6 border-l border-input"></div>

      <Select
        onValueChange={(value) => handleFilterChange('price', value)}
        value={searchParams.get('price') || 'all'}
      >
        <SelectTrigger className="w-auto border-0 bg-transparent p-0 pr-2 text-sm focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none">
          <CircleDollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
          <SelectValue placeholder="Harga" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Harga</SelectItem>
          {Object.entries(priceRanges).map(([key, value]) => (
            <SelectItem key={key} value={key}>{value}</SelectItem>
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
