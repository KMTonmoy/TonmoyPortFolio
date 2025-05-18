"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce solution with integrated payment processing.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
    link: "#",
  },
  {
    title: "Corporate Website",
    description: "Modern corporate website with custom CMS integration.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "Mobile App UI",
    description: "User interface design for a fitness tracking mobile application.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    tags: ["Figma", "UI/UX", "Prototyping"],
    link: "#",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics dashboard for a SaaS product with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["Vue.js", "D3.js", "Firebase"],
    link: "#",
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      rotate: index % 2 === 0 ? -6 : 6,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  })

  const letterVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const title = "Featured Projects"

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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Explore our recent work and see how we've helped businesses achieve their digital goals.
        </motion.p>
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-lg border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            variants={cardVariants(index)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="group">
                  View Project <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button variant="gradient" size="lg" asChild>
          <Link href="/projects" className="group">
            View All Projects
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
