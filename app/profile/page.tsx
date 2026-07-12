// app/profile/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useUserRole } from "@/hooks/useUserRole";
import { ProfileDisplay } from "@/components/profile/ProfileDisplay";
 import { AdminPanel } from "@/components/profile/AdminPanel";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSkeleton } from "@/components/skeleton/ProfileSkeleton";
import { NotLoggedIn } from "@/components/profile/NotLoggedIn";
 

const Profile = () => {
  const { user, logOut } = useAuth();
  const { userData, loading } = useUser();
  const { isAdmin, role } = useUserRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <ProfileSkeleton />;
  if (!user) return <NotLoggedIn />;

  return (
    <div className="container py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <ProfileHeader onLogout={logOut} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <ProfileAvatar getInitials={getInitials} />
                  <h2 className="mt-4 text-xl font-semibold">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    isAdmin 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {isAdmin ? "Admin" : "User"}
                  </span>
                  {loading && <p className="mt-2 text-sm text-muted-foreground">Loading...</p>}
                </div>

                <ProfileInfo
                  user={user}
                  userData={userData}
                  role={role}
                  isAdmin={isAdmin}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setEditName(user?.displayName || "");
                    }}
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <ProfileEditForm
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editName={editName}
                    setEditName={setEditName}
                  />
                ) : (
                  <ProfileDisplay user={user} isAdmin={isAdmin} />
                )}
              </CardContent>
            </Card>

 
            {isAdmin && <AdminPanel />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;