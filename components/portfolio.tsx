"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Project {
  _id: number | string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  detailsLink: string;
  link: string;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch("https://tonmoy-portfolio-back-end.vercel.app/projects")
      .then((response) => response.json())
      .then((json: Project[]) => setProjects(json))
      .catch(() => setProjects([]));
  }, []);

  function handleShowMore() {
    if (visibleCount >= projects.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount((count) => Math.min(count + 3, projects.length));
    }
  }

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.25,
        ease: "easeOut",
      },
    }),
  };

  const title = "Featured Projects";

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="container py-24 md:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center mb-16">
        <motion.h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl flex justify-center flex-wrap">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              custom={index}
              className={char === " " ? "w-2" : ""}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Explore our recent work and see how we've helped businesses achieve their digital goals.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {projects.slice(0, visibleCount).map((project) => (
          <motion.div
            key={project._id}
            className="group relative overflow-hidden rounded-lg border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            variants={cardVariants}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{truncateText(project.title, 30)}</h3>
              <p className="text-muted-foreground mb-4">{truncateText(project.description, 100)}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`projects/${project._id}`}>Details</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link} target="_blank">
                    Live Link{" "}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {projects.length > 3 && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Button variant="gradient" size="lg" onClick={handleShowMore}>
            {visibleCount >= projects.length ? "Show Less" : "Show More"}
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
              →
            </span>
          </Button>
        </motion.div>
      )}
    </motion.section>
  );
}
