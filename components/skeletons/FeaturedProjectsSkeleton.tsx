"use client";

import { motion } from "framer-motion";

interface FeaturedProjectsSkeletonProps {
  count?: number;
}

const shimmer = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: "linear",
    },
  },
};

export const FeaturedProjectsSkeleton = ({
  count = 3,
}: FeaturedProjectsSkeletonProps) => {
  return (
    <section className="container py-24 md:py-32">
      {/* Title Skeleton */}
      <div className="mx-auto max-w-[58rem] text-center mb-16">
        <div className="h-10 sm:h-12 md:h-14 w-72 mx-auto rounded-lg bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            variants={shimmer}
            initial="hidden"
            animate="visible"
          />
        </div>
        <div className="h-5 w-96 max-w-full mx-auto mt-4 rounded-md bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            variants={shimmer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
          >
            {/* Image Skeleton */}
            <div className="aspect-video overflow-hidden bg-white/5 relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                variants={shimmer}
                initial="hidden"
                animate="visible"
              />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="h-6 w-3/4 rounded-md bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                />
              </div>

              {/* Description lines */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-white/5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.15 }}
                  />
                </div>
                <div className="h-4 w-5/6 rounded-md bg-white/5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="h-6 w-16 rounded-full bg-white/5 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                      variants={shimmer}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.25 + tagIndex * 0.05 }}
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <div className="h-8 w-20 rounded-md bg-white/5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  />
                </div>
                <div className="h-8 w-24 rounded-md bg-white/5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.35 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjectsSkeleton;