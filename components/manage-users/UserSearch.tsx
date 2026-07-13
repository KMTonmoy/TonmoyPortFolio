 
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserSearchProps } from "@/types/manageuser.types";

export const UserSearch = ({ searchTerm, onSearchChange, totalUsers }: UserSearchProps) => {
  return (
    <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">All Users</h2>
        <p className="text-sm text-muted-foreground">Total {totalUsers} users registered</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full md:w-64"
        />
      </div>
    </div>
  );
};