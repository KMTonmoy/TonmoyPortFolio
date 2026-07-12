 
import { Mail, User as UserIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { User } from "firebase/auth";
import { UserData } from "@/hooks/useUser";

interface ProfileInfoProps {
  user: User | null;
  userData: UserData | null;
  role: string;
  isAdmin: boolean;
  formatDate: (timestamp?: number) => string;
}

export const ProfileInfo = ({ user, userData, role, isAdmin, formatDate }: ProfileInfoProps) => {
  return (
    <div className="mt-6 space-y-3 border-t pt-4">
      <div className="flex items-center gap-2 text-sm">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Email:</span>
        <span className="font-medium truncate">{user?.email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Role:</span>
        <span className="font-medium capitalize">{role}</span>
      </div>
      {userData?.createdAt && (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Joined:</span>
          <span className="font-medium">{formatDate(userData.createdAt)}</span>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Status:</span>
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Active
        </Badge>
      </div>
    </div>
  );
};