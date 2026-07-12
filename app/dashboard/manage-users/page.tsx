// app/dashboard/manage-users/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { 
  Search, 
  UserX, 
  UserCheck, 
  Eye, 
  MoreVertical,
  Shield,
  Mail,
  Calendar,
  Activity,
  Ban,
  CheckCircle,
  AlertCircle,
  UserCog,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface User {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked' | 'pending';
  createdAt: number;
  lastLogin: number;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
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
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/block`);
      toast.success("User blocked successfully", { id: loadingToast });
      fetchUsers();
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Failed to block user", { id: loadingToast });
    }
  };

  const handleUnblockUser = async (userId: string) => {
    const loadingToast = toast.loading("Unblocking user...");
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/unblock`);
      toast.success("User unblocked successfully", { id: loadingToast });
      fetchUsers();
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Failed to unblock user", { id: loadingToast });
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    const loadingToast = toast.loading("Promoting user to admin...");
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/make-admin`);
      toast.success("User promoted to admin", { id: loadingToast });
      fetchUsers();
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Failed to promote user", { id: loadingToast });
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    const loadingToast = toast.loading("Removing admin role...");
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/remove-admin`);
      toast.success("Admin role removed", { id: loadingToast });
      fetchUsers();
      setDropdownOpen(null);
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
      toast.success("User deleted successfully", { id: loadingToast });
      fetchUsers();
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Failed to delete user", { id: loadingToast });
    }
  };

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

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      active: { label: "Active", color: "bg-green-500/10 text-green-500 border-green-500/20" },
      blocked: { label: "Blocked", color: "bg-red-500/10 text-red-500 border-red-500/20" },
      pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    };
    const config = statusMap[status] || statusMap.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          <Shield className="h-3 w-3 mr-1" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
        User
      </span>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground">View and manage all registered users</p>
          </div>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table Header with Search */}
          <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Users</h2>
              <p className="text-sm text-muted-foreground">Total {users.length} users registered</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {getInitials(user.name)}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4">{getStatusBadge(user.status)}</td>
                      <td className="p-4">{formatDate(user.createdAt)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDetailsOpen(true);
                            }}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Custom Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setDropdownOpen(dropdownOpen === user._id ? null : user._id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            {dropdownOpen === user._id && (
                              <div className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                                {user.status === "blocked" ? (
                                  <button
                                    onClick={() => handleUnblockUser(user._id)}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted transition-colors"
                                  >
                                    <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                                    Unblock User
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleBlockUser(user._id)}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted transition-colors"
                                  >
                                    <Ban className="h-4 w-4 mr-2 text-red-500" />
                                    Block User
                                  </button>
                                )}

                                <hr className="my-1 border-border" />

                                {user.role === "admin" ? (
                                  <button
                                    onClick={() => handleRemoveAdmin(user._id)}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted transition-colors"
                                  >
                                    <ShieldAlert className="h-4 w-4 mr-2 text-yellow-500" />
                                    Remove Admin
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleMakeAdmin(user._id)}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted transition-colors"
                                  >
                                    <ShieldCheck className="h-4 w-4 mr-2 text-blue-500" />
                                    Make Admin
                                  </button>
                                )}

                                <hr className="my-1 border-border" />

                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-muted transition-colors"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Delete User
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-border text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </motion.div>

      {/* Custom Dialog */}
      <AnimatePresence>
        {isDetailsOpen && selectedUser && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsDetailsOpen(false)}
            />
            
            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-background border border-border rounded-xl shadow-2xl p-6">
                {/* Dialog Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">User Details</h2>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>Role: <span className="font-medium">{selectedUser.role}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>Status: <span className="font-medium">{selectedUser.status}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined: {formatDate(selectedUser.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Last Login: {formatDate(selectedUser.lastLogin)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {selectedUser.status === "blocked" ? (
                      <button
                        onClick={() => {
                          handleUnblockUser(selectedUser._id);
                          setIsDetailsOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <UserCheck className="h-4 w-4" />
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleBlockUser(selectedUser._id);
                          setIsDetailsOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Ban className="h-4 w-4" />
                        Block
                      </button>
                    )}

                    {selectedUser.role === "admin" ? (
                      <button
                        onClick={() => {
                          handleRemoveAdmin(selectedUser._id);
                          setIsDetailsOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleMakeAdmin(selectedUser._id);
                          setIsDetailsOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Make Admin
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;