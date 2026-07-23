 
"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarSkeleton } from "@/components/skeleton/SidebarSkeleton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { isAdmin, loading } = useUserRole();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <SidebarSkeleton />;
  }

  return (
    <div className="flex md:w-[280px] z-40 min-h-screen bg-gray-900 text-white">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-3 text-xl focus:outline-none fixed top-4 left-4 z-50 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed lg:static bg-gray-900 w-[280px] h-full transition-shadow ${
              isOpen ? "shadow-2xl" : ""
            } lg:shadow-none overflow-y-auto overflow-x-hidden`}
          >
            <SidebarHeader user={user} isAdmin={isAdmin} getInitials={getInitials} />
            <SidebarNav isAdmin={isAdmin} />
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && window.innerWidth < 1024 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;