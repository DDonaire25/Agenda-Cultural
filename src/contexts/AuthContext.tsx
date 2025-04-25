import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_STATE: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  isInitialized: false
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  // Initialize auth state
  useEffect(() => {
    const initialize = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          isLoading: false,
          isInitialized: true
        }));
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          isInitialized: true
        }));
      }
    };

    initialize();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error: error as Error | null };
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error: error as Error | null };
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await supabase.auth.signOut();
      setState(prev => ({
        ...prev,
        session: null,
        user: null
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data: { session } } = await supabase.auth.refreshSession();
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Auto refresh session before expiry
  useEffect(() => {
    if (!state.session) return;

    const expiresAt = state.session.expires_at;
    if (!expiresAt) return;

    const timeUntilExpiry = (expiresAt - Date.now() / 1000) * 1000;
    const refreshBuffer = 5 * 60 * 1000; // 5 minutes
    const refreshTime = Math.max(0, timeUntilExpiry - refreshBuffer);

    const refreshTimer = setTimeout(refreshSession, refreshTime);
    return () => clearTimeout(refreshTimer);
  }, [state.session, refreshSession]);

  const contextValue = useMemo(
    () => ({
      ...state,
      signIn,
      signUp,
      signOut,
      refreshSession
    }),
    [state, signIn, signUp, signOut, refreshSession]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}