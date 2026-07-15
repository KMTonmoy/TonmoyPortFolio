// app/dashboard/manage-blogs/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
 
import { Blog } from '@/types/blog.types';
import { BlogHeader } from '@/components/manage-blogs/BlogHeader';
import { BlogSearch } from '@/components/manage-blogs/BlogSearch';
import { BlogSkeleton } from '@/components/skeleton/BlogSkeleton';
import { BlogEmptyState } from '@/components/manage-blogs/BlogEmptyState';
import { FaPlus } from 'react-icons/fa';
import { BlogCard } from '@/components/manage-blogs/BlogCard';
import { BlogStats } from '@/components/manage-blogs/BlogStats';
import { BlogDeleteDialog } from '@/components/manage-blogs/BlogDeleteDialog';
import { BlogEditDialog } from '@/components/manage-blogs/BlogEditDialog';

const ManageBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor-content`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async () => {
    if (!blogToDelete) return;
    
    setIsDeleting(true);
    const loadingToast = toast.loading('Deleting blog...');
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/editor-content/${blogToDelete._id}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogToDelete._id));
        toast.success('Blog deleted successfully', { id: loadingToast });
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
      } else {
        const response = await res.json();
        toast.error(response.error || 'Failed to delete blog', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Something went wrong while deleting', { id: loadingToast });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateBlog = async (data: { title: string; description: string; image: string }) => {
    if (!editingBlog) return;
    if (!data.title.trim() || !data.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating blog...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/editor-content/${editingBlog._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title.trim(),
            description: data.description.trim(),
            image: data.image,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update blog");
      }

      toast.success("Blog updated successfully!", { id: loadingToast });
      setEditDialogOpen(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error: any) {
      console.error("Error updating blog:", error);
      toast.error(error.message || "Failed to update blog", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BlogHeader onWriteClick={() => router.push('/dashboard/write-blog')} />
        <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogSkeleton count={6} />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <BlogEmptyState
            searchTerm={searchTerm} 
            onWriteClick={() => router.push('/dashboard/write-blog')} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Blog Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard/write-blog')}
              className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl h-[420px] cursor-pointer hover:border-primary hover:bg-muted/30 transition-all group"
            >
              <motion.div 
                className="p-5 rounded-full bg-muted group-hover:bg-primary/10 transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaPlus className="text-4xl text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
              <p className="mt-4 text-muted-foreground group-hover:text-primary font-medium transition-colors text-lg">
                Write New Blog
              </p>
            </motion.div>

            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={(blog) => {
                  setEditingBlog(blog);
                  setEditDialogOpen(true);
                }}
                onDelete={(blog) => {
                  setBlogToDelete(blog);
                  setDeleteDialogOpen(true);
                }}
                onRead={(id) => router.push(`/blogs/${id}`)}
              />
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <BlogStats total={blogs.length} showing={filteredBlogs.length} />
        )}
      </motion.div>

      <BlogDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        blog={blogToDelete}
        onConfirm={deleteBlog}
        isDeleting={isDeleting}
      />

      <BlogEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        blog={editingBlog}
        onUpdate={handleUpdateBlog}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageBlogs;