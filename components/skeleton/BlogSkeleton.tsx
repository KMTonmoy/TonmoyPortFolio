 
import { Card, CardContent } from "@/components/ui/card";
import { BlogSkeletonProps } from "@/types/blog.types";

export const BlogSkeleton = ({ count = 6 }: BlogSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse overflow-hidden">
          <div className="h-52 bg-muted"></div>
          <CardContent className="p-5 space-y-3">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
            <div className="h-10 bg-muted rounded w-full mt-4"></div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};