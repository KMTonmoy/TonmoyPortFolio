"use client";

import { motion } from "framer-motion";

interface SkillSkeletonProps {
  count?: number;
}

const shimmer = {
  hidden: { backgroundPosition: "-500px 0" },
  visible: {
    backgroundPosition: "500px 0",
    transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: "linear",
    },
  },
};

export const SkillSkeleton = ({ count = 12 }: SkillSkeletonProps) => {
  return (
    <section className="container py-16 text-center">
      <div className="h-9 w-48 mx-auto mb-10 rounded-lg bg-white/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          variants={shimmer}
          initial="hidden"
          animate="visible"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white/5 rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm border border-white/10 shadow relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              }}
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />

            <div className="w-12 h-12 rounded-lg bg-white/10" />

            <div className="w-16 h-4 rounded-md bg-white/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillSkeleton;