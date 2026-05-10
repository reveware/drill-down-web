import { createWebSocketAdapter, WebSocketAdapter } from '@/lib/websocket/websocket-adapter';
import {
  ChatEvents,
  ConnectionStatus,
  ConversationInit,
  MessagePart,
  WireMessage,
} from '@/types/chat';

/** Function returned by every `onX` listener, call to unsubscribe. */
export type Unsubscribe = () => void;

export const JOIN_ERROR_CODES = new Set([
  'conversation_not_found',
  'user_not_found',
  'persona_not_found',
  'persona_inactive',
  'invalid_join_request',
  'join_failed',
  'not_in_conversation',
]);

export const SEND_ERROR_CODES = new Set(['send_failed', 'rate_limited']);

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

  initConversation(init: ConversationInit): void {
    if ('byId' in init) {
      this.adapter.emit('conversation:join', { conversation_id: init.byId });
    } else if ('byPersonaSlug' in init) {
      this.adapter.emit('conversation:join', { persona_slug: init.byPersonaSlug });
    } else {
      this.adapter.emit('conversation:join', { user_id: init.byUserId });
    }
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
  // Every onX returns an Unsubscribe so multiple consumers can subscribe independently
  // ---------------------------------------------------------------------------

  onConversationJoined(handler: (data: ChatEvents['conversation:joined']) => void): Unsubscribe {
    this.adapter.on('conversation:joined', handler);
    return () => this.adapter.off('conversation:joined', handler);
  }

  onNewMessage(handler: (message: WireMessage) => void): Unsubscribe {
    this.adapter.on('message:new', handler);
    return () => this.adapter.off('message:new', handler);
  }

  onMessageUpdated(handler: (data: ChatEvents['message:updated']) => void): Unsubscribe {
    this.adapter.on('message:updated', handler);
    return () => this.adapter.off('message:updated', handler);
  }

  onMessageRead(handler: (data: ChatEvents['message:read']) => void): Unsubscribe {
    this.adapter.on('message:read', handler);
    return () => this.adapter.off('message:read', handler);
  }

  onMessageStream(handler: (data: ChatEvents['message:stream']) => void): Unsubscribe {
    this.adapter.on('message:stream', handler);
    return () => this.adapter.off('message:stream', handler);
  }

  onMessageError(handler: (data: ChatEvents['message:error']) => void): Unsubscribe {
    this.adapter.on('message:error', handler);
    return () => this.adapter.off('message:error', handler);
  }

  onTypingStart(handler: (data: ChatEvents['typing:start']) => void): Unsubscribe {
    this.adapter.on('typing:start', handler);
    return () => this.adapter.off('typing:start', handler);
  }

  onTypingStop(handler: (data: ChatEvents['typing:stop']) => void): Unsubscribe {
    this.adapter.on('typing:stop', handler);
    return () => this.adapter.off('typing:stop', handler);
  }

  onError(handler: (data: ChatEvents['error']) => void): Unsubscribe {
    this.adapter.on('error', handler);
    return () => this.adapter.off('error', handler);
  }

  onConnectionChange(handler: (status: ConnectionStatus) => void): void {
    this.adapter.onConnectionChange(handler);
  }
}
