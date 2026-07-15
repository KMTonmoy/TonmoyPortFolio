 
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { SkillSearchProps } from "@/types/skill.types";

export const SkillSearch = ({ searchTerm, onSearchChange }: SkillSearchProps) => {
  return (
    <div className="relative mb-6">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};