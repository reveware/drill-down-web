'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TokenManager } from '@/lib/token-manager';
import { AuthState } from '@/types/auth';
import { userApi } from '@/api/endpoints/user.api';
import { UserDetail } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: UserDetail) => void;
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

  const fetchUserData = async (userId: string) => {
    try {
      const userData = await userApi.getUser(userId);
      setAuthState((prev) => ({
        ...prev,
        user: userData,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const login = async (token: string) => {
    TokenManager.setToken(token);
    const jwtUser = TokenManager.getUserFromToken();

    if (!jwtUser) {
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      });
      return;
    }

    setAuthState({
      isAuthenticated: true,
      token,
      user: null,
      isLoading: true,
    });

    await fetchUserData(jwtUser.user.id);
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

  const setUser = (user: UserDetail) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isLoading: false,
    }));
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = TokenManager.getToken();
      if (token && TokenManager.isTokenValid()) {
        const jwtUser = TokenManager.getUserFromToken();
        if (!jwtUser) {
          setAuthState({
            isAuthenticated: false,
            token: null,
            user: null,
            isLoading: false,
          });
          return;
        }

        setAuthState({
          isAuthenticated: true,
          token,
          user: null,
          isLoading: true,
        });

        await fetchUserData(jwtUser.user.id);
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
