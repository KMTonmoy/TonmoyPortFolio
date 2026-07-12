 
import { Card, CardContent } from "@/components/ui/card";

export const ProfileSkeleton = () => {
  return (
    <div className="container py-16 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    </div>
  );
};