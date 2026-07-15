"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, 
  FaSearch,
  FaSave,
  FaSpinner,
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaRocket,
  FaTrash,
  FaEdit,
  FaUpload,
  FaTimes,
  FaImage
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { imageUpload } from "@/api/utils";
 
interface Skill {
  _id: string;
  name: string;
  image: string;
}

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: "", image: "" });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Delete confirmation states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  
  // Image upload states
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const addImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills`);
      setSkills(res.data);
    } catch {
      toast.error("Failed to fetch skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name) {
      toast.error("Please enter skill name");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Adding skill...");
    
    try {
      let imageUrl = newSkill.image;
      
      // If an image file is selected, upload it
      if (addImageFile) {
        try {
          imageUrl = await imageUpload(addImageFile);
        } catch (error) {
          toast.error("Failed to upload image", { id: loadingToast });
          setIsSubmitting(false);
          return;
        }
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
        name: newSkill.name,
        image: imageUrl,
      });
      
      setNewSkill({ name: "", image: "" });
      setAddImageFile(null);
      if (addImageInputRef.current) addImageInputRef.current.value = "";
      setAddModalOpen(false);
      fetchSkills();
      toast.success("Skill added successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to add skill", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSkill = async () => {
    if (!editingSkill) return;
    if (!editingSkill.name) {
      toast.error("Please enter skill name");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating skill...");
    
    try {
      let imageUrl = editingSkill.image;
      
      // If an image file is selected, upload it
      if (editImageFile) {
        try {
          imageUrl = await imageUpload(editImageFile);
        } catch (error) {
          toast.error("Failed to upload image", { id: loadingToast });
          setIsSubmitting(false);
          return;
        }
      }

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${editingSkill._id}`, {
        name: editingSkill.name,
        image: imageUrl,
      });
      
      setEditingSkill(null);
      setEditImageFile(null);
      if (editImageInputRef.current) editImageInputRef.current.value = "";
      setEditModalOpen(false);
      fetchSkills();
      toast.success("Skill updated successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to update skill", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!skillToDelete) return;
    
    const loadingToast = toast.loading("Deleting skill...");
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/skills/${skillToDelete._id}`);
      fetchSkills();
      toast.success("Skill deleted successfully", { id: loadingToast });
      setDeleteDialogOpen(false);
      setSkillToDelete(null);
      setDeleteConfirmName("");
    } catch {
      toast.error("Failed to delete skill", { id: loadingToast });
    }
  };

  const openDeleteDialog = (skill: Skill) => {
    setSkillToDelete(skill);
    setDeleteConfirmName("");
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSkillIcon = (name: string) => {
    const icons = [
      { keywords: ["react", "next", "javascript", "typescript"], icon: <FaLaptopCode /> },
      { keywords: ["css", "html", "tailwind", "bootstrap"], icon: <FaPalette /> },
      { keywords: ["node", "python", "java", "php"], icon: <FaCode /> },
    ];
    const lowerName = name.toLowerCase();
    for (const item of icons) {
      if (item.keywords.some(keyword => lowerName.includes(keyword))) {
        return item.icon;
      }
    }
    return <FaRocket />;
  };

  const SkillSkeleton = () => (
    <Card className="animate-pulse">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="h-28 w-28 rounded-full bg-muted"></div>
        <div className="h-6 w-24 bg-muted rounded mt-4"></div>
        <div className="flex gap-4 mt-3">
          <div className="h-8 w-8 bg-muted rounded"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Skills</h1>
            <p className="text-muted-foreground">Add, edit, and manage your skills</p>
          </div>
          <Button onClick={() => setAddModalOpen(true)} className="gap-2">
            <FaPlus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>

        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkillSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {filteredSkills.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No skills found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group overflow-hidden border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative">
                          <Avatar className="h-28 w-28 border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                            <AvatarImage src={skill.image} alt={skill.name} />
                            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                              {getInitials(skill.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {getSkillIcon(skill.name)}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mt-4">{skill.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          Skill
                        </Badge>
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setEditImageFile(null);
                              if (editImageInputRef.current) editImageInputRef.current.value = "";
                              setEditModalOpen(true);
                            }}
                            className="p-2 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                            aria-label={`Edit ${skill.name}`}
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteDialog(skill)}
                            className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
                            aria-label={`Delete ${skill.name}`}
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Add Skill Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              Add a new skill to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skill-name">Skill Name *</Label>
              <Input
                id="skill-name"
                placeholder="e.g. React, Next.js, TypeScript"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-image">Skill Image</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="skill-image"
                  type="file"
                  accept="image/*"
                  ref={addImageInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAddImageFile(file);
                      setNewSkill({ ...newSkill, image: URL.createObjectURL(file) });
                    }
                  }}
                  className="flex-1"
                />
                {newSkill.image && (
                  <div className="h-12 w-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                    <img src={newSkill.image} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload an image for your skill (PNG, JPG, SVG)</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setAddModalOpen(false);
              setNewSkill({ name: "", image: "" });
              setAddImageFile(null);
              if (addImageInputRef.current) addImageInputRef.current.value = "";
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4 mr-2" />
                  Add Skill
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Skill Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
        setEditModalOpen(open);
        if (!open) setEditingSkill(null);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Update your skill information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-skill-name">Skill Name *</Label>
              <Input
                id="edit-skill-name"
                placeholder="Skill Name"
                value={editingSkill?.name || ""}
                onChange={(e) =>
                  setEditingSkill((prev) => (prev ? { ...prev, name: e.target.value } : null))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-skill-image">Skill Image</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="edit-skill-image"
                  type="file"
                  accept="image/*"
                  ref={editImageInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditImageFile(file);
                      setEditingSkill((prev) => 
                        prev ? { ...prev, image: URL.createObjectURL(file) } : null
                      );
                    }
                  }}
                  className="flex-1"
                />
                {editingSkill?.image && (
                  <div className="h-12 w-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                    <img src={editingSkill.image} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload a new image to replace the current one</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditModalOpen(false);
              setEditingSkill(null);
              setEditImageFile(null);
              if (editImageInputRef.current) editImageInputRef.current.value = "";
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSkill} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4 mr-2" />
                  Update Skill
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
              This action cannot be undone. This will permanently delete the skill
              &quot;{skillToDelete?.name}&quot; from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="confirm-name" className="text-sm font-medium">
              Type <span className="font-bold text-destructive">{skillToDelete?.name}</span> to confirm deletion
            </Label>
            <Input
              id="confirm-name"
              placeholder={`Type "${skillToDelete?.name}" to confirm`}
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              className="mt-2"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false);
              setSkillToDelete(null);
              setDeleteConfirmName("");
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSkill}
              disabled={deleteConfirmName !== skillToDelete?.name}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Skill
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SkillsPage;