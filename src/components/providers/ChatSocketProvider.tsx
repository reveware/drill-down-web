'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ChatWebSocketService } from '@/features/chat/services/chat-websocket.service';
import { ConnectionStatus } from '@/types/chat';
import { toast } from '@/lib/toast';
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
  const lastStatusRef = useRef<ConnectionStatus | null>(null);

  useEffect(() => {
    if (!user) return;

    serviceRef.current = ChatWebSocketService.getInstance(token || undefined);

    const connect = async () => {
      try {
        await serviceRef.current!.connect();
      } catch (e) {
        console.error('ChatSocketProvider: Failed to connect to chat', e);
        toast.error('Failed to connect to chat');
      }
    };

    const handleConnectionChange = (status: ConnectionStatus) => {
      setConnectionStatus(status);
      if (lastStatusRef.current !== status) {
        if (status === 'connected') toast.success('Connected to chat');
        if (status === 'disconnected') toast.error('Disconnected from chat');
      }
      lastStatusRef.current = status;
    };

    const handleError = (error: { code: string; message: string }) => {
      console.error('Chat error:', error);
      toast.error(`Chat error: ${error.message}`);
    };

    serviceRef.current.onConnectionChange(handleConnectionChange);
    serviceRef.current.onError(handleError);
    connect();

    return () => {
      serviceRef.current?.removeAllListeners();
      serviceRef.current?.disconnect();
      serviceRef.current = null;
      lastStatusRef.current = null;
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
