// Provider/AuthProvider.tsx

"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import axios from "axios";
import { AuthContextType } from "@/types/auth.types";
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      router.push("/");
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      router.push("/");
      return result;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setIsRedirecting(true);
    
    try {
      // Check if running on Vercel
      const isVercel = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname.includes('tonmoy-pro.vercel.app'));
      
      if (isVercel) {
        // Use redirect on Vercel
        toast.info("Redirecting to Google...");
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Use popup locally
        try {
          const result = await signInWithPopup(auth, googleProvider);
          setUser(result.user);
          await saveUser(result.user);
          toast.success("Logged in with Google successfully!");
          router.push("/");
          return result;
        } catch (popupError: any) {
          if (popupError.code === 'auth/popup-blocked') {
            toast.info("Popup blocked! Redirecting to Google...");
            await signInWithRedirect(auth, googleProvider);
          } else {
            throw popupError;
          }
        }
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to login with Google");
      throw error;
    } finally {
      setLoading(false);
      setIsRedirecting(false);
    }
  };

  // Handle redirect result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          setUser(user);
          await saveUser(user);
          toast.success("Logged in with Google successfully!");
          router.push("/");
        }
      } catch (error: any) {
        console.error("Redirect result error:", error);
        toast.error(error.message || "Failed to login with Google");
      } finally {
        setIsRedirecting(false);
      }
    };

    handleRedirectResult();
  }, [router]);

  const logOut = async (): Promise<void> => {
    setLoading(true);
    const loadingToast = toast.loading("Logging out...");
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          withCredentials: true,
        }
      );
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!", {
        id: loadingToast,
      });
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed", {
        id: loadingToast,
        description: "Failed to logout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photo: string): Promise<void> => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        const updatedUser = auth.currentUser;
        setUser({
          ...updatedUser,
          displayName: name,
          photoURL: photo,
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const saveUser = async (user: User) => {
    try {
      const userEmail = user.email ?? "";
      
      const existingUserResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`
      );
      const existingUser = existingUserResponse.data;

      if (existingUser) {
        return existingUser;
      }

      const currentUser = {
        email: userEmail,
        name: user.displayName ?? "",
        photo: user.photoURL ?? "",
        role: "user",
        status: "active",
      };

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        currentUser
      );
      return data;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await saveUser(currentUser);
        } catch (error) {
          console.error("Error handling auth state change:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    saveUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;