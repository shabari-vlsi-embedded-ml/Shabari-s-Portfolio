'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from './supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  isSupabaseAuth: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = 'animated_portfolio_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupabaseAuth, setIsSupabaseAuth] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      setIsSupabaseAuth(true);
      // Check Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email ?? null);
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email ?? null);
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local demo session check
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const session = JSON.parse(stored);
          setIsAuthenticated(true);
          setUserEmail(session.email || 'admin@portfolio.local');
        }
      } catch {
        // Ignore JSON error
      }
      setIsLoading(false);
    }
  }, []);

  const loginWithPassword = async (email: string, password: string): Promise<{ error?: string }> => {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: error.message };
      }
      setIsAuthenticated(true);
      setUserEmail(data.user.email ?? email);
      return {};
    } else {
      // Demo / Local Auth Mode
      if (password.length >= 4) {
        const session = { email, loggedInAt: new Date().toISOString() };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
        setIsAuthenticated(true);
        setUserEmail(email);
        return {};
      } else {
        return { error: 'Password must be at least 4 characters in local mode.' };
      }
    }
  };

  const loginAsDemo = () => {
    const session = { email: 'owner@portfolio.dev', loggedInAt: new Date().toISOString() };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setUserEmail('owner@portfolio.dev');
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        isLoading,
        isSupabaseAuth,
        loginWithPassword,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
