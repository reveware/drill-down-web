'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TokenManager } from '@/lib/auth/token-manager';
import { AuthState, JWTPayload } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: JWTPayload) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: true,
  });

  const login = (token: string) => {
    TokenManager.setToken(token);
    const user = TokenManager.getUserFromToken();

    setAuthState({
      isAuthenticated: true,
      token,
      user,
      isLoading: false,
    });
  };

  const logout = () => {
    TokenManager.removeToken();
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
    });
  };

  const setUser = (user: JWTPayload) => {
    setAuthState((prev) => ({
      ...prev,
      user,
    }));
  };

  useEffect(() => {
    const initializeAuth = () => {
      const token = TokenManager.getToken();
      if (token && TokenManager.isTokenValid()) {
        login(token);
      } else {
        if (token) {
          TokenManager.removeToken();
        }
        setAuthState({
          isAuthenticated: false,
          token: null,
          user: null,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
