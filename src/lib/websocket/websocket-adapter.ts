import { io, Socket } from 'socket.io-client';
import { ChatEvents, ConnectionStatus } from '@/types/chat';
import { USE_MOCKS } from '@/api/constants';
import { MockWebSocketAdapter } from '@/mocks/websocket';

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

const CONNECTION_TIMEOUT_MS = 20000;

export class SocketIOAdapter implements WebSocketAdapter {
  private socket: Socket;
  private connectionStatus: ConnectionStatus = 'disconnected';
  private connectionHandlers = new Set<(status: ConnectionStatus) => void>();

  constructor(url: string, authToken?: string) {
    this.socket = io(`${url}/chat`, {
      auth: authToken ? { token: authToken } : undefined,
      transports: ['websocket', 'polling'],
      upgrade: false,
      autoConnect: false,
      timeout: CONNECTION_TIMEOUT_MS,
      path: '/socket.io',
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => this.setConnectionStatus('connected'));
    this.socket.on('disconnect', () => this.setConnectionStatus('disconnected'));
    this.socket.on('error', (error: Error) => {
      console.error('SocketIOAdapter: Socket error:', error);
    });
    this.socket.io.on('reconnect_attempt', (attempt: number) => {
      console.log('SocketIOAdapter: Reconnect attempt', attempt);
    });
    this.socket.io.on('reconnect_failed', () => {
      console.error('SocketIOAdapter: Reconnect failed');
    });
  }

  async connect(): Promise<void> {
    if (this.socket.connected) return;
    this.setConnectionStatus('connecting');

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timeout);
        this.socket.off('connect', onOk);
        this.socket.off('connect_error', onErr);
      };
      const onOk = () => {
        cleanup();
        resolve();
      };
      const onErr = (err: Error) => {
        cleanup();
        console.error('SocketIOAdapter: Connection error:', err.message);
        this.setConnectionStatus('error');
        reject(err);
      };
      const timeout = setTimeout(() => {
        cleanup();
        this.setConnectionStatus('error');
        reject(new Error('Connection timeout'));
      }, CONNECTION_TIMEOUT_MS);

      this.socket.once('connect', onOk);
      this.socket.once('connect_error', onErr);
      this.socket.connect();
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  emit<K extends keyof ChatEvents>(event: K, data: ChatEvents[K]): void {
    this.socket.emit(event as string, data);
  }

  on<K extends keyof ChatEvents>(event: K, handler: (data: ChatEvents[K]) => void): void {
    this.socket.on(event as string, handler as EventHandler);
  }

  off<K extends keyof ChatEvents>(event: K, handler?: (data: ChatEvents[K]) => void): void {
    if (handler) this.socket.off(event as string, handler as EventHandler);
    else this.socket.off(event as string);
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
