export function MagangSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      <div className="flex flex-1 flex-col p-4">
        {/* Header with logo and title */}
        <div className="flex items-start space-x-4 mb-4">
          {/* Logo placeholder */}
          <div className="w-16 h-16 animate-pulse rounded-md bg-muted flex-shrink-0" />
          
          {/* Title and company */}
          <div className="flex-grow">
            <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted mb-2" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
        </div>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          {/* Field */}
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
          </div>
          
          {/* Location */}
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
          </div>
          
          {/* Date */}
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        
        {/* Spacer to push button to the bottom */}
        <div className="flex-grow" />
        
        {/* Button Placeholder */}
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  )
}