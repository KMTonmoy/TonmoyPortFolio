"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="container max-w-screen-2xl py-12 md:py-20 px-4 md:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            Hey, I'm Tonmoy
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
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Background gradient element */}
            <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-70"></div>
            
            {/* Border and shadow container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="https://res.cloudinary.com/dgwknm4yi/image/upload/v1758275707/wmremove-transformed-Picsart-AiImageEnhance_epxzfm.jpg"
                alt="Tonmoy Banner"
                width={600}
                height={600}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}