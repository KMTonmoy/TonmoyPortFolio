 
"use client";

import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";
import { BlogDeleteDialogProps } from "@/types/blog.types";
import { useState } from "react";

export const BlogDeleteDialog = ({ 
  open, 
  onOpenChange, 
  blog, 
  onConfirm, 
  isDeleting 
}: BlogDeleteDialogProps) => {
  const [confirmName, setConfirmName] = useState("");

  const handleClose = () => {
    setConfirmName("");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog
            &quot;{blog?.title}&quot; from your portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <p className="text-sm font-medium mb-2">
            Type <span className="font-bold text-destructive">{blog?.title}</span> to confirm deletion
          </p>
          <Input
            placeholder={`Type "${blog?.title}" to confirm`}
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={confirmName !== blog?.title || isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Blog'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};