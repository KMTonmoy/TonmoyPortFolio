"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface Skill {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
}

interface Blog {
  id: number;
  title: string;
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("https://tonmoy-portfolio-back-end.vercel.app/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data ?? []))
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
      });

    fetch("https://tonmoy-portfolio-back-end.vercel.app/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data ?? []))
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setSkills([]);
      });

    fetch("https://tonmoy-portfolio-back-end.vercel.app/editor-content")
      .then((res) => res.json())
      .then((data) => setBlogs(data ?? []))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      });
  }, []);

  return (
    <div className="p-8 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Here's a quick snapshot of your creative universe – from projects you’ve built, to
          skills you’ve mastered, and stories you've shared.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 text-white">
        <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-pink-500 to-pink-700 text-center">
          <h2 className="text-lg font-medium mb-2">Projects</h2>
          <CountUp end={projects.length} duration={1.5} className="text-4xl font-bold" />
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-orange-500 to-orange-700 text-center">
          <h2 className="text-lg font-medium mb-2">Skills</h2>
          <CountUp end={skills.length} duration={1.5} className="text-4xl font-bold" />
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-500 to-green-700 text-center">
          <h2 className="text-lg font-medium mb-2">Blogs</h2>
          <CountUp end={blogs.length} duration={1.5} className="text-4xl font-bold" />
        </div>
      </div>

  
    </div>
  );
};

export default Page;
