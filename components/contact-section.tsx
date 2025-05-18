'use client'

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import ContactForm from "./contact-form"
import { motion } from "framer-motion"

export default function ContactSection() {
  const fadeIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }

  return (
    <section className="container py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Heading */}
      <motion.div
        {...fadeIn}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center mb-12 md:mb-16"
      >
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Have a project in mind? We'd love to hear from you.
        </p>
      </motion.div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Contact Info */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="bg-primary/5 p-6 sm:p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:Tonmoybd.inbox@gmail.com" className="text-muted-foreground hover:text-primary block">
                    tonmoyahamed2009@gmail.com
                  </a>
                
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+8801622564462" className="text-muted-foreground hover:text-primary">
                    +880 1622-564462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    Dashuria, Ishwardi, Pabna<br />
                    Dashuria Traffic Mor, Near Hanif Counter
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            {...fadeIn}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden h-[250px] sm:h-[300px] border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1287.6554612094983!2d89.10376773418687!3d24.100101635818305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9f23937b8679%3A0xd0f9602db7014ee4!2sDev%20Lab!5e0!3m2!1sen!2sbd!4v1747105604420!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true }}
          className="bg-background border rounded-xl p-6 sm:p-8 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
