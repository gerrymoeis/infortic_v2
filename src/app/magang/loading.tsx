import { MagangSkeleton } from '@/components/ui/magang-skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <div className="h-10 w-1/2 mx-auto bg-muted rounded-md animate-pulse" />
        <div className="h-6 w-3/4 mx-auto mt-3 bg-muted rounded-md animate-pulse" />
      </header>

      <div className="mb-8">
        <div className="h-12 w-full bg-muted rounded-md animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <MagangSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
