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
    isLoading: true,
  });

  const fetchUserData = useCallback(
    async (userId: string) => {
      try {
        const userData = await UserApi.getUser(userId);
        setAuthState((prev) => ({
          ...prev,
          user: userData,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        TokenManager.removeToken();
        setAuthState({
          isAuthenticated: false,
          token: null,
          user: null,
          isLoading: false,
        });
        router.push('/login');
      }
    },
    [router]
  );

  const initializeAuth = useCallback(async () => {
    const token = TokenManager.getToken();

    if (!token || !TokenManager.isTokenValid()) {
      TokenManager.removeToken();
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      });
      router.push('/login');
      return;
    }

    const jwtUser = TokenManager.getUserFromToken();
    if (!jwtUser) {
      TokenManager.removeToken();
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      });
      router.push('/login');
      return;
    }

    setAuthState({
      isAuthenticated: true,
      token,
      user: null,
      isLoading: true,
    });

    await fetchUserData(jwtUser.user.id);
  }, [fetchUserData, router]);

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
    router.push('/login');
  };

  const setUser = (user: UserDetail) => {
    setAuthState((prev) => ({
      ...prev,
      user,
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
