'use client'

import { Quote } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "Tonmoy transformed our online presence. Their attention to detail and technical expertise is unmatched.",
    author: "Jane Cooper",
    position: "CEO, Tech Innovators Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  },
  {
    quote: "Working with Tonmoy was a game-changer for our business. They delivered beyond our expectations.",
    author: "Robert Johnson",
    position: "Marketing Director, Global LLC",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
  },
  {
    quote: "The team at Tonmoy understood our vision perfectly and brought it to life with stunning design and flawless functionality.",
    author: "Emily Williams",
    position: "Founder, Startup Ventures",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-primary/5 py-24 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto max-w-[58rem] text-center mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Client Testimonials
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-background p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <Quote className="h-8 w-8 text-primary/40 mb-4" />
              <p className="text-base sm:text-lg mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/reviews"
            className="inline-block bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-6 py-3 rounded-md font-medium hover:brightness-110 hover:scale-105 transition-all duration-300"
          >
            Read More Reviews
          </a>
        </motion.div>
      </div>
    </section>
  )
}
