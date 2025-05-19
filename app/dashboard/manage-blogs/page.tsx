'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrash, FaPlus } from 'react-icons/fa'
import Swal from 'sweetalert2'

interface Blog {
  _id: number
  title: string
  description: string
  image: string
  timestamp: string
}

const ManageBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const router = useRouter()

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:8000/editor-content')
      const data = await res.json()
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
    }
  }

  const deleteBlog = async (_id: number) => {
    console.log(_id)
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This blog will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8000/editor-content/${_id}`, {
          method: 'DELETE',
        })
        const response = await res.json()

        if (res.ok) {
          setBlogs((prev) => prev.filter((blog) => blog._id !== _id))
          Swal.fire('Deleted!', 'Blog deleted successfully.', 'success')
        } else {
          Swal.fire('Error!', response.error || 'Failed to delete blog.', 'error')
        }
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong while deleting.', 'error')
      }
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => router.push('/dashboard/write-blog')}
          className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-48 cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="text-center text-gray-600">
            <FaPlus className="text-2xl mx-auto mb-2" />
            <p>Add New Blog</p>
          </div>
        </div>

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <div
                className="text-gray-600 text-sm mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
              <button
                onClick={() => router.push(`/blogs/${blog._id}`)}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Read Now
              </button>
            </div>
            <button
              onClick={() => deleteBlog(blog._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Delete Blog"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageBlogs
