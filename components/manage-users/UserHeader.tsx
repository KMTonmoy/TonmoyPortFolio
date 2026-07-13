 
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { UserHeaderProps } from "@/types/manageuser.types";

export const UserHeader = ({ onRefresh }: UserHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all registered users</p>
      </div>
      <Button onClick={onRefresh} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
};