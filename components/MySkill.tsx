"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillSkeleton from "@/components/skeletons/SkillSkeleton";

interface Skill {
  name: string;
  image: string;
}

const MySkill = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("https://tonmoy-pro-backend.vercel.app/skills");
        const data: Skill[] = await res.json();
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return <SkillSkeleton count={12} />;
  }

  return (
    <section className="container py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-10"
      >
        My Skills
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm border border-white/10 shadow hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={skill.image}
                  alt={skill.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-center">{skill.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MySkill;