 
import { Card, CardContent } from "@/components/ui/card";
import { SkillSkeletonProps } from "@/types/skill.types";

export const SkillSkeleton = ({ count = 8 }: SkillSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-28 w-28 rounded-full bg-muted"></div>
            <div className="h-6 w-24 bg-muted rounded mt-4"></div>
            <div className="flex gap-4 mt-3">
              <div className="h-8 w-8 bg-muted rounded"></div>
              <div className="h-8 w-8 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};