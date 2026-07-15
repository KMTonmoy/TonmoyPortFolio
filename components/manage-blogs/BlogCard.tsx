 
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaTrash, FaCalendar, FaBookOpen } from "react-icons/fa";
import { BlogCardProps } from "@/types/blog.types";

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const truncateText = (text: string, maxLength: number = 120) => {
  const plainText = stripHtml(text);
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
};

export const BlogCard = ({ blog, onEdit, onDelete, onRead }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="h-full"
    >
      <Card className="group overflow-hidden border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col relative">
        {/* Image Container with Zoom Effect */}
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Action Buttons */}
          <motion.div 
            className="absolute top-3 right-3 flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                onClick={() => onEdit(blog)}
              >
                <FaEdit className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="destructive"
                className="h-9 w-9 shadow-lg"
                onClick={() => onDelete(blog)}
              >
                <FaTrash className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Date Badge */}
          <motion.div 
            className="absolute bottom-3 left-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70 border-none backdrop-blur-sm px-3 py-1.5">
              <FaCalendar className="h-3 w-3 mr-1.5" />
              {formatDate(blog.timestamp)}
            </Badge>
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="p-5 flex flex-col flex-1">
          <motion.h3 
            className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {blog.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {truncateText(blog.description, 120)}
          </motion.p>

          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              onClick={() => onRead(blog._id)}
              variant="gradient"
              className="w-full group/btn text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Read Now
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaBookOpen className="h-4 w-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};