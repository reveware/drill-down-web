'use client';
import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/api/constants';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { ModalProvider } from './ModalProvider';
import { ConfirmProvider } from './ConfirmProvider';
import { ChatSocketProvider } from './ChatSocketProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const tree = (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryProvider>
        <AuthProvider>
          <ChatSocketProvider>
            <ModalProvider>
              <ConfirmProvider>{children}</ConfirmProvider>
            </ModalProvider>
          </ChatSocketProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );

  // Google Identity re-runs initialize() on every mount of its provider
  // So it lives here rather than inside the SSO button, which renders in different pages
  return GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{tree}</GoogleOAuthProvider>
  ) : (
    tree
  );
};
