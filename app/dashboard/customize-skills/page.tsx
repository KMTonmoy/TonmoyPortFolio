 
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Skill, SkillFormData } from "@/types/skill.types";
import { SkillHeader } from "@/components/manage-skills/SkillHeader";
import { SkillSearch } from "@/components/manage-skills/SkillSearch";
import { SkillSkeleton } from "@/components/skeleton/SkillSkeleton";
import { SkillCard } from "@/components/manage-skills/SkillCard";
import { SkillFormModal } from "@/components/manage-skills/SkillFormModal";
import { SkillDeleteDialog } from "@/components/manage-skills/SkillDeleteDialog";

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills`);
      setSkills(res.data);
    } catch {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (data: SkillFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Adding skill...");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/skills`, data);
      setIsAddModalOpen(false);
      fetchSkills();
      toast.success("Skill added successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to add skill", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSkill = async (data: SkillFormData) => {
    if (!editingSkill) return;
    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating skill...");
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/skills/${editingSkill._id}`,
        data
      );
      setIsEditModalOpen(false);
      setEditingSkill(null);
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
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/skills/${skillToDelete._id}`
      );
      setDeleteDialogOpen(false);
      setSkillToDelete(null);
      fetchSkills();
      toast.success("Skill deleted successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to delete skill", { id: loadingToast });
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SkillHeader onAddClick={() => setIsAddModalOpen(true)} />
        <SkillSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <SkillSkeleton count={8} />
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No skills found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                onEdit={(skill) => {
                  setEditingSkill(skill);
                  setIsEditModalOpen(true);
                }}
                onDelete={(skill) => {
                  setSkillToDelete(skill);
                  setDeleteDialogOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Skill Modal */}
      <SkillFormModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddSkill}
        isSubmitting={isSubmitting}
      />

      {/* Edit Skill Modal */}
      <SkillFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        skill={editingSkill}
        onSubmit={handleUpdateSkill}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <SkillDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        skill={skillToDelete}
        onConfirm={handleDeleteSkill}
      />
    </div>
  );
};

export default SkillsPage;