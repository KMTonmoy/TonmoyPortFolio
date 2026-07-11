"use client"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Code, Rocket, Zap } from "lucide-react"

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative z-10">
        <main className="container py-12 md:py-24">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section with Image Left, Text Right */}
            <motion.div 
              variants={slideInLeft}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dgwknm4yi/image/upload/v1783699544/wmremove-transformed_zkdpwr.png"
                    alt="Tonmoy"
                    width={600}
                    height={600}
                    className="object-cover w-full h-[500px] transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-flex items-center gap-2 bg-primary/90 text-black px-4 py-2 rounded-full text-sm font-medium">
                      <Zap className="h-4 w-4" />
                      Full Stack Developer
                    </span>
                  </div>
                </div>
              </div>

              <motion.div variants={slideInRight} className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                    About Me
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      Tonmoy Ahamed
                    </span>
                  </h1>
                </motion.div>

                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
                  A passionate self-taught web developer and tech enthusiast from Ishwardi, Bangladesh. 
                  I love turning ideas into real-world web applications that are fast, beautiful, and user-friendly.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <Button variant="gradient" size="lg" asChild className="group">
                    <Link href="/projects">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Let's Connect</Link>
                  </Button>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-8 pt-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">20+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Live Sites</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Passion</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={scaleUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            >
              <motion.div
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Code className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Clean Code</h3>
                <p className="text-muted-foreground">Writing maintainable and scalable code with best practices</p>
              </motion.div>

              <motion.div
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Rocket className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Fast Performance</h3>
                <p className="text-muted-foreground">Building blazing fast applications with optimized code</p>
              </motion.div>

              <motion.div
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
                <p className="text-muted-foreground">Using latest technologies to build future-proof solutions</p>
              </motion.div>
            </motion.div>

            {/* Journey Section */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideInLeft}>
                  <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                    My Journey
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    From Curiosity to{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      Creation
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    I started learning web development in my early teens out of curiosity, and that curiosity 
                    quickly turned into a deep passion. Over time, I've learned and worked with technologies 
                    like HTML, CSS, Tailwind, JavaScript, React, Node.js, Next.js, MongoDB, and PostgreSQL.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    I enjoy building both the frontend and backend of web applications, creating complete 
                    solutions from start to finish.
                  </p>
                </motion.div>

                <motion.div variants={slideInRight} className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-2xl blur-2xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                      alt="Coding setup"
                      width={600}
                      height={400}
                      className="object-cover w-full h-[400px] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Philosophy Section */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div className="text-center mb-12">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  My{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Principles
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  variants={slideInLeft}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="text-xl font-bold mb-3">Consistency</h3>
                  <p className="text-muted-foreground">
                    I try to code every day, even if it's just a little. Small steps lead to big results.
                  </p>
                </motion.div>

                <motion.div
                  variants={scaleUp}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="text-xl font-bold mb-3">Curiosity</h3>
                  <p className="text-muted-foreground">
                    Always exploring new things like AI, Linux, and open-source tools to stay ahead.
                  </p>
                </motion.div>

                <motion.div
                  variants={slideInRight}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="text-xl font-bold mb-3">Creativity</h3>
                  <p className="text-muted-foreground">
                    I love building unique UI and meaningful experiences that make a difference.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* What I Do Section */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideInLeft} className="order-2 lg:order-1">
                  <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                    What I Do
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Building{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      Full-Stack
                    </span>{" "}
                    Solutions
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={fadeInUp} className="flex items-start gap-3">
                      <span className="text-primary text-2xl">✅</span>
                      <div>
                        <h4 className="font-semibold">Frontend Development</h4>
                        <p className="text-muted-foreground">Next.js, React, Tailwind CSS</p>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex items-start gap-3">
                      <span className="text-primary text-2xl">✅</span>
                      <div>
                        <h4 className="font-semibold">Backend Development</h4>
                        <p className="text-muted-foreground">Node.js, Express, Prisma, MongoDB, PostgreSQL</p>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex items-start gap-3">
                      <span className="text-primary text-2xl">✅</span>
                      <div>
                        <h4 className="font-semibold">Deployment & DevOps</h4>
                        <p className="text-muted-foreground">Vercel, Railway, Ubuntu Server</p>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div variants={fadeInUp} className="mt-6">
                    <p className="text-muted-foreground text-lg">
                      Currently working on exciting projects like EventCraft and MYIshwardi, 
                      dreaming of launching my own startup someday!
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div variants={slideInRight} className="order-1 lg:order-2 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-2xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                      alt="Coding"
                      width={600}
                      height={400}
                      className="object-cover w-full h-[400px] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={scaleUp}
              className="text-center bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-12 border border-primary/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Something{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Amazing?
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let's work together to create something extraordinary. I'm always open to new opportunities and collaborations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="gradient" size="lg" asChild className="group">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}