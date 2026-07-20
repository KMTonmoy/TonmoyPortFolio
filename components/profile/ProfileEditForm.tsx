"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { toast } from "sonner";

interface ProfileEditFormProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editName: string;
  setEditName: (value: string) => void;
}

export const ProfileEditForm = ({
  isEditing,
  setIsEditing,
  editName,
  setEditName,
}: ProfileEditFormProps) => {
  const { user, updateUserProfile } = useAuth();
  const { userData, refetch } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      toast.error("Error", {
        description: "Name cannot be empty.",
      });
      return;
    }

    setIsSaving(true);
    const loadingToast = toast.loading("Saving profile changes...");

    try {
      await updateUserProfile(editName, user?.photoURL || "");
      await axios.put(`https://tonmoy-pro-backend.vercel.app/user`, {
        email: user?.email,
        name: editName,
        photo: user?.photoURL || "",
        role: userData?.role || "user",
      });
      await refetch();
      toast.success("Profile updated!", {
        id: loadingToast,
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch {
      toast.error("Update failed", {
        id: loadingToast,
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Enter your name"
          disabled={isSaving}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSaveProfile} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setIsEditing(false);
            setEditName(user?.displayName || "");
          }}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};