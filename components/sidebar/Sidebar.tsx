"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { isAdmin, loading } = useUserRole();
  const router = useRouter();

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

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await logOut();
      toast.success("Logged out successfully!", {
        id: loadingToast,
      });
      router.push("/login");
    } catch {
      toast.error("Logout failed", {
        id: loadingToast,
        description: "Failed to logout. Please try again.",
      });
    }
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex md:w-[280px] z-50 min-h-screen bg-gray-900 text-white">
        <div className="w-[280px] p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
            <p className="mt-2 text-sm text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:w-[280px] z-50 min-h-screen bg-gray-900 text-white">
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;