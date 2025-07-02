export function CompetitionSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      {/* Image Placeholder */}
      <div className="h-48 w-full animate-pulse bg-muted" />
      
      <div className="flex flex-1 flex-col p-4">
        {/* Title Placeholder */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-muted" />
        
        {/* Organizer Placeholder */}
        <div className="mb-4 h-5 w-1/2 animate-pulse rounded-md bg-muted" />
        
        {/* Spacer to push details to the bottom */}
        <div className="flex-grow" />
        
        {/* Details Placeholders */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center">
            <div className="mr-2 h-5 w-5 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-5 w-5 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-2/3 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
