 import Footer from "@/components/footer"
import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    name: "Jane Cooper",
    company: "Tech Innovators Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    date: "March 15, 2023",
    review:
      "Tonmoy transformed our online presence completely. Their team took the time to understand our business needs and delivered a website that exceeded our expectations. The design is modern, user-friendly, and has significantly improved our conversion rates. Their attention to detail and technical expertise is unmatched.",
  },
  {
    name: "Robert Johnson",
    company: "Global Marketing ",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    date: "February 8, 2023",
    review:
      "Working with Tonmoy was a game-changer for our business. They redesigned our e-commerce platform, making it more intuitive and responsive. The checkout process is now seamless, and we've seen a 40% increase in sales since the launch. Their team was professional, responsive, and delivered the project on time and within budget.",
  },
  {
    name: "Emily Williams",
    company: "Startup Ventures",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    rating: 5,
    date: "January 22, 2023",
    review:
      "The team at Tonmoy understood our vision perfectly and brought it to life with stunning design and flawless functionality. As a startup, we needed a website that would make us stand out in a competitive market, and they delivered exactly that. Their ongoing support has been exceptional, and we couldn't be happier with the results.",
  },
  {
    name: "Michael Brown",
    company: "Educational Platforms Ltd.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    rating: 4,
    date: "December 5, 2022",
    review:
      "Tonmoy developed a custom learning management system for our educational platform that has transformed how we deliver content to our students. The interface is intuitive, and the backend is robust and scalable. They were responsive to our feedback throughout the development process and made adjustments quickly. The only reason for 4 stars instead of 5 is that we had a few minor delays, but the end result was worth it.",
  },
  {
    name: "Sarah Miller",
    company: "Healthcare ",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    rating: 5,
    date: "November 18, 2022",
    review:
      "We hired Tonmoy to develop a patient portal for our healthcare practice, and they delivered an exceptional product. The portal is secure, HIPAA-compliant, and user-friendly for both our staff and patients. Their team's expertise in healthcare software development was evident throughout the project, and they provided valuable insights that improved our initial concept.",
  },
  {
    name: "David Chen",
    company: "Retail Innovations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    date: "October 30, 2022",
    review:
      "Tonmoy redesigned our retail website and integrated it with our inventory management system, creating a seamless experience for both our customers and staff. The site is visually stunning and performs exceptionally well, even during high-traffic sales events. Their team was a pleasure to work with, and they continue to provide excellent support post-launch.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
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
            <h1 className="font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl">Client Reviews</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Don't just take our word for it. Here's what our clients have to say about working with Tonmoy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-background border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>

                <p className="text-muted-foreground">{review.review}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary/5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how Tonmoy can help transform your digital presence and drive results for your business.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-8 py-3 rounded-md font-medium hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

