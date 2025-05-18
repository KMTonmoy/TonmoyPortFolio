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
            {/* Animating the header */}
            <motion.h1
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About Tonmoy
            </motion.h1>

            <motion.div
              className="aspect-video relative mb-8 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Tonmoy team"
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
                Tonmoy is a leading web development and design agency committed to delivering exceptional digital
                experiences. Established in 2018, we have evolved from a small group of dedicated developers into a
                full-service digital agency catering to clients from diverse industries.
              </p>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Our Mission
              </motion.h2>
              <p>
                At Tonmoy, our mission is to empower businesses through innovative digital solutions that foster growth
                and enhance user engagement. We combine state-of-the-art technology with creative design to create websites
                and applications that are not only visually appealing but also optimized for high performance.
              </p>

              <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <h3 className="text-xl font-bold mb-2">50+</h3>
                  <p className="text-muted-foreground">Successful Projects</p>
                </motion.div>
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                >
                  <h3 className="text-xl font-bold mb-2">15+</h3>
                  <p className="text-muted-foreground">Team Members</p>
                </motion.div>
                <motion.div
                  className="bg-primary/5 p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.4 }}
                >
                  <h3 className="text-xl font-bold mb-2">98%</h3>
                  <p className="text-muted-foreground">Client Satisfaction</p>
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                Our Approach
              </motion.h2>
              <p>
                We adopt a collaborative approach for every project, working closely with clients to fully comprehend their
                objectives. Our transparent, iterative process ensures we consistently deliver tangible and measurable results.
              </p>

              <motion.ol
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                <li>
                  <strong>Discovery:</strong> We initiate by understanding your business, objectives, and target audience.
                </li>
                <li>
                  <strong>Strategy:</strong> We craft a comprehensive plan tailored to your specific requirements.
                </li>
                <li>
                  <strong>Design:</strong> Our creative team develops visually captivating and user-centric interfaces.
                </li>
                <li>
                  <strong>Development:</strong> We construct robust, scalable solutions using modern technologies.
                </li>
                <li>
                  <strong>Testing:</strong> Thorough quality assurance ensures flawless functionality.
                </li>
                <li>
                  <strong>Launch:</strong> We deploy your project and offer training and post-launch support.
                </li>
                <strong>Optimization:</strong> Ongoing improvements based on feedback and performance data.
              </motion.ol>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
              >
                Our Values
              </motion.h2>
              <ul>
                <li>
                  <strong>Innovation:</strong> We remain at the forefront of technology, providing cutting-edge solutions.
                </li>
                <li>
                  <strong>Quality:</strong> We are committed to the highest standards of quality in all aspects of our work.
                </li>
                <li>
                  <strong>Integrity:</strong> We foster trust, transparency, and honesty in all our business relationships.
                </li>
                <li>
                  <strong>Collaboration:</strong> We believe in the power of teamwork to achieve the best results.
                </li>
              </ul>

              <motion.div
                className="my-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.2 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Tonmoy office"
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
                Our Expertise
              </motion.h2>
              <p>
                Our team is proficient in web development, UI/UX design, e-commerce solutions, and digital marketing. We
                specialize in building responsive websites, custom web applications, e-commerce platforms, and comprehensive
                digital strategies.
              </p>

              <p>
                Whether you're a startup aiming to establish your online presence or a large corporation undergoing digital
                transformation, Tonmoy possesses the expertise and experience to help you meet your objectives.
              </p>
            </motion.div>

            <div className="mt-12 flex justify-center space-x-4">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/team">Meet Our Team</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
