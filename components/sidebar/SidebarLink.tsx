 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { SidebarLinkProps } from "@/types/sidebar.types";

export const SidebarLink = ({ link, isExpanded, onToggle, depth = 0 }: SidebarLinkProps) => {
  const pathname = usePathname();
  const hasSubLinks = link.subLinks && link.subLinks.length > 0;
  const isActive = pathname === link.path || pathname?.startsWith(link.path + "/");

  const LinkContent = () => (
    <div className={`flex items-center w-full ${depth > 0 ? 'pl-8' : ''}`}>
      <span className={`${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'} transition-colors`}>
        {link.icon}
      </span>
      <span className="ml-3 flex-1 text-sm font-medium">{link.name}</span>
      {link.badge && (
        <Badge variant="default" className="ml-2 text-[10px] px-1.5 py-0 bg-primary/20 text-primary">
          {link.badge}
        </Badge>
      )}
      {hasSubLinks && (
        <span className="ml-2">
          {isExpanded ? (
            <FaChevronDown className="h-3 w-3 text-gray-400" />
          ) : (
            <FaChevronRight className="h-3 w-3 text-gray-400" />
          )}
        </span>
      )}
    </div>
  );

  if (hasSubLinks) {
    return (
      <div className="mb-1">
        <button
          onClick={onToggle}
          className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
          }`}
        >
          <LinkContent />
        </button>
        <AnimatePresence>
          {isExpanded && link.subLinks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 overflow-hidden"
            >
              {link.subLinks.map((subLink) => (
                <SidebarLink
                  key={subLink.path}
                  link={subLink}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={link.path}>
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
        }`}
      >
        <LinkContent />
      </motion.div>
    </Link>
  );
};