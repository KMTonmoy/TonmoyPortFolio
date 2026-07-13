 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, Shield, Activity, UserX, UserCheck, Ban, ShieldAlert, ShieldCheck } from "lucide-react";
import { UserDialogProps } from "@/types/manageuser.types";

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const UserDialog = ({
  user,
  open,
  onOpenChange,
  onBlockUser,
  onUnblockUser,
  onMakeAdmin,
  onRemoveAdmin,
}: UserDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Detailed information about the user</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>Role: <span className="font-medium">{user.role}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span>Status: <span className="font-medium">{user.status}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Last Login: {formatDate(user.lastLogin)}</span>
            </div>
          </div>

          <DialogFooter className="flex flex-wrap gap-2 sm:justify-start">
            {user.status === "blocked" ? (
              <Button variant="outline" onClick={() => { onUnblockUser(user._id); onOpenChange(false); }}>
                <UserCheck className="h-4 w-4 mr-2" />
                Unblock User
              </Button>
            ) : (
              <Button variant="outline" onClick={() => { onBlockUser(user._id); onOpenChange(false); }}>
                <Ban className="h-4 w-4 mr-2" />
                Block User
              </Button>
            )}
            {user.role === "admin" ? (
              <Button variant="outline" onClick={() => { onRemoveAdmin(user._id); onOpenChange(false); }}>
                <ShieldAlert className="h-4 w-4 mr-2" />
                Remove Admin
              </Button>
            ) : (
              <Button variant="outline" onClick={() => { onMakeAdmin(user._id); onOpenChange(false); }}>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Make Admin
              </Button>
            )}
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};