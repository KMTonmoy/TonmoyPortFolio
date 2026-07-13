 
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { UserBadgeProps } from "@/types/manageuser.types";

export const UserBadge = ({ status, role }: UserBadgeProps) => {
  const statusMap: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" | "success" }> = {
    active: { label: "Active", variant: "success" },
    blocked: { label: "Blocked", variant: "destructive" },
    pending: { label: "Pending", variant: "secondary" },
  };
  const statusConfig = statusMap[status] || statusMap.pending;

  if (role === "admin") {
    return <Badge variant="default" className="bg-primary/20 text-primary">Admin</Badge>;
  }

  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
};