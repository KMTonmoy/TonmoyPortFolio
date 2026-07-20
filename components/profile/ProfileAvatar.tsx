"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { toast } from "sonner";
import { imageUpload } from "@/api/utils";

interface ProfileAvatarProps {
  getInitials: (name: string | null | undefined) => string;
}

export const ProfileAvatar = ({ getInitials }: ProfileAvatarProps) => {
  const { user, updateUserProfile } = useAuth();
  const { refetch } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid File", {
        description: "Please upload an image file.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File Too Large", {
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading profile picture...");

    try {
      const imageUrl = await imageUpload(file);
      await updateUserProfile(user?.displayName || "", imageUrl);
      await axios.put(`https://tonmoy-pro-backend.vercel.app/user`, {
        email: user?.email,
        name: user?.displayName || "",
        photo: imageUrl,
        role: "user",
      });
      await refetch();
      toast.success("Profile picture updated!", {
        id: loadingToast,
        description: "Your profile picture has been changed successfully.",
      });
    } catch {
      toast.error("Upload failed", {
        id: loadingToast,
        description: "Failed to upload profile picture. Please try again.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
        <AvatarFallback className="text-2xl">{getInitials(user?.displayName)}</AvatarFallback>
      </Avatar>
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        ) : (
          <Camera className="h-8 w-8 text-white" />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};