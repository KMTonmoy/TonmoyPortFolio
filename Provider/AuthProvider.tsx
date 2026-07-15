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
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      router.push("/");
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        withCredentials: true,
      });
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
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
      const existingUserResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.email}`
      );
      const existingUser = existingUserResponse.data;

      if (existingUser) {
        return existingUser;
      }

      const currentUser = {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
        role: "user",
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
        setTimeout(async () => {
          try {
            await saveUser(currentUser);
          } catch (error) {
            console.error("Error handling auth state change:", error);
          }
        }, 5000);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    saveUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;