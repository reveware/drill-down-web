import { ChatEvents, ConnectionStatus, WireParticipant } from '@/types/chat';
import { sleep } from '@/lib/utils';
import { generateResponse } from '@/mocks/chat';
import type { WebSocketAdapter } from '@/lib/websocket/websocket-adapter';

type EventHandler = (...args: unknown[]) => void;

const MOCK_USER_ACTOR_ID = 'mock-user-actor';
const MOCK_AOI_PARTICIPANTS: WireParticipant[] = [
  {
    actor_id: MOCK_USER_ACTOR_ID,
    actor_type: 'USER',
    last_read_seq: '0',
    user: { id: 'current-user', username: 'you', first_name: 'You', last_name: '', avatar: null },
  },
  {
    actor_id: 'aoi',
    actor_type: 'PERSONA',
    last_read_seq: '0',
    persona: {
      id: 'aoi',
      slug: 'aoi',
      name: 'Aoi',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
];

export class MockWebSocketAdapter implements WebSocketAdapter {
  private connectionStatus: ConnectionStatus = 'disconnected';
  private eventHandlers = new Map<string, Set<EventHandler>>();
  private connectionHandlers = new Set<(status: ConnectionStatus) => void>();

  constructor(
    private url: string,
    private authToken?: string
  ) {}

  async connect(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.setConnectionStatus('connected');
  }

  disconnect(): void {
    this.setConnectionStatus('disconnected');
  }

  emit<K extends keyof ChatEvents>(event: K, data: ChatEvents[K]): void {
    if (event === 'conversation:join') {
      const payload = data as ChatEvents['conversation:join'];
      const conversationId =
        payload.conversation_id ??
        (payload.persona_slug
          ? `${payload.persona_slug}-conversation`
          : `direct-${payload.user_id}`);

      setTimeout(() => {
        this.dispatch('conversation:joined', {
          conversation_id: conversationId,
          title: 'Aoi',
          type: payload.persona_slug ? 'PERSONA' : 'USER',
          room_name: `conv:${conversationId}`,
          actor_id: MOCK_USER_ACTOR_ID,
          participants: MOCK_AOI_PARTICIPANTS,
        });
      }, 150);
      return;
    }

    if (event === 'message:send') {
      const { conversation_id, content, client_temp_id } = data as ChatEvents['message:send'];
      const textContent = content.find((p) => p.type === 'text')?.text ?? '';

      (async () => {
        try {
          this.dispatch('typing:start', { conversation_id, actor_id: 'aoi' });
          await sleep(0.4);
          await sleep(0.6 + Math.random());
          this.dispatch('typing:stop', { conversation_id, actor_id: 'aoi' });

          const reply = generateResponse(conversation_id, textContent);
          this.dispatch('message:new', reply);

          if (client_temp_id) {
            this.dispatch('message:updated', {
              message_id: `server-${Date.now()}`,
              client_temp_id,
              status: 'sent',
            });
          }
        } catch {
          this.dispatch('error', { code: 'mock_error', message: 'Failed to simulate response' });
        }
      })();
      return;
    }
  }

  on<K extends keyof ChatEvents>(event: K, handler: (data: ChatEvents[K]) => void): void {
    const key = event as string;
    if (!this.eventHandlers.has(key)) this.eventHandlers.set(key, new Set());
    this.eventHandlers.get(key)!.add(handler as EventHandler);
  }

  off<K extends keyof ChatEvents>(event: K, handler?: (data: ChatEvents[K]) => void): void {
    const key = event as string;
    if (!this.eventHandlers.has(key)) return;
    if (handler) this.eventHandlers.get(key)!.delete(handler as EventHandler);
    else this.eventHandlers.get(key)!.clear();
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

  private dispatch<K extends keyof ChatEvents>(event: K, data: ChatEvents[K]): void {
    const handlers = this.eventHandlers.get(event as string);
    if (!handlers) return;
    handlers.forEach((fn) => {
      try {
        (fn as (d: ChatEvents[K]) => void)(data);
      } catch {}
    });
  }
}
