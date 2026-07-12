"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Tag } from "lucide-react"

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  link?: string
  detailsLink?: string | null
}

const ProjectDetailsPage = ({ params }: { params: Promise<{ _id: string }> }) => {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>("")

  useEffect(() => {
    async function getParams() {
      const { _id } = await params
      setId(_id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!id) return

    async function fetchProject() {
      try {
        const res = await fetch(`https://tonmoy-pro-backend.vercel.app/projects/${id}`, {
          cache: 'no-store',
        })
        if (!res.ok) {
          if (res.status === 404) {
            setProject(null)
            setLoading(false)
            return
          }
          throw new Error('Failed to fetch project data')
        }
        const data = await res.json()
        setProject(data)
      } catch {
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-muted-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/projects">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-primary/10"
        >
          {project.image && (
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white"
                >
                  {project.title}
                </motion.h1>
              </div>
            </div>
          )}

          <div className="p-8 md:p-10">
            {!project.image && (
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                {project.title}
              </motion.h1>
            )}

            {project.tags && project.tags.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="prose prose-invert max-w-none mb-8">
              <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                <p className="text-lg leading-relaxed whitespace-pre-line text-foreground/90">
                  {project.description}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6 border-t border-border">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Visit Live Project
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </a>
              )}

              {project.detailsLink && (
                <a href={project.detailsLink} target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </a>
              )}

              {!project.link && !project.detailsLink && (
                <button disabled className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-muted text-muted-foreground h-10 px-4 py-2">
                  No Links Available
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>Project ID: {project._id}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}


export default ProjectDetailsPage