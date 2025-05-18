import Link from "next/link";
import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Tonmoy</h2>
          <p className="text-sm text-muted-foreground">
            Delivering innovative digital solutions that elevate businesses globally.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ui-ux-design"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecommerce"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  E-Commerce
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/KMTonmoy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100088205996277"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tonmoy-ahamed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
             
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tonmoy. All rights reserved.{" "}
          <a
            href="https://Tonmoy.com"
            className="hover:underline hover:text-primary transition-colors"
          >
            Tonmoy
          </a>
        </p>
      </div>
    </footer>
  );
}
