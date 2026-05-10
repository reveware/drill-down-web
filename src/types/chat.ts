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
  stream_id?: string; // present on persona replies — correlates with message:stream
  type: string; // content type of the first part
  status: 'sending' | 'sent' | 'read' | 'failed';
}

// ---------------------------------------------------------------------------
// WireConversation — shape from GET /conversations REST response
// ---------------------------------------------------------------------------
export interface WireConversation {
  id: string;
  title: string; // resolved by the backend (counterpart's display name for 1:1)
  type: 'USER' | 'PERSONA';
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
  title: string;
  type: 'USER' | 'PERSONA';
  participants: Participant[];
  messages: WireMessage[];
  last_message?: WireMessage;
  last_activity: string;
  unread_count: number;
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
    title: string;
    type: 'USER' | 'PERSONA';
    room_name: string;
    actor_id: string;
    participants: WireParticipant[];
  };
  'message:new': WireMessage;
  // Server emits this only on success — failures come through `error` with code `send_failed`
  'message:updated': { message_id: string; client_temp_id?: string; status: 'sent' };
  // Streaming persona replies — one event per token chunk
  'message:stream': { stream_id: string; conversation_id: string; delta: string };
  // Persona stream failure — separate from the generic `error` event, correlated by stream_id
  'message:error': {
    stream_id: string;
    conversation_id: string;
    code: 'persona_response_failed';
    reason?: string;
    message: string;
  };
  // typing is bidirectional:
  //   Client → Server: { conversation_id }
  //   Server → Room:   { conversation_id, actor_id }
  'typing:start': { conversation_id: string; actor_id?: string };
  'typing:stop': { conversation_id: string; actor_id?: string };
  // `client_temp_id` is echoed back on send-related failures (send_failed, rate_limited)
  error: { code: string; message: string; client_temp_id?: string };
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export type ConversationInit = { byId: string } | { byPersonaSlug: string } | { byUserId: string };

export interface JoinError {
  code: string;
  message: string;
  retry: () => void;
}
