 
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { UserBadgeProps } from "@/types/manageuser.types";

export const UserBadge = ({ status, role }: UserBadgeProps) => {
  const statusMap: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
    active: { label: "Active", variant: "default" },
    blocked: { label: "Blocked", variant: "destructive" },
    pending: { label: "Pending", variant: "secondary" },
  };
  const statusConfig = statusMap[status] || statusMap.pending;

  if (role === "admin") {
    return <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">Admin</Badge>;
  }

  // For active status, use default variant with custom green styling
  if (status === "active") {
    return <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">Active</Badge>;
  }

  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};