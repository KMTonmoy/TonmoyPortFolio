"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, ArrowRight, Tag, User } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ProjectCardSkeleton } from "@/components/skeleton/ProjectCardSkeleton"
  
interface Project {
  _id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  timestamp?: string
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('https://tonmoy-pro-backend.vercel.app/projects')
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data = await res.json()
        
        let projectsData = data
        if (data && typeof data === 'object') {
          if (data.projects && Array.isArray(data.projects)) {
            projectsData = data.projects
          } else if (!Array.isArray(data) && data._id) {
            projectsData = [data]
          } else if (Array.isArray(data)) {
            projectsData = data
          } else {
            const possibleArray = Object.values(data).find(val => Array.isArray(val))
            if (possibleArray) {
              projectsData = possibleArray
            } else {
              projectsData = []
            }
          }
        }
        
        setProjects(projectsData)
      } catch (error) {
        console.error('Fetch error:', error)
        setError(error instanceof Error ? error.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "Recent"
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number = 120) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Projects</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div 
            variants={cardVariants}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                My Portfolio
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore our recent work and see how we've helped businesses achieve their digital goals.
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {projects.length === 0 ? (
                <motion.div 
                  variants={cardVariants}
                  className="text-center py-20"
                >
                  <p className="text-muted-foreground text-lg">No projects found.</p>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {projects.map((project) => (
                    <motion.div
                      key={project._id}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <Link href={`/projects/${project._id}`}>
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="inline-flex items-center gap-2 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                              <ArrowRight className="h-3 w-3" />
                              View Details
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <Link href={`/projects/${project._id}`}>
                          <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                          {truncateText(project.description, 120)}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(project.timestamp)}</span>
                          </div>
                          <div className="flex gap-2">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
                              >
                                Live
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            <Link
                              href={`/projects/${project._id}`}
                              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
                            >
                              Details
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}