'use client'

import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
import { FaPlus, FaTimes, FaExternalLinkAlt, FaTrash, FaEdit } from 'react-icons/fa'

interface Project {
  _id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)

  // form states
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error)
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setImage('')
    setTags([])
    setTagInput('')
    setLink('')
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (project: Project) => {
    setEditingId(project._id)
    setTitle(project.title)
    setDescription(project.description)
    setImage(project.image)
    setTags(project.tags)
    setLink(project.link)
    setTagInput('')
    setShowModal(true)
  }

  const handleAddTag = (value: string) => {
    const trimmed = value.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
    }
  }

  const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (tagInput) {
        handleAddTag(tagInput)
        setTagInput('')
      }
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSaveProject = async () => {
    if (!title || !description || !image) return alert('Fill title, description and image URL')

    const projectData = { title, description, image, tags, link }

    try {
      if (editingId) {
        // update
        const res = await fetch(`http://localhost:8000/projects/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
        if (!res.ok) return alert('Failed to update project')

        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? { ...p, ...projectData } : p))
        )
      } else {
        // add
        const res = await fetch('http://localhost:8000/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
        if (!res.ok) return alert('Failed to add project')

        const created = await res.json()
        setProjects((prev) => [...prev, { ...projectData, _id: created.insertedId }])
      }
      resetForm()
      setShowModal(false)
    } catch {
      alert('Error saving project')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`http://localhost:8000/projects/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) return alert('Failed to delete project')

      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch {
      alert('Error deleting project')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Manage Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          onClick={openAddModal}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-48 cursor-pointer hover:bg-gray-100 transition"
          title="Add New Project"
        >
          <FaPlus className="text-3xl text-gray-600 mb-2" />
          <p className="text-gray-600 font-medium">Add New Project</p>
        </div>

     {projects.map((project) => (
  <div
    key={project._id}
    className="flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 min-w-[280px]"
  >
    <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
        {project.title}
        <span className="space-x-2 text-gray-600">
          <button
            onClick={() => openEditModal(project)}
            title="Edit project"
            className="hover:text-blue-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteProject(project._id)}
            title="Delete project"
            className="hover:text-red-600"
          >
            <FaTrash />
          </button>
        </span>
      </h3>
      <p className="text-gray-600 flex-grow line-clamp-3">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          Visit Site <FaExternalLinkAlt className="ml-1" />
        </a>
      )}
    </div>
  </div>
))}

      </div>

      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-gray-100 rounded-lg shadow-lg max-w-md w-full p-6 relative text-black transform transition-transform scale-100">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-4">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>

              <input
                type="text"
                placeholder="Title"
                className="w-full mb-3 px-3 py-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full mb-3 px-3 py-2 border rounded resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="url"
                placeholder="Image URL"
                className="w-full mb-3 px-3 py-2 border rounded"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <div>
                <input
                  type="text"
                  placeholder="Add tags and press Enter or comma"
                  className="w-full mb-1 px-3 py-2 border rounded"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                />
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded flex items-center space-x-1"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        type="button"
                        className="text-blue-800 hover:text-blue-900"
                        aria-label={`Remove tag ${tag}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <input
                type="url"
                placeholder="Project Link (optional)"
                className="w-full mb-3 mt-3 px-3 py-2 border rounded"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <button
                onClick={handleSaveProject}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ManageProjects
