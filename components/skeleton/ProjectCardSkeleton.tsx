 
export const ProjectCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg border flex flex-col animate-pulse">
      <div className="aspect-video bg-muted"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-7 bg-muted rounded mb-2 w-3/4"></div>
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-muted rounded-full w-16"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
          <div className="h-6 bg-muted rounded-full w-14"></div>
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="h-9 bg-muted rounded w-20"></div>
          <div className="h-9 bg-muted rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}