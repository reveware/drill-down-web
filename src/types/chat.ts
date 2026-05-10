import { z } from 'zod';

// ---------------------------------------------------------------------------
// MessagePart — content unit inside a message
// ---------------------------------------------------------------------------
export interface MessagePart {
  type: 'text' | 'image' | 'audio' | 'post_ref';
  text?: string;
  media_key?: string;
  w?: number;
  h?: number;
  alt?: string;
  duration_s?: number;
  waveform?: number[];
  post_id?: string;
  snapshot?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// WireActor — typed sender/participant identity.
// Exactly one of `user` or `persona` is present based on `actor_type`.
// ---------------------------------------------------------------------------
export interface WireActorUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface WireActorPersona {
  id: string;
  slug: string;
  name: string;
  avatar?: string;
}

export interface WireActor {
  actor_id: string;
  actor_type: 'USER' | 'PERSONA';
  user?: WireActorUser;
  persona?: WireActorPersona;
}

// ---------------------------------------------------------------------------
// WireParticipant — extends WireActor with conversation-scoped state
// ---------------------------------------------------------------------------
export interface WireParticipant extends WireActor {
  last_read_seq: string;
}

// ---------------------------------------------------------------------------
// WireMessage — as returned by the backend (WS + REST).
// `status` from the server is always "sent". The frontend adds "sending"
// (optimistic) and derives "read" from the watermark.
// ---------------------------------------------------------------------------
export interface WireMessage {
  id: string;
  conversation_id: string;
  content: MessagePart[];
  seq?: string; // BigInt as string — absent on optimistic messages
  timestamp: string; // ISO 8601
  sender: WireActor; // typed sender identity
  client_temp_id?: string; // echoed from message:send for dedup
  type: string; // content type of the first part
  status: 'sending' | 'sent' | 'read' | 'failed';
}

// ---------------------------------------------------------------------------
// WireConversation — shape from GET /conversations REST response
// ---------------------------------------------------------------------------
export interface WireConversation {
  id: string;
  type: 'DIRECT' | 'PERSONA';
  created_at: string;
  last_activity: string;
  unread_count: number;
  participants: WireParticipant[];
  last_message?: WireMessage;
}

// ---------------------------------------------------------------------------
// UI types — derived / display layer
// ---------------------------------------------------------------------------

export interface Participant {
  id: string; // actor_id
  name: string; // derived from WireActor sub-objects
  avatar?: string;
  is_agent: boolean;
  last_read_seq?: string;
  // Routing data
  user?: { id: string; username: string };
  persona?: { id: string; slug: string };
}

export interface Conversation {
  id: string;
  type: 'direct' | 'ai_assistant';
  participants: Participant[];
  messages: WireMessage[];
  last_message?: WireMessage;
  last_activity: string;
  unread_count: number;
  title?: string;
}

// ---------------------------------------------------------------------------
// WebSocket event contract
// ---------------------------------------------------------------------------
export interface ChatEvents {
  // Client → Server
  'conversation:join': { conversation_id?: string; persona_slug?: string; user_id?: string };
  'message:send': { conversation_id: string; client_temp_id?: string; content: MessagePart[] };
  // message:read is bidirectional:
  //   Client → Server: { conversation_id, up_to_seq }
  //   Server → Room:   { conversation_id, actor_id, last_read_seq }
  'message:read': {
    conversation_id: string;
    up_to_seq?: string;
    actor_id?: string;
    last_read_seq?: string;
  };
  // Server → Client
  'conversation:joined': {
    conversation_id: string;
    type: 'DIRECT' | 'PERSONA';
    room_name: string;
    actor_id: string;
    participants: WireParticipant[];
  };
  'message:new': WireMessage;
  'message:updated': { message_id: string; client_temp_id?: string; status: 'sent' | 'failed' };
  // typing is bidirectional:
  //   Client → Server: { conversation_id }
  //   Server → Room:   { conversation_id, actor_id }
  'typing:start': { conversation_id: string; actor_id?: string };
  'typing:stop': { conversation_id: string; actor_id?: string };
  error: { code: string; message: string };
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

// ---------------------------------------------------------------------------
// Zod schemas — for REST response validation only
// ---------------------------------------------------------------------------
const MessagePartSchema = z.object({
  type: z.enum(['text', 'image', 'audio', 'post_ref']),
  text: z.string().optional(),
  media_key: z.string().optional(),
  w: z.number().optional(),
  h: z.number().optional(),
  alt: z.string().optional(),
  duration_s: z.number().optional(),
  waveform: z.array(z.number()).optional(),
  post_id: z.string().optional(),
  snapshot: z.any().optional(),
});

const WireActorSchema = z.object({
  actor_id: z.string(),
  actor_type: z.enum(['USER', 'PERSONA']),
  user: z
    .object({
      id: z.string(),
      username: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string().optional(),
    })
    .optional(),
  persona: z
    .object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      avatar: z.string().optional(),
    })
    .optional(),
});

const WireParticipantSchema = WireActorSchema.extend({
  last_read_seq: z.string(),
});

const WireMessageSchema = z.object({
  id: z.string(),
  conversation_id: z.string(),
  content: z.array(MessagePartSchema),
  seq: z.string().optional(),
  timestamp: z.string(),
  sender: WireActorSchema,
  client_temp_id: z.string().optional(),
  type: z.string(),
  status: z.enum(['sending', 'sent', 'read', 'failed']),
});

const WireConversationSchema = z.object({
  id: z.string(),
  type: z.enum(['DIRECT', 'PERSONA']),
  created_at: z.string(),
  last_activity: z.string(),
  unread_count: z.number(),
  participants: z.array(WireParticipantSchema),
  last_message: WireMessageSchema.optional(),
});

export const ListConversationsResponseSchema = z.object({
  items: z.array(WireConversationSchema),
  next_cursor: z.string().nullable(),
});
export type ListConversationsResponseDto = z.infer<typeof ListConversationsResponseSchema>;

export const ListMessagesResponseSchema = z.object({
  items: z.array(WireMessageSchema),
});
export type ListMessagesResponseDto = z.infer<typeof ListMessagesResponseSchema>;
