"use client";

import "../../app/globals.css";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaSadTear, FaRocket } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { user, loading, logOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
  };

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground text-lg">Loading your kingdom...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show funny non-admin message
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-500/20 p-8 text-center"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="flex justify-center"
          >
            <div className="h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center">
              <FaLock className="h-12 w-12 text-red-400" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-3xl font-bold text-white mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🚫 Access Denied!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 space-y-3"
          >
            <p className="text-gray-300 text-lg">
              Oops! You're not an <span className="text-red-400 font-bold">Admin</span>.
            </p>
            <p className="text-gray-400 text-sm">
              This area is strictly for the <span className="text-primary font-semibold">Chosen Ones</span> 🦸‍♂️
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FaSadTear className="h-4 w-4" />
              <span>Looks like you don't have the secret decoder ring</span>
              <FaSadTear className="h-4 w-4" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-3"
          >
            <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20">
              <p className="text-xs text-gray-400">
                💡 Fun Fact: Even the best developers started as regular users. 
                You'll get there someday! 🚀
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full gap-2"
              >
                <FaShieldAlt className="h-4 w-4" />
                Go Back to Safety
              </Button>
              
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full gap-2"
              >
                <FaRocket className="h-4 w-4" />
                Explore Public Area
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              👀 Don't worry, we won't tell anyone you tried to sneak in...
              <span className="block text-red-400/50 text-[10px] mt-1">
                *logs activity in the secret admin watchlist* 📝
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900">
      <Sidebar />
      <main className="flex justify-center w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        <div className="w-full max-w-7xl px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}