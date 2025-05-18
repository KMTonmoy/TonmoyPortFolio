'use client'

import React, { useState, useEffect } from 'react'

interface Blog {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const blogData: Blog[] = [
  {
    id: 1,
    title: "How to Learn React Effectively in 2025",
    description: "React is one of the most popular JavaScript libraries. This blog covers practical tips and best practices to master React development quickly.",
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures with Examples",
    description: "Closures are a fundamental concept in JavaScript. Learn how they work and how to use them effectively in your projects.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which Layout",
    description: "Both CSS Grid and Flexbox are powerful layout systems. Discover the key differences and use cases to make your layouts responsive and flexible.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "Mastering TypeScript for React Developers",
    description: "TypeScript can supercharge your React code. This article explores types, interfaces, and common patterns for better code quality.",
    image: "https://images.unsplash.com/photo-1523475496153-3e4ce94f1c13?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    description: "Accessibility is essential for everyone. Learn the best practices to make your web apps usable for people with disabilities.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 6,
    title: "Top 10 VSCode Extensions for Web Developers",
    description: "Enhance your productivity with these must-have VSCode extensions for HTML, CSS, JavaScript, and React development.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 7,
    title: "Web Performance Optimization Tips",
    description: "Speed matters! Discover how to improve loading times and performance using best practices and modern web tools.",
    image: "https://images.unsplash.com/photo-1581090700227-1e8d153b4b1b?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 8,
    title: "What’s New in ES2025 for JavaScript Developers",
    description: "Stay updated with the latest JavaScript features. Explore what ES2025 has to offer and how to use them today.",
    image: "https://images.unsplash.com/photo-1523475496153-3e4ce94f1c13?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 9,
    title: "Getting Started with Node.js and Express",
    description: "Node.js is great for backend development. Learn how to create a simple server using Express with real examples.",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 10,
    title: "MongoDB Best Practices for Beginners",
    description: "This blog introduces you to MongoDB concepts, performance tips, and things to avoid when starting with NoSQL.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 11,
    title: "Next.js: A Beginner’s Guide to Server-Side React",
    description: "Next.js makes building SEO-friendly React apps easy. Start from zero and create a full-stack app with ease.",
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 12,
    title: "Tailwind CSS: Utility First Framework Explained",
    description: "Tailwind CSS is changing how we write styles. Learn the philosophy, pros, and real-world usage of this framework.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
]

const shuffleArray = (arr: Blog[]): Blog[] => [...arr].sort(() => Math.random() - 0.5)

const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text

const Blogs: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [shuffledBlogs, setShuffledBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const shuffled = shuffleArray(blogData)
    setShuffledBlogs(shuffled)
  }, [])

  const visibleBlogs = shuffledBlogs.slice(0, visibleCount)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleBlogs.map(({ id, title, description, image, link }) => (
          <div
            key={id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {truncateText(title, 40)}
              </h3>
              <p className="text-gray-600 mb-4">
                {truncateText(description, 100)}
              </p>
              <a
                href={link}
                className="text-blue-600 hover:underline font-medium"
              >
                Read Blog
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        {visibleCount < blogData.length ? (
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            See More
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(6)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  )
}

export default Blogs
