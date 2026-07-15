"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FaSave, FaSpinner, FaArrowLeft, FaImage, FaTimes, FaUpload } from "react-icons/fa";
import { imageUpload } from "@/api/utils";

const BlogEditorPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please write some content");
      return;
    }
    if (!imageFile && !image) {
      toast.error("Please upload a featured image");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Publishing blog...");

    try {
      let imageUrl = image;

      if (imageFile) {
        try {
          imageUrl = await imageUpload(imageFile);
        } catch (error) {
          toast.error("Failed to upload image", { id: loadingToast });
          setIsSubmitting(false);
          return;
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to publish blog");
      }

      toast.success("Blog published successfully!", { id: loadingToast });
      setTitle("");
      setDescription("");
      setImage("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.push("/dashboard/manage-blogs");
    } catch (error: any) {
      console.error("Error publishing blog:", error);
      toast.error(error.message || "Failed to publish blog", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/manage-blogs")}
          >
            <FaArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Write New Blog</h1>
            <p className="text-muted-foreground">Share your thoughts with the world</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label>Featured Image *</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
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
                        <span className="text-sm">Click to upload</span>
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
                  </div>
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
                    >
                      <FaTimes className="h-4 w-4 mr-2" />
                      Remove Image
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a featured image for your blog post
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog content here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={15}
                  disabled={isSubmitting}
                  className="text-base resize-y min-h-[400px] p-4"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant="gradient"
              className="gap-2 min-w-[120px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4" />
                  Publish Blog
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/manage-blogs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogEditorPage;