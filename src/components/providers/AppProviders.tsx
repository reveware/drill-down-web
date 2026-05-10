'use client';
import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { ModalProvider } from './ModalProvider';
import { ChatSocketProvider } from './ChatSocketProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryProvider>
        <AuthProvider>
          <ChatSocketProvider>
            <ModalProvider>{children}</ModalProvider>
          </ChatSocketProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
