import { createWebSocketAdapter, WebSocketAdapter } from '@/lib/websocket/websocket-adapter';
import { ChatEvents, ConnectionStatus, MessagePart, WireMessage } from '@/types/chat';

export class ChatWebSocketService {
  private adapter: WebSocketAdapter;
  private static instance: ChatWebSocketService | null = null;
  private authToken?: string;
  private wsUrl: string;

  private constructor(token?: string) {
    this.wsUrl = process.env.NEXT_PUBLIC_WS_URL!;
    this.authToken = token;
    this.adapter = createWebSocketAdapter('socketio', this.wsUrl, this.authToken);
  }

  static getInstance(token?: string): ChatWebSocketService {
    if (!this.instance) {
      this.instance = new ChatWebSocketService(token);
    } else if (token && this.instance.authToken !== token) {
      this.instance.setAuthToken(token);
    }
    return this.instance;
  }

  setAuthToken(token?: string) {
    if (this.authToken === token) return;
    this.authToken = token;
    this.adapter = createWebSocketAdapter('socketio', this.wsUrl, this.authToken);
  }

  async connect(): Promise<void> {
    await this.adapter.connect();
  }

  disconnect(): void {
    this.adapter.disconnect();
  }

  // ---------------------------------------------------------------------------
  // Client → Server
  // ---------------------------------------------------------------------------

  joinConversation(conversationId: string): void {
    this.adapter.emit('conversation:join', { conversation_id: conversationId });
  }

  startPersonaChat(personaSlug: string): void {
    this.adapter.emit('conversation:join', { persona_slug: personaSlug });
  }

  startUserChat(userId: string): void {
    this.adapter.emit('conversation:join', { user_id: userId });
  }

  sendMessage(conversationId: string, parts: MessagePart[], clientTempId?: string): void {
    this.adapter.emit('message:send', {
      conversation_id: conversationId,
      content: parts,
      client_temp_id: clientTempId,
    });
  }

  markAsRead(conversationId: string, upToSeq: string): void {
    this.adapter.emit('message:read', { conversation_id: conversationId, up_to_seq: upToSeq });
  }

  startTyping(conversationId: string): void {
    this.adapter.emit('typing:start', { conversation_id: conversationId });
  }

  stopTyping(conversationId: string): void {
    this.adapter.emit('typing:stop', { conversation_id: conversationId });
  }

  // ---------------------------------------------------------------------------
  // Server → Client listeners
  // ---------------------------------------------------------------------------

  onConversationJoined(handler: (data: ChatEvents['conversation:joined']) => void): void {
    this.adapter.on('conversation:joined', handler);
  }

  onNewMessage(handler: (message: WireMessage) => void): void {
    this.adapter.on('message:new', handler);
  }

  onMessageUpdated(handler: (data: ChatEvents['message:updated']) => void): void {
    this.adapter.on('message:updated', handler);
  }

  onMessageRead(handler: (data: ChatEvents['message:read']) => void): void {
    this.adapter.on('message:read', handler);
  }

  onTypingStart(handler: (data: ChatEvents['typing:start']) => void): void {
    this.adapter.on('typing:start', handler);
  }

  onTypingStop(handler: (data: ChatEvents['typing:stop']) => void): void {
    this.adapter.on('typing:stop', handler);
  }

  onError(handler: (data: { code: string; message: string }) => void): void {
    this.adapter.on('error', handler);
  }

  offError(handler: (data: { code: string; message: string }) => void): void {
    this.adapter.off('error', handler);
  }

  onConnectionChange(handler: (status: ConnectionStatus) => void): void {
    this.adapter.onConnectionChange(handler);
  }

  getConnectionStatus(): ConnectionStatus {
    return this.adapter.getConnectionStatus();
  }

  removeAllListeners(): void {
    const events: (keyof ChatEvents)[] = [
      'conversation:joined',
      'message:new',
      'message:updated',
      'message:read',
      'typing:start',
      'typing:stop',
      'error',
    ];
    events.forEach((event) => this.adapter.off(event));
  }
}
