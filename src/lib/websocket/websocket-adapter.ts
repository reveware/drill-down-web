// WebSocket abstraction layer for Socket.IO (with mock support)
import { ChatEvents, ConnectionStatus } from '@/types/chat';
import { USE_MOCKS } from '@/api/constants';
import { MockWebSocketAdapter } from '@/mocks/websocket';
import type { Socket } from 'socket.io-client';

type EventHandler = (...args: unknown[]) => void;

export interface WebSocketAdapter {
  connect(): Promise<void>;
  disconnect(): void;
  emit<K extends keyof ChatEvents>(event: K, data: ChatEvents[K]): void;
  on<K extends keyof ChatEvents>(event: K, handler: (data: ChatEvents[K]) => void): void;
  off<K extends keyof ChatEvents>(event: K, handler?: (data: ChatEvents[K]) => void): void;
  getConnectionStatus(): ConnectionStatus;
  onConnectionChange(handler: (status: ConnectionStatus) => void): void;
}

export class SocketIOAdapter implements WebSocketAdapter {
  private socket: Socket | null = null;
  private connectionStatus: ConnectionStatus = 'disconnected';
  private eventHandlers = new Map<string, Set<EventHandler>>();
  private connectionHandlers = new Set<(status: ConnectionStatus) => void>();

  constructor(
    private url: string,
    private authToken?: string
  ) {}

  async connect(): Promise<void> {
    if (this.socket && this.connectionStatus === 'connected') return;

    this.setConnectionStatus('connecting');

    const { io } = await import('socket.io-client');
    const socketUrl = `${this.url}/chat`;
    this.socket = io(socketUrl, {
      auth: this.authToken ? { token: this.authToken } : undefined,
      transports: ['websocket', 'polling'],
      upgrade: false,
      autoConnect: true,
      forceNew: true,
      timeout: 20000,
      path: '/socket.io',
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    return new Promise((resolve, reject) => {
      let resolved = false;

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          this.setConnectionStatus('error');
          reject(new Error('Connection timeout'));
        }
      }, 20000);

      this.socket!.on('connect', () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          this.setConnectionStatus('connected');
          resolve();
        }
      });

      this.socket!.on('disconnect', (_reason: string) => {
        this.setConnectionStatus('disconnected');
      });

      this.socket!.on('connect_error', (err: Error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.error('SocketIOAdapter: Connection error:', err.message);
          this.setConnectionStatus('error');
          reject(err);
        }
      });

      this.socket!.on('error', (error: Error) => {
        console.error('SocketIOAdapter: Socket error:', error);
      });

      this.socket!.io.on('reconnect_attempt', (attempt: number) => {
        console.log('SocketIOAdapter: Reconnect attempt', attempt);
      });
      this.socket!.io.on('reconnect_failed', () => {
        console.error('SocketIOAdapter: Reconnect failed');
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = null;
    this.setConnectionStatus('disconnected');
  }

  emit<K extends keyof ChatEvents>(event: K, data: ChatEvents[K]): void {
    if (!this.socket) return;
    this.socket.emit(event as string, data);
  }

  on<K extends keyof ChatEvents>(event: K, handler: (data: ChatEvents[K]) => void): void {
    const eventName = String(event);
    if (!this.eventHandlers.has(eventName)) this.eventHandlers.set(eventName, new Set());
    this.eventHandlers.get(eventName)!.add(handler as EventHandler);
    if (this.socket) this.socket.on(eventName, handler as EventHandler);
  }

  off<K extends keyof ChatEvents>(event: K, handler?: (data: ChatEvents[K]) => void): void {
    const eventName = String(event);
    const handlers = this.eventHandlers.get(eventName);
    if (handlers) {
      if (handler) handlers.delete(handler as EventHandler);
      else handlers.clear();
    }
    if (!this.socket) return;
    if (handler) this.socket.off(eventName, handler as EventHandler);
    else this.socket.off(eventName);
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  onConnectionChange(handler: (status: ConnectionStatus) => void): void {
    this.connectionHandlers.add(handler);
  }

  private setConnectionStatus(status: ConnectionStatus): void {
    this.connectionStatus = status;
    this.connectionHandlers.forEach((h) => h(status));
  }
}

export const createWebSocketAdapter = (
  _type: 'native' | 'socketio' = 'socketio',
  url: string,
  authToken?: string
): WebSocketAdapter => {
  if (USE_MOCKS) return new MockWebSocketAdapter(url, authToken);
  return new SocketIOAdapter(url, authToken);
};
