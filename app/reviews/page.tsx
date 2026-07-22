"use client";

import Footer from "@/components/footer";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  _id?: string;
  id?: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  review: string;
  webShow: boolean;
  likes?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/showfeedback`
        );
        const data = await response.json();

        if (data.success) {
          setReviews(data.feedback);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-4xl leading-[1.1] sm:text-5xl md:text-6xl"
            >
              Client Reviews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-muted-foreground sm:text-lg"
            >
              Don't just take our word for it. Here's what our clients have to say
              about working with Tonmoy.
            </motion.p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
              <p className="mt-4 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id || review.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      {review.avatar ? (
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                          {review.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      {review.company && (
                        <p className="text-sm text-muted-foreground">
                          {review.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-muted-foreground">{review.review}</p>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 bg-primary/5 p-8 rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how Tonmoy can help transform your digital presence
              and drive results for your business.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-8 py-3 rounded-md font-medium hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </a>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}