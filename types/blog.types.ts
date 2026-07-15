 
export interface Blog {
  _id: number;
  title: string;
  description: string;
  image: string;
  timestamp: string;
}

export interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onRead: (id: number) => void;
}

export interface BlogSkeletonProps {
  count?: number;
}

export interface BlogDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: Blog | null;
  onConfirm: () => void;
  isDeleting: boolean;
}

export interface BlogEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: Blog | null;
  onUpdate: (data: { title: string; description: string; image: string }) => void;
  isSubmitting: boolean;
}

export interface BlogHeaderProps {
  onWriteClick: () => void;
}

export interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface BlogStatsProps {
  total: number;
  showing: number;
}