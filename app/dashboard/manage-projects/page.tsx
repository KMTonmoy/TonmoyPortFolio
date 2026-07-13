'use client'

import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
import { 
  FaPlus, 
  FaTimes, 
  FaExternalLinkAlt, 
  FaTrash, 
  FaEdit,
  FaSearch,
  FaSave,
  FaSpinner
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const ManageProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [link, setLink] = useState('')

  // Delete confirmation states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://tonmoy-pro-backend.vercel.app/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setImage('')
    setTags([])
    setTagInput('')
    setLink('')
    setIsSubmitting(false)
  }

  const openAddModal = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditModal = (project: Project) => {
    setEditingId(project._id)
    setTitle(project.title)
    setDescription(project.description)
    setImage(project.image)
    setTags(project.tags)
    setLink(project.link)
    setTagInput('')
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (project: Project) => {
    setProjectToDelete(project)
    setDeleteConfirmName('')
    setDeleteDialogOpen(true)
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
    if (!title || !description || !image) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    const projectData = { title, description, image, tags, link }
    const loadingToast = toast.loading(editingId ? 'Updating project...' : 'Adding project...')

    try {
      if (editingId) {
        const res = await fetch(`https://tonmoy-pro-backend.vercel.app/projects/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
        if (!res.ok) throw new Error('Failed to update project')
        setProjects((prev) => prev.map((p) => (p._id === editingId ? { ...p, ...projectData } : p)))
        toast.success('Project updated successfully', { id: loadingToast })
      } else {
        const res = await fetch('https://tonmoy-pro-backend.vercel.app/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        })
        if (!res.ok) throw new Error('Failed to add project')
        const created = await res.json()
        setProjects((prev) => [...prev, { ...projectData, _id: created.insertedId }])
        toast.success('Project added successfully', { id: loadingToast })
      }
      resetForm()
      setIsDialogOpen(false)
    } catch {
      toast.error('Error saving project', { id: loadingToast })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!projectToDelete) return

    const loadingToast = toast.loading('Deleting project...')
    try {
      const res = await fetch(`https://tonmoy-pro-backend.vercel.app/projects/${projectToDelete._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete project')
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id))
      toast.success('Project deleted successfully', { id: loadingToast })
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
      setDeleteConfirmName('')
    } catch {
      toast.error('Error deleting project', { id: loadingToast })
    }
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const ProjectSkeleton = () => (
    <Card className="animate-pulse">
      <div className="h-48 bg-muted rounded-t-lg"></div>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-16"></div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <p className="text-muted-foreground">Create, edit, and manage your projects</p>
          </div>
          <Button onClick={openAddModal} className="gap-2">
            <FaPlus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openAddModal}
              className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl h-80 cursor-pointer hover:border-primary hover:bg-muted/30 transition-all group"
            >
              <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <FaPlus className="text-3xl text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-3 text-muted-foreground group-hover:text-primary font-medium transition-colors">
                Add New Project
              </p>
            </motion.div>

            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 opacity-90 hover:opacity-100"
                        onClick={() => openEditModal(project)}
                      >
                        <FaEdit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 opacity-90 hover:opacity-100"
                        onClick={() => openDeleteDialog(project)}
                      >
                        <FaTrash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Visit Site
                        <FaExternalLinkAlt className="h-3 w-3" />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update your project details' : 'Fill in the details to add a new project'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tags (press Enter or comma)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (tagInput) {
                      handleAddTag(tagInput)
                      setTagInput('')
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link (Optional)</Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                  {editingId ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4 mr-2" />
                  {editingId ? 'Update Project' : 'Add Project'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              &quot;{projectToDelete?.title}&quot; from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="confirm-name" className="text-sm font-medium">
              Type <span className="font-bold text-destructive">{projectToDelete?.title}</span> to confirm deletion
            </Label>
            <Input
              id="confirm-name"
              placeholder={`Type "${projectToDelete?.title}" to confirm`}
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              className="mt-2"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false)
              setProjectToDelete(null)
              setDeleteConfirmName('')
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={deleteConfirmName !== projectToDelete?.title}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ManageProjects