 
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaBookOpen, FaPlus } from "react-icons/fa";

interface BlogEmptyStateProps {
  searchTerm: string;
  onWriteClick: () => void;
}

export const BlogEmptyState = ({ searchTerm, onWriteClick }: BlogEmptyStateProps) => {
  return (
    <motion.div 
      className="text-center py-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <FaBookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
      </motion.div>
      <p className="text-muted-foreground text-lg">
        {searchTerm ? 'No blogs found matching your search' : 'No blogs yet. Start writing your first blog!'}
      </p>
      {!searchTerm && (
        <Button 
          onClick={onWriteClick} 
          className="mt-4 gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaPlus className="h-4 w-4" />
          Write Your First Blog
        </Button>
      )}
    </motion.div>
  );
};