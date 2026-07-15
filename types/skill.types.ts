 
export interface Skill {
  _id: string;
  name: string;
  image: string;
}

export interface SkillFormData {
  name: string;
  image: string;
}

export interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

export interface SkillGridProps {
  skills: Skill[];
  isLoading: boolean;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

export interface SkillSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface SkillHeaderProps {
  onAddClick: () => void;
}

export interface SkillFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill | null;
  onSubmit: (data: SkillFormData) => void;
  isSubmitting: boolean;
}

export interface SkillDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill | null;
  onConfirm: () => void;
}

export interface SkillSkeletonProps {
  count?: number;
}