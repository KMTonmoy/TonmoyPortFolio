"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"

interface Blog {
  _id: string
  title: string
  description: string
  image: string
  timestamp?: string
}

const BlogSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-primary/10 animate-pulse">
      <div className="w-full h-56 bg-muted"></div>
      <div className="p-6 space-y-4">
        <div className="h-8 bg-muted rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

const Blogs: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    fetch('https://tonmoy-portfolio-back-end.vercel.app/editor-content/')
      .then((res) => res.json())
      .then((data: Blog[]) => {
        setBlogs(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load blogs:', err)
        setLoading(false)
      })
  }, [])

  const visibleBlogs = blogs.slice(0, visibleCount)

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

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const truncateText = (text: string, maxLength: number): string => {
    const plainText = stripHtml(text)
    return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText
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
                My Blog
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Thoughts &{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Insights
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Exploring the world of web development, one article at a time.
            </motion.p>
          </motion.div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {blogs.length === 0 ? (
                <motion.div 
                  variants={cardVariants}
                  className="text-center py-20"
                >
                  <p className="text-muted-foreground text-lg">No blog posts found.</p>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {visibleBlogs.map(({ _id, title, description, image, timestamp }) => (
                    <motion.div
                      key={_id}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-card rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <Link href={`/blogs/${_id}`}>
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="inline-flex items-center gap-2 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                              <ArrowRight className="h-3 w-3" />
                              Read More
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <Link href={`/blogs/${_id}`}>
                          <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                          {truncateText(description, 120)}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(timestamp)}</span>
                          </div>
                          <Link
                            href={`/blogs/${_id}`}
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
                          >
                            Read Blog
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Show More/Less Buttons */}
              {blogs.length > 6 && (
                <motion.div 
                  variants={cardVariants}
                  className="mt-12 text-center"
                >
                  {visibleCount < blogs.length ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium hover:shadow-lg hover:shadow-primary/25"
                    >
                      Show More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setVisibleCount(6)}
                      className="group inline-flex items-center gap-2 bg-muted text-muted-foreground px-8 py-3 rounded-full hover:bg-muted/80 transition-all duration-300 font-medium"
                    >
                      Show Less
                    </button>
                  )}
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Blogs