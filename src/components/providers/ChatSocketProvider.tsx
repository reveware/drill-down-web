'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ChatWebSocketService } from '@/features/chat/services/chat-websocket.service';
import { ConnectionStatus } from '@/types/chat';
import { useAuth } from '@/hooks/useAuth';

interface ChatSocketContextValue {
  service: ChatWebSocketService | null;
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
}

const ChatSocketContext = createContext<ChatSocketContextValue | undefined>(undefined);

export const ChatSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const serviceRef = useRef<ChatWebSocketService | null>(null);

  useEffect(() => {
    if (!user) return;

    serviceRef.current = ChatWebSocketService.getInstance(token || undefined);

    serviceRef.current.onConnectionChange(setConnectionStatus);
    serviceRef.current.connect().catch((e) => {
      console.error('ChatSocketProvider: Failed to connect to chat', e);
    });

    return () => {
      // Listeners are owned and cleaned up by the hooks that registered them.
      serviceRef.current?.disconnect();
      serviceRef.current = null;
      setConnectionStatus('disconnected');
    };
  }, [user, token]);

  const value = useMemo(
    () => ({
      service: serviceRef.current,
      connectionStatus,
      isConnected: connectionStatus === 'connected',
    }),
    [connectionStatus]
  );

  return <ChatSocketContext.Provider value={value}>{children}</ChatSocketContext.Provider>;
};

export const useChatSocket = () => {
  const ctx = useContext(ChatSocketContext);
  if (!ctx) throw new Error('useChatSocket must be used within ChatSocketProvider');
  return ctx;
};
