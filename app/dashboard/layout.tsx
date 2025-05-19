"use client";

import Sidebar from "@/components/sidebar";
import "../../app/globals.css";
import { ReactNode, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      if (email === "tonmoyahamed2009@gmail.com" && password === "admintonmoy") {
        setIsAuthenticated(true);
        setIsSubmitted(true);
      } else {
        setError("Invalid credentials");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  if (!isAuthenticated) {
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            {isSubmitted && (
              <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-center">
                Login successful!
              </div>
            )}
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex justify-center w-full">{children}</main>
    </div>
  );
}
