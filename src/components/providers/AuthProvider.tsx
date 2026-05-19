'use client';
import React, { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { TokenManager } from '@/lib/token-manager';
import { AuthState } from '@/types/auth';
import { UserApi } from '@/api/endpoints/user.api';
import { UserDetail } from '@/types/user';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: UserDetail) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    isOnboarded: false,
    isLoading: true,
  });

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await UserApi.getCurrentUser();
      setAuthState((prev) => ({
        ...prev,
        user: userData,
        isOnboarded: userData.is_onboarded,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      TokenManager.removeToken();
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        isOnboarded: false,
        isLoading: false,
      });
      router.push('/login');
    }
  }, [router]);

  const initializeAuth = useCallback(async () => {
    const token = TokenManager.getToken();

    if (!token || !TokenManager.isTokenValid()) {
      TokenManager.removeToken();
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        isOnboarded: false,
        isLoading: false,
      });
      router.push('/login');
      return;
    }

    setAuthState({
      isAuthenticated: true,
      token,
      user: null,
      isOnboarded: false,
      isLoading: true,
    });

    await fetchCurrentUser();
  }, [fetchCurrentUser, router]);

  const login = async (token: string) => {
    TokenManager.setToken(token);

    setAuthState({
      isAuthenticated: true,
      token,
      user: null,
      isOnboarded: false,
      isLoading: true,
    });

    await fetchCurrentUser();
  };

  const logout = () => {
    TokenManager.removeToken();
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      isOnboarded: false,
      isLoading: false,
    });
    router.push('/login');
  };

  const setUser = (user: UserDetail) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isOnboarded: user.is_onboarded,
      isLoading: false,
    }));
  };

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
