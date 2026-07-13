 
export interface User {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked' | 'pending';
  createdAt: number;
  lastLogin: number;
}

export interface UserTableSkeletonProps {
  rows?: number;
}

export interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onMakeAdmin: (userId: string) => void;
  onRemoveAdmin: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export interface UserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onMakeAdmin: (userId: string) => void;
  onRemoveAdmin: (userId: string) => void;
}

export interface UserSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalUsers: number;
}

export interface UserHeaderProps {
  onRefresh: () => void;
}

export interface UserAvatarProps {
  name: string;
  photo?: string;
}

export interface UserBadgeProps {
  status: string;
  role: string;
}