'use client'

import React, { useState, useEffect } from 'react'

interface Blog {
  _id: number
  title: string
  description: string
  image: string
}

const shuffleArray = (arr: Blog[]): Blog[] => [...arr].sort(() => Math.random() - 0.5)

const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text

const Blogs: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [shuffledBlogs, setShuffledBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch('https://tonmoy-portfolio-back-end.vercel.app/editor-content/') 
      .then((res) => res.json())
      .then((data: Blog[]) => {
        const shuffled = shuffleArray(data)
        setShuffledBlogs(shuffled)
      })
      .catch((err) => console.error('Failed to load blogs:', err))
  }, [])

  const visibleBlogs = shuffledBlogs.slice(0, visibleCount)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleBlogs.map(({ _id, title, description, image }) => (
          <div
            key={_id}
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
                href={`/blogs/${_id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Read Blog
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Show buttons only if there are more than 6 blogs */}
      {shuffledBlogs.length > 6 && (
        <div className="mt-8 text-center">
          {visibleCount < shuffledBlogs.length ? (
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
      )}
    </div>
  )
}

export default Blogs
