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
  const router = useRouter();

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      await saveUser(result.user);
      toast.success("Account created successfully!");
      router.push("/");
      return result;
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already in use. Please login.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error(error.message || "Failed to create account");
      }
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
      await saveUser(result.user);
      toast.success("Logged in successfully!");
      router.push("/");
      return result;
    } catch (error: any) {
      console.error("Error signing in:", error);
      if (error.code === 'auth/user-not-found') {
        toast.error("No account found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Invalid password.");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many failed attempts. Please try again later.");
      } else {
        toast.error(error.message || "Failed to login");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Set custom parameters for better popup handling
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await saveUser(result.user);
      toast.success("Logged in with Google successfully!");
      router.push("/");
      return result;
    } catch (error: any) {
      console.error("Google login error:", error);
      
      if (error.code === 'auth/popup-blocked') {
        toast.error("Popup blocked! Please allow popups for this site and try again.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.info("Login cancelled. Please try again.");
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error("Domain not authorized. Please check Firebase settings.");
      } else {
        toast.error(error.message || "Failed to login with Google");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

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