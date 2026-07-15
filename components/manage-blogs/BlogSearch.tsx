"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { BlogSearchProps } from "@/types/blog.types";

export const BlogSearch = ({ searchTerm, onSearchChange }: BlogSearchProps) => {
  return (
    <motion.div 
      className="relative mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search blogs by title or content..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
      />
    </motion.div>
  );
};