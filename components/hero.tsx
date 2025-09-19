"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
// import myImage from "../public/myimage.jpg";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="container max-w-screen-2xl py-20 px-4 md:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            Hey, I’m Tonmoy
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              <Typewriter
                words={["Web Developer", "Creative Coder", "UI/UX Enthusiast"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
            I build modern, scalable, and beautiful web experiences tailored to
            your goals.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button size="lg" className="shadow-lg" asChild>
              <a href="/myresume.pdf" download>
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" className="shadow-lg" asChild>
              <Link
                href="https://drive.google.com/file/d/1Ez3x8Kugc3LqakxptVCvg9QCCRU9k7kT/view?usp=sharing"
                target="_blank"
              >
                View Resume
              </Link>
            </Button>
          </div>

          {/* Socials */}
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="https://www.facebook.com/profile.php?id=100088205996277"
              target="_blank"
              className="p-3 rounded-full border shadow-md hover:bg-blue-100 transition-all"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://github.com/KMTonmoy"
              target="_blank"
              className="p-3 rounded-full border shadow-md hover:bg-gray-100 transition-all"
            >
              <FaGithub size={20} />
            </Link>
            
            <Link
              href="https://www.linkedin.com/in/tonmoy-ahamed"
              target="_blank"
              className="p-3 rounded-full border shadow-md hover:bg-blue-50 transition-all"
            >
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-blue-500/10 to-transparent rounded-xl"></div>
          <Image
            src="https://i.ibb.co.com/gZQFQg7C/wmremove-transformed-Picsart-Ai-Image-Enhancer.png"
 
             alt="Tonmoy Banner"
            width={800}
            height={600}
            className="rounded-xl shadow-2xl border border-white/10 object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
