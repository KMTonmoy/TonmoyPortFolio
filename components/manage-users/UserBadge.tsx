 
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { UserBadgeProps } from "@/types/manageuser.types";

export const UserBadge = ({ status, role }: UserBadgeProps) => {
 
  if (role === "admin") {
    return <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">Admin</Badge>;
  }
  if (role === "user") {
    return <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">User</Badge>;
  }

  
};