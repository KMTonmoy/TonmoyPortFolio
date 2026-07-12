"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Tag, ExternalLink, Clock, User } from "lucide-react"

interface Blog {
  _id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  link?: string
  detailsLink?: string | null
  timestamp?: string
}

const BlogDetailsPage = ({ params }: { params: Promise<{ _id: string }> }) => {
  const [blog, setBlog] = useState<Blog | null>(null)
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

    async function fetchBlog() {
      try {
        const res = await fetch(
          `https://tonmoy-pro-backend.vercel.app/editor-content/${id}`,
          { cache: 'no-store' }
        )
        if (!res.ok) {
          if (res.status === 404) {
            setBlog(null)
            setLoading(false)
            return
          }
          throw new Error('Failed to fetch blog data')
        }
        const data = await res.json()
        if (!data || !data._id) {
          setBlog(null)
          setLoading(false)
          return
        }
        setBlog(data)
      } catch {
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "Recent"
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold text-muted-foreground mb-4">No Blog Found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </button>
          </Link>
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-primary/10 shadow-2xl"
        >
          {blog.image && (
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-10 lg:p-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {blog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.timestamp)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Tonmoy Ahamed</span>
              </div>
            </motion.div>

            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
            >
              <div
                className="text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </motion.div>

            {(blog.link || blog.detailsLink) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-6 border-t border-border"
              >
                {blog.link && (
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors group"
                  >
                    Visit Link
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
                {blog.detailsLink && (
                  <a
                    href={blog.detailsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-input bg-background hover:bg-accent px-6 py-2 rounded-full transition-colors group"
                  >
                    View Details
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex justify-between items-center"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All Blogs
          </Link>
          <span className="text-sm text-muted-foreground">
            {blog._id}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogDetailsPage