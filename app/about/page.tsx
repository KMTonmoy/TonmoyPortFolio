"use client"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <main className="container py-24">
          <div className="mx-auto max-w-3xl">
            <motion.h1
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About Me
            </motion.h1>

            <motion.div
              className="aspect-video relative mb-8 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Tonmoy"
                width={800}
                height={400}
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="prose prose-lg dark:prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <p>
                Hi! I'm <strong>Tonmoy Ahamed</strong>, a passionate self-taught web developer and tech enthusiast from Ishwardi, Bangladesh. I love turning ideas into real-world web applications that are fast, beautiful, and user-friendly.
              </p>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                My Journey
              </motion.h2>
              <p>
                I started learning web development in my early teens out of curiosity, and that curiosity quickly turned into a deep passion. Over time, I’ve learned and worked with technologies like HTML, CSS, Tailwind, JavaScript, React, Node.js, Next.js, MongoDB, and PostgreSQL. I enjoy building both the frontend and backend of web applications.
              </p>

              <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <h3 className="text-xl font-bold mb-2">20+</h3>
                  <p className="text-muted-foreground">Personal Projects</p>
                </motion.div>
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                >
                  <h3 className="text-xl font-bold mb-2">5+</h3>
                  <p className="text-muted-foreground">Live Websites</p>
                </motion.div>
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.4 }}
                >
                  <h3 className="text-xl font-bold mb-2">100%</h3>
                  <p className="text-muted-foreground">Love for Coding</p>
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                My Philosophy
              </motion.h2>
              <p>
                I believe in learning by doing. Every bug, every error, and every solution makes me stronger as a developer. I love solving problems, experimenting with new tools, and staying updated with the latest tech trends.
              </p>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                <li><strong>Consistency:</strong> I try to code every day, even if it's just a little.</li>
                <li><strong>Curiosity:</strong> Always exploring new things like AI, Linux, and open-source tools.</li>
                <li><strong>Creativity:</strong> I love building unique UI and meaningful experiences.</li>
              </motion.ul>

              <motion.div
                className="my-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.2 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Coding setup"
                  width={800}
                  height={400}
                  className="rounded-lg"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.4 }}
              >
                What I Do
              </motion.h2>
              <p>
                I build full-stack web applications using modern frameworks. Some of the things I specialize in:
              </p>
              <ul>
                <li>✅ Frontend: Next.js, React, Tailwind CSS</li>
                <li>✅ Backend: Node.js, Express, Prisma, MongoDB, PostgreSQL</li>
                <li>✅ Deployment: Vercel, Railway, Ubuntu Server</li>
              </ul>

              <p>
                I’m currently working on some exciting projects like EventCraft and MYIshwardi, and I dream of launching my own startup someday!
              </p>
            </motion.div>

            <div className="mt-12 flex justify-center space-x-4">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/projects">See My Projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Let’s Connect</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
