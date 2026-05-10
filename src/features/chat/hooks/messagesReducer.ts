import { ChatEvents, Participant, WireMessage } from '@/types/chat';
import { buildStreamErrorMessage } from './messageFactory';

/**
 * Pure reducers for a conversation's `WireMessage[]` cache.
 * (dedup, streaming reconcile, placeholder fallback)
 */

export const applyNewMessage = (prev: WireMessage[], message: WireMessage): WireMessage[] => {
  // Dedup: server echo of our optimistic message
  if (message.client_temp_id && prev.some((m) => m.client_temp_id === message.client_temp_id)) {
    return prev;
  }

  // Streaming reconcile: replace placeholder by stream_id
  const streamIndex = message.stream_id
    ? prev.findIndex((m) => m.stream_id === message.stream_id)
    : -1;

  // Dedup by server id
  if (streamIndex < 0 && prev.some((m) => m.id === message.id)) return prev;

  return streamIndex >= 0
    ? prev.map((m, i) => (i === streamIndex ? message : m))
    : [...prev, message];
};

export const applyStreamError = (
  prev: WireMessage[],
  data: ChatEvents['message:error'],
  participants: Participant[]
): WireMessage[] => {
  const idx = prev.findIndex((m) => m.stream_id === data.stream_id);
  if (idx >= 0) {
    return prev.map((m) =>
      m.stream_id === data.stream_id
        ? {
            ...m,
            status: 'failed' as const,
            content: [{ type: 'text' as const, text: data.message }],
          }
        : m
    );
  }
  return [...prev, buildStreamErrorMessage(participants, data)];
};
