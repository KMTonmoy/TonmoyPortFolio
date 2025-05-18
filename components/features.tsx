"use client"

import { Code, Palette, Layers, Zap } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    name: "Web Development",
    description: "Custom websites and web applications built with the latest technologies.",
    icon: Code,
  },
  {
    name: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that enhance user experience.",
    icon: Palette,
  },
  {
    name: "Full-Stack",
    description: "End-to-end development from database to frontend implementation.",
    icon: Layers,
  },
  {
    name: "Performance Optimization",
    description: "Fast-loading, responsive websites optimized for all devices.",
    icon: Zap,
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const letterVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const title = "Our Services"

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="container space-y-16 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <motion.h2
          className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl flex justify-center flex-wrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariant}
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
          We offer a comprehensive range of web development and design services.
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
