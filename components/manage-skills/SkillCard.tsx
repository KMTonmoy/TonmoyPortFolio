 
"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  FaEdit, 
  FaTrash, 
  FaCode, 
  FaLaptopCode, 
  FaPalette, 
  FaRocket 
} from "react-icons/fa";
import { SkillCardProps } from "@/types/skill.types";

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getSkillIcon = (name: string): ReactElement => {
  const icons = [
    { keywords: ["react", "next", "javascript", "typescript"], icon: <FaLaptopCode /> },
    { keywords: ["css", "html", "tailwind", "bootstrap"], icon: <FaPalette /> },
    { keywords: ["node", "python", "java", "php"], icon: <FaCode /> },
  ];
  const lowerName = name.toLowerCase();
  for (const item of icons) {
    if (item.keywords.some((keyword) => lowerName.includes(keyword))) {
      return item.icon;
    }
  }
  return <FaRocket />;
};

export const SkillCard = ({ skill, onEdit, onDelete }: SkillCardProps) => {
  return (
    <motion.div
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
              onClick={() => onEdit(skill)}
              className="p-2 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
              aria-label={`Edit ${skill.name}`}
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(skill)}
              className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
              aria-label={`Delete ${skill.name}`}
            >
              <FaTrash size={16} />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};