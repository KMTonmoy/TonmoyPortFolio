 
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { BlogHeaderProps } from "@/types/blog.types";

export const BlogHeader = ({ onWriteClick }: BlogHeaderProps) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Manage Blogs
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create, edit, and manage your blog posts
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          onClick={onWriteClick} 
          className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.span
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FaPlus className="h-4 w-4" />
          </motion.span>
          Write Blog
        </Button>
      </motion.div>
    </motion.div>
  );
};