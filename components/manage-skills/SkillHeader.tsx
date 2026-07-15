 
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { SkillHeaderProps } from "@/types/skill.types";

export const SkillHeader = ({ onAddClick }: SkillHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Manage Skills</h1>
        <p className="text-muted-foreground">Add, edit, and manage your skills</p>
      </div>
      <Button onClick={onAddClick} className="gap-2">
        <FaPlus className="h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
};