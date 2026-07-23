 
"use client";

import { motion } from "framer-motion";

export const SidebarSkeleton = () => {
  return (
    <div className="flex md:w-[280px] z-40 min-h-screen bg-gray-900 text-white">
      <div className="w-[280px] p-6 flex flex-col items-center">
        {/* Avatar Skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="h-20 w-20 rounded-full bg-gray-700 animate-pulse" />
          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-gray-600 border-2 border-gray-900 animate-pulse" />
        </motion.div>

        {/* Name Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3"
        >
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
        </motion.div>

        {/* Email Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2"
        >
          <div className="h-4 w-40 bg-gray-700 rounded animate-pulse" />
        </motion.div>

        {/* Badge Skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-2"
        >
          <div className="h-6 w-24 bg-gray-700 rounded-full animate-pulse" />
        </motion.div>

        {/* Divider */}
        <div className="w-full mt-4 border-t border-gray-700" />

        {/* Navigation Links Skeleton */}
        <div className="w-full mt-6 space-y-3 px-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * item, duration: 0.3 }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="h-5 w-5 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};