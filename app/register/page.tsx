"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 2000);
  };

  return (
    <section className="container py-16 sm:py-20 md:py-24 lg:py-32">
      <motion.div
        {...fadeIn}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center mb-12 md:mb-16"
      >
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
          Create an Account
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Sign up to get started with your journey.
        </p>
      </motion.div>

      <motion.div
        {...fadeIn}
        viewport={{ once: true }}
        className="bg-background border rounded-xl p-6 sm:p-8 shadow-sm max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? (
              <>
                Creating... <Send className="ml-2 h-4 w-4 animate-pulse" />
              </>
            ) : isSubmitted ? (
              <>
                Success <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Sign Up <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {isSubmitted && (
            <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-center">
              Account created successfully!
            </div>
          )}
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
