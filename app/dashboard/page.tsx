"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  FolderGit2, 
  Code2, 
  FileText, 
  Users, 
  User,
  Mail,
  Calendar,
  Shield,
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface Skill {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
}

interface Blog {
  _id: string;
  title: string;
}

const Page = () => {
  const { user } = useAuth();
  const { userData } = useUser();
  const { isAdmin } = useUserRole();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes, blogsRes] = await Promise.all([
          fetch(`https://tonmoy-pro-backend.vercel.app/projects`),
          fetch(`https://tonmoy-pro-backend.vercel.app/skills`),
          fetch(`https://tonmoy-pro-backend.vercel.app/editor-content`),
        ]);

        const [projectsData, skillsData, blogsData] = await Promise.all([
          projectsRes.json(),
          skillsRes.json(),
          blogsRes.json(),
        ]);

        setProjects(projectsData ?? []);
        setSkills(skillsData ?? []);
        setBlogs(blogsData ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProjects([]);
        setSkills([]);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: <FolderGit2 className="h-6 w-6" />,
      color: "from-pink-500 to-pink-700",
      href: "/dashboard/manage-projects",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: <Code2 className="h-6 w-6" />,
      color: "from-orange-500 to-orange-700",
      href: "/dashboard/manage-skills",
    },
    {
      title: "Blogs",
      value: blogs.length,
      icon: <FileText className="h-6 w-6" />,
      color: "from-green-500 to-green-700",
      href: "/dashboard/manage-blogs",
    },
  ];

  if (isAdmin) {
    stats.push({
      title: "Users",
      value: 1,
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500 to-blue-700",
      href: "/dashboard/manage-users",
    });
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, <span className="text-primary">{user?.displayName || "User"}</span>!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              isAdmin 
                ? "bg-primary/10 text-primary" 
                : "bg-secondary text-secondary-foreground"
            }`}>
              <Shield className="h-3 w-3 mr-1" />
              {isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user?.displayName || "Not set"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {userData?.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${stat.color} text-white hover:shadow-xl transition-shadow cursor-pointer group`}
            onClick={() => window.location.href = stat.href}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
            <CountUp
              end={stat.value}
              duration={1.5}
              className="text-4xl font-bold"
            />
            <p className="text-sm opacity-90 mt-1">Total {stat.title.toLowerCase()}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="h-auto py-4 justify-start" variant="outline">
            <Link href="/dashboard/manage-projects">
              <FolderGit2 className="h-5 w-5 mr-2" />
              Manage Projects
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
          <Button asChild className="h-auto py-4 justify-start" variant="outline">
            <Link href="/dashboard/manage-skills">
              <Code2 className="h-5 w-5 mr-2" />
              Manage Skills
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
          <Button asChild className="h-auto py-4 justify-start" variant="outline">
            <Link href="/dashboard/manage-blogs">
              <FileText className="h-5 w-5 mr-2" />
              Manage Blogs
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
          {isAdmin && (
            <Button asChild className="h-auto py-4 justify-start" variant="outline">
              <Link href="/dashboard/manage-users">
                <Users className="h-5 w-5 mr-2" />
                Manage Users
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Page;