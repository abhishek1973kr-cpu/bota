"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface AuthUserState {
  uid: string;
  phoneNumber?: string | null;
  email?: string | null;
  displayName?: string | null;
}

interface AuthContextType {
  user: AuthUserState | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginUser: (userData: AuthUserState) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 1. First check localStorage for persisted user
    try {
      const savedUser = localStorage.getItem("royal_botanica_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore localStorage errors
    }

    // 2. Listen to Firebase auth changes (if configured)
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
        if (firebaseUser) {
          const userData: AuthUserState = {
            uid: firebaseUser.uid,
            phoneNumber: firebaseUser.phoneNumber,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          };
          setUser(userData);
          localStorage.setItem("royal_botanica_user", JSON.stringify(userData));
        }
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const loginUser = (userData: AuthUserState) => {
    setUser(userData);
    try {
      localStorage.setItem("royal_botanica_user", JSON.stringify(userData));
    } catch {
      // ignore
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    try {
      localStorage.removeItem("royal_botanica_user");
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
