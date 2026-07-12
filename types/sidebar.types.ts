 
import { ReactElement } from "react";
import { User } from "firebase/auth";

export interface NavLink {
  name: string;
  icon: ReactElement;
  path: string;
  badge?: string;
  subLinks?: NavLink[];
}

export interface SidebarLinkProps {
  link: NavLink;
  isExpanded?: boolean;
  onToggle?: () => void;
  depth?: number;
}

export interface SidebarHeaderProps {
  user: User | null;
  isAdmin: boolean;
  getInitials: (name: string | null | undefined) => string;
}

export interface SidebarFooterProps {
  onLogout: () => void;
}

export interface SidebarNavProps {
  isAdmin: boolean;
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}