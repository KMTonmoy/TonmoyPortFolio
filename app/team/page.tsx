'use client'
import Footer from "@/components/footer"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Tonmoy Ahamed",
    role: "Founder & CEO",
    image: "https://res.cloudinary.com/dgwknm4yi/image/upload/v1746538587/qp3ybceclgfzueee3dol.jpg",
    bio: "Tonmoy A. founded Tonmoy with a vision to create digital experiences that drive business growth. With over 4 years of experience in web development and digital strategy, he leads the team with passion and innovation.",
    social: {
      linkedin: "https://www.linkedin.com/in/tonmoy-ahamed",
      github: "https://github.com/KMTonmoy",
    },
  },
  {
    name: "Shah Alim Shompod",
    role: "Co-Founder & COO",
    image: "https://res.cloudinary.com/dgwknm4yi/image/upload/v1747064741/1_qhp3pi.webp",
    bio: "Shah Alim Shompod over a decade of experience in Web development to Tonmoy. Her keen eye for aesthetics and user-centered approach ensures that every project not only looks beautiful but also delivers exceptional user experiences.",
    social: {
      linkedin: "https://www.linkedin.com/in/shahalimshompod/",
      github: "https://github.com/shahalimshompod",
    },
  },
  {
    name: "Marcus Williams",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "Marcus is a full-stack developer with expertise in React, Node.js, and cloud architecture. He's passionate about writing clean, efficient code and implementing innovative technical solutions for complex challenges.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop",
    bio: "Priya specializes in creating intuitive user experiences through research-driven design. Her background in psychology gives her unique insights into user behavior, which she applies to create interfaces that are both beautiful and functional.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "David Kim",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    bio: "David is an expert in database design, API development, and server architecture. His focus on performance optimization and security ensures that all Tonmoy projects are built on a solid foundation.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emma Rodriguez",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    bio: "Emma ensures that projects are delivered on time and within scope. Her exceptional communication skills and attention to detail keep teams aligned and clients informed throughout the development process.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <main className="container py-24">
          <motion.div
            className="mx-auto max-w-[58rem] text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Our Team
            </h1>
            <motion.p
              className="mt-4 text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Meet the talented individuals behind Tonmoy' success. Our diverse team brings together expertise in design, development, and digital strategy.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-background border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6">{member.bio}</p>

                  <div className="flex space-x-4">
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    )}
                    {member.social.twitter && (
                      <Link
                        href={member.social.twitter}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    )}
                    {member.social.github && (
                      <Link
                        href={member.social.github}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 bg-primary/5 p-8 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. If you're passionate about web development, design, or digital strategy, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-8 py-3 rounded-md font-medium hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              View Open Positions
            </a>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
