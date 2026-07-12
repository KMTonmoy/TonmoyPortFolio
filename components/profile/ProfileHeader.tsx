 
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ProfileHeaderProps {
  onLogout: () => void;
}

export const ProfileHeader = ({ onLogout }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>
      <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};