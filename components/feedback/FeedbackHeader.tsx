 
"use client";

import { motion } from "framer-motion";

export const FeedbackHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl font-bold mb-2">Write a Review</h1>
      <p className="text-muted-foreground">
        Share your experience working with me
      </p>
    </motion.div>
  );
};