// Beasiswa Skeleton Component
export function BeasiswaSkeleton() {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
        {/* Image Placeholder with overlay area */}
        <div className="relative h-48 w-full animate-pulse bg-muted">
          {/* Days left badge placeholder */}
          <div className="absolute top-3 right-3 h-6 w-20 animate-pulse rounded-full bg-muted-foreground/20" />
          
          {/* Title and organizer overlay at bottom */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted-foreground/30 mb-2" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted-foreground/20" />
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-4">
          {/* Content area with details */}
          <div className="space-y-3 mb-4">
            {/* Education level */}
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
            </div>
            
            {/* Location */}
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            </div>
            
            {/* Deadline */}
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
          
          {/* Spacer to push button to the bottom */}
          <div className="flex-grow" />
          
          {/* Button Placeholder */}
          <div className="h-11 w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    )
  }