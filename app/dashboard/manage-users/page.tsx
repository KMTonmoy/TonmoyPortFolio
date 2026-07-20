// app/dashboard/manage-users/page.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
 
import { User } from "@/types/manageuser.types";
import { UserTableSkeleton } from "@/components/skeleton/UserTableSkeleton";
import { UserHeader } from "@/components/manage-users/UserHeader";
import { UserSearch } from "@/components/manage-users/UserSearch";
import { UserTable } from "@/components/manage-users/UserTable";
import { UserDialog } from "@/components/manage-users/UserDialog";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://tonmoy-pro-backend.vercel.app/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    const loadingToast = toast.loading("Blocking user...");
    try {
      await axios.patch(`https://tonmoy-pro-backend.vercel.app/users/${userId}/block`);
      toast.success("User blocked successfully", { id: loadingToast });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to block user", { id: loadingToast });
    }
  };

  const handleUnblockUser = async (userId: string) => {
    const loadingToast = toast.loading("Unblocking user...");
    try {
      await axios.patch(`https://tonmoy-pro-backend.vercel.app/users/${userId}/unblock`);
      toast.success("User unblocked successfully", { id: loadingToast });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to unblock user", { id: loadingToast });
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    const loadingToast = toast.loading("Promoting user to admin...");
    try {
      await axios.patch(`https://tonmoy-pro-backend.vercel.app/users/${userId}/make-admin`);
      toast.success("User promoted to admin", { id: loadingToast });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to promote user", { id: loadingToast });
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    const loadingToast = toast.loading("Removing admin role...");
    try {
      await axios.patch(`https://tonmoy-pro-backend.vercel.app/users/${userId}/remove-admin`);
      toast.success("Admin role removed", { id: loadingToast });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to remove admin role", { id: loadingToast });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    const loadingToast = toast.loading("Deleting user...");
    try {
      await axios.delete(`https://tonmoy-pro-backend.vercel.app/users/${userId}`);
      toast.success("User deleted successfully", { id: loadingToast });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user", { id: loadingToast });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <UserTableSkeleton />;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UserHeader onRefresh={fetchUsers} />

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <UserSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalUsers={users.length}
          />

          <UserTable
            users={filteredUsers}
            onViewUser={(user) => {
              setSelectedUser(user);
              setIsDetailsOpen(true);
            }}
            onBlockUser={handleBlockUser}
            onUnblockUser={handleUnblockUser}
            onMakeAdmin={handleMakeAdmin}
            onRemoveAdmin={handleRemoveAdmin}
            onDeleteUser={handleDeleteUser}
          />

          <div className="p-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </motion.div>

      <UserDialog
        user={selectedUser}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        onMakeAdmin={handleMakeAdmin}
        onRemoveAdmin={handleRemoveAdmin}
      />
    </div>
  );
};

export default ManageUsers;