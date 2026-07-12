 
import { Badge } from "@/components/ui/badge";
import { User } from "firebase/auth";

interface ProfileDisplayProps {
  user: User | null;
  isAdmin: boolean;
}

export const ProfileDisplay = ({ user, isAdmin }: ProfileDisplayProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24">Name:</span>
        <span className="font-medium">{user?.displayName || "Not set"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24">Email:</span>
        <span className="font-medium">{user?.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-24">Role:</span>
        <Badge variant={isAdmin ? "default" : "secondary"}>
          {isAdmin ? "Administrator" : "Regular User"}
        </Badge>
      </div>
    </div>
  );
};