'use client'

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import ContactForm from "./contact-form"
import { motion } from "framer-motion"

export default function ContactSection() {
  return (
    <section className="container py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[58rem] text-center mb-16"
      >
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Get in Touch</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">Have a project in mind? We'd love to hear from you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Info Box */}
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:Tonmoybd.inbox@gmail.com" className="text-muted-foreground hover:text-primary">
                    Tonmoybd.inbox@gmail.com
                  </a> <br />
                  <a href="mailto:Tonmoybd.contact@gmail.com" className="text-muted-foreground hover:text-primary">
                    Tonmoybd.contact@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+8801622564462" className="text-muted-foreground hover:text-primary">
                    +880 1622-564462
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    Dashuria, Ishwardi, Pabna
                    <br />
                    Dashuria Traffic Mor, Near Hanif Counter
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden h-[300px] border"
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

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-background border rounded-lg p-8"
        >
          <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
