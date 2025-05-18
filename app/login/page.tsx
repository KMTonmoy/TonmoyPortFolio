"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import Link from "next/link";

export default function Login() {
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
          Welcome Back
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Login to your account to continue.
        </p>
      </motion.div>

      <motion.div
        {...fadeIn}
        viewport={{ once: true }}
        className="bg-background border rounded-xl p-6 sm:p-8 shadow-sm max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
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
                Logging in... <Send className="ml-2 h-4 w-4 animate-pulse" />
              </>
            ) : isSubmitted ? (
              <>
                Success <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Login <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {isSubmitted && (
            <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-center">
              Login successful!
            </div>
          )}
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
