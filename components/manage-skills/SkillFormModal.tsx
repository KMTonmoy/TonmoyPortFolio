 
"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSave, FaSpinner } from "react-icons/fa";
import { SkillFormModalProps } from "@/types/skill.types";

export const SkillFormModal = ({
  open,
  onOpenChange,
  skill,
  onSubmit,
  isSubmitting,
}: SkillFormModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!skill;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name) return;

    onSubmit({ name, image });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your skill information" : "Add a new skill to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. React, Next.js, TypeScript"
                defaultValue={skill?.name || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Skill Image URL</Label>
              <Input
                id="image"
                name="image"
                placeholder="https://example.com/image.png"
                defaultValue={skill?.image || ""}
              />
              <p className="text-xs text-muted-foreground">Enter an image URL for your skill</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                  {isEdit ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4 mr-2" />
                  {isEdit ? "Update Skill" : "Add Skill"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};