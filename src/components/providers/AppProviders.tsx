'use client';
import { ReactNode } from 'react';
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
  return (
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
};
