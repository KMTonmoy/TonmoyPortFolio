 import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce solution with integrated payment processing and inventory management. Built for a fashion retailer to enhance their online presence and streamline operations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Sanity CMS"],
    link: "#",
    client: "Fashion Boutique Inc.",
  },
  {
    title: "Corporate Website",
    description:
      "Modern corporate website with custom CMS integration, multilingual support, and interactive elements to showcase the company's global presence and services.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "i18n"],
    link: "#",
    client: "Global Consulting Group",
  },
  {
    title: "Mobile App UI",
    description:
      "User interface design for a fitness tracking mobile application with personalized workout plans, progress tracking, and social features to connect with other fitness enthusiasts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Figma", "UI/UX", "Prototyping", "User Testing"],
    link: "#",
    client: "FitTrack Technologies",
  },
  {
    title: "SaaS Dashboard",
    description:
      "Analytics dashboard for a SaaS product with real-time data visualization, customizable widgets, and comprehensive reporting tools for business intelligence.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "D3.js", "Firebase", "GraphQL"],
    link: "#",
    client: "DataMetrics ",
  },
  {
    title: "Educational Platform",
    description:
      "Interactive learning platform with course management, video streaming, quiz functionality, and progress tracking for students and educators.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Angular", "Express.js", "PostgreSQL", "WebRTC"],
    link: "#",
    client: "EduTech Innovations",
  },
  {
    title: "Restaurant Ordering System",
    description:
      "Online ordering system with table reservations, menu management, and integration with kitchen display systems for a seamless dining experience.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Node.js", "Redis", "Payment Gateway"],
    link: "#",
    client: "Gourmet Restaurant Chain",
  },
]

export default function ProjectsPage() {
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
            <h1 className="font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl">Our Projects</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Explore our portfolio of work across various industries and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-primary mb-2">Client: {project.client}</p>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Looking for a custom solution for your business? We'd love to help.
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

