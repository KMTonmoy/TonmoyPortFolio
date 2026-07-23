 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, UserX, UserCheck, Ban, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserTableProps } from "@/types/manageuser.types";
import { UserAvatar } from "./UserAvatar";
import { UserBadge } from "./UserBadge";

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const UserTable = ({
  users,
  onViewUser,
  onBlockUser,
  onUnblockUser,
  onMakeAdmin,
  onRemoveAdmin,
  onDeleteUser,
}: UserTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No users found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
             <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserAvatar name={user.name} photo={user.photo} />
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell><UserBadge status={user.role} role={user.role} /></TableCell>
               <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewUser(user)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                   
                      <DropdownMenuSeparator />
                      {user.role === "admin" ? (
                        <DropdownMenuItem onClick={() => onRemoveAdmin(user._id)}>
                          <ShieldAlert className="h-4 w-4 mr-2 text-yellow-500" />
                          Remove Admin
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onMakeAdmin(user._id)}>
                          <ShieldCheck className="h-4 w-4 mr-2 text-blue-500" />
                          Make Admin
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDeleteUser(user._id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};