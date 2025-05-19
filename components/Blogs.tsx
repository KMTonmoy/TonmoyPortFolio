"use client"

import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface Blog {
  _id: number
  title: string
  description: string
  slug: string
  image: string
}

export default function Blogs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data)
        setDisplayedBlogs(pickRandomBlogs(data))
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedBlogs(pickRandomBlogs(allBlogs))
    }, 600000)
    return () => clearInterval(interval)
  }, [allBlogs])

  const pickRandomBlogs = (blogs: Blog[]) => {
    const shuffled = [...blogs].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }

  const title = "My Blogs"

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
  }

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
          Explore articles and insights to stay updated with the latest in tech and design.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {displayedBlogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-background"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{blog.description}</p>
              <Link href={`/blogs/${blog.slug}`}>
                <Button size="sm" variant="outline">
                  Read More
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Button variant="gradient" size="lg" asChild>
          <Link href="/blogs" className="group">
            View All Blogs
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
