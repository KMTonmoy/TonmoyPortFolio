"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarHeaderProps } from "@/types/sidebar.types";
import { FaShieldAlt, FaUser } from "react-icons/fa";

export const SidebarHeader = ({ user, isAdmin, getInitials }: SidebarHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 flex flex-col items-center bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <Avatar className="h-20 w-20 border-2 border-primary/30">
          <AvatarImage 
            src={user?.photoURL || ""} 
            alt={user?.displayName || "User"} 
          />
          <AvatarFallback className="text-2xl bg-primary/20 text-primary">
            {getInitials(user?.displayName)}
          </AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900" />
      </motion.div>
      
      <motion.p 
        className="mt-3 text-lg font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {user?.displayName || "User"}
      </motion.p>
      
      <motion.p 
        className="text-xs text-gray-400 truncate max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {user?.email}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Badge 
          className={`mt-2 flex items-center gap-1 ${isAdmin ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-gray-700 text-gray-300"}`}
        >
          {isAdmin ? <FaShieldAlt className="h-3 w-3" /> : <FaUser className="h-3 w-3" />}
          {isAdmin ? "Administrator" : "Member"}
        </Badge>
      </motion.div>
    </motion.div>
  );
};