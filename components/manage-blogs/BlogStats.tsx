 
"use client";

import { motion } from "framer-motion";
import { BlogStatsProps } from "@/types/blog.types";

export const BlogStats = ({ total, showing }: BlogStatsProps) => {
  return (
    <motion.div 
      className="mt-8 flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="flex items-center gap-2">
        <span className="font-semibold text-foreground">{total}</span>
        Total Blogs
      </span>
      <span className="flex items-center gap-2">
        Showing <span className="font-semibold text-foreground">{showing}</span>
      </span>
    </motion.div>
  );
};