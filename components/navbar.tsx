"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Tonmoy </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/projects" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/services"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/services" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Services
          </Link>
          <Link
            href="/reviews"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/reviews" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Reviews
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/about" ? "text-[#6397ff] underline" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/blogs"
            className={`transition-colors hover:text-[#6397ff] ${
              pathName === "/blogs" ? "text-[#6397ff] underline" : ""
            }`}
          >
            Blogs
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="gradient" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/40">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/projects" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/services"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/services" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/reviews"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/reviews" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/about" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blogs"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/blogs" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-[#6397ff] ${
                  pathName === "/contact" ? "text-[#6397ff] underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
