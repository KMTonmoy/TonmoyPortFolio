"use client"

import Footer from "@/components/footer"
import { Code, Palette, Layers, Zap, ShoppingCart, BarChart, Globe, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Import Framer Motion for animation

const services = [
  {
    name: "Web Development 🚀",
    description:
      "Custom websites and web applications built with the latest technologies to deliver exceptional user experiences and meet your business objectives.",
    icon: Code,
    features: [
      "Responsive design for all devices",
      "Performance optimization",
      "SEO-friendly architecture",
      "Accessibility compliance",
    ],
  },
  {
    name: "UI/UX Design 🎨",
    description:
      "Beautiful, intuitive interfaces that enhance user experience and drive engagement with your digital products.",
    icon: Palette,
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Usability testing",
    ],
  },
  {
    name: "Full-Stack 🛠️",
    description:
      "End-to-end development from database to frontend implementation, ensuring seamless integration and optimal performance.",
    icon: Layers,
    features: ["Database design and optimization", "API development", "Frontend implementation", "System architecture"],
  },
  {
    name: "Performance Optimization ⚡",
    description:
      "Fast-loading, responsive websites optimized for all devices to improve user experience and search engine rankings.",
    icon: Zap,
    features: [
      "Core Web Vitals optimization",
      "Image and asset optimization",
      "Code splitting and lazy loading",
      "Caching strategies",
    ],
  },
  {
    name: "E-Commerce 🛒",
    description:
      "Custom online stores with secure payment processing, inventory management, and seamless user experience.",
    icon: ShoppingCart,
    features: [
      "Product catalog management",
      "Secure payment integration",
      "Order processing workflows",
      "Customer account management",
    ],
  },
  {
    name: "Analytics & Reporting 📊",
    description:
      "Data visualization and reporting tools to help you make informed decisions based on user behavior and business metrics.",
    icon: BarChart,
    features: ["Custom dashboard development", "Data visualization", "Automated reporting", "User behavior analysis"],
  },
  {
    name: "Multilingual Websites 🌍",
    description: "Reach a global audience with websites that support multiple languages and cultural adaptations.",
    icon: Globe,
    features: [
      "Content translation management",
      "RTL language support",
      "Region-specific customization",
      "Language detection",
    ],
  },
  {
    name: "Hosting & Maintenance ⚙️",
    description:
      "Reliable hosting and ongoing maintenance to ensure your website remains secure, up-to-date, and performing optimally.",
    icon: Server,
    features: ["Cloud hosting setup", "Regular backups", "Security updates", "Performance monitoring"],
  },
]

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <main className="container py-24">
          <div className="mx-auto max-w-[58rem] text-center mb-16">
            <h1 className="font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl">Our Services</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Comprehensive web development and design services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg border bg-background p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">{service.name}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-primary/5 p-8 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-muted-foreground">
                We offer tailored solutions to meet your specific business requirements. Contact us to discuss your
                project.
              </p>
            </div>
            <div className="flex justify-center">
              <Button size="lg">Get in Touch</Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
