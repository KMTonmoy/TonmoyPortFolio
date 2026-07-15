 
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaSpinner, FaSave, FaImage, FaTimes, FaUpload } from "react-icons/fa";
import { imageUpload } from "@/api/utils";
import { BlogEditDialogProps } from "@/types/blog.types";

export const BlogEditDialog = ({ 
  open, 
  onOpenChange, 
  blog, 
  onUpdate, 
  isSubmitting 
}: BlogEditDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog opens with new blog
  useEffect(() => {
    if (blog && open) {
      setTitle(blog.title);
      setDescription(blog.description);
      setImage(blog.image);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [blog, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please write some content");
      return;
    }

    let imageUrl = image;

    if (imageFile) {
      try {
        imageUrl = await imageUpload(imageFile);
      } catch (error) {
        toast.error("Failed to upload image");
        return;
      }
    }

    onUpdate({ title: title.trim(), description: description.trim(), image: imageUrl });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Edit Blog
            </DialogTitle>
            <DialogDescription>
              Update your blog post
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-sm font-medium">
                Blog Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-title"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                className="text-lg transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Featured Image</Label>
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FaImage className="h-8 w-8 text-white" />
                        <span className="text-white text-xs ml-2">Change</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <FaUpload className="h-10 w-10 mb-2" />
                      <span className="text-sm text-center px-2">Click to upload</span>
                      <span className="text-xs">PNG, JPG, SVG (Max 5MB)</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </motion.div>
                {image && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImage("");
                      setImageFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="gap-2"
                  >
                    <FaTimes className="h-4 w-4" />
                    Remove Image
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Click the image box to upload a new featured image
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="edit-description"
                placeholder="Write your blog content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={12}
                disabled={isSubmitting}
                className="font-mono resize-y min-h-[200px] transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
              disabled={isSubmitting}
              className="gap-2"
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="gradient"
                className="gap-2   text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="h-4 w-4" />
                    Update Blog
                  </>
                )}
              </Button>
            </motion.div>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};