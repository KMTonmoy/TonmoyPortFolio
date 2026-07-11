import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { ToastContainer } from "react-toastify"
import Navbar from "@/components/navbar"
import AuthProvider from "@/Provider/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tonmoy  - Web Development & Design Portfolio",
  description:
    "Tonmoy creates exceptional digital experiences that drive results. Explore our portfolio of web development, UI/UX design, and full-stack .",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ToastContainer/>
        <MouseMoveEffect />
        <AuthProvider> 
                  <Navbar/>

        {children}
        </AuthProvider>

      </body>
    </html>
  )
}