import { ChatEvents, Conversation } from '@/types/chat';
import { toParticipant } from '../utils';

/**
 * Pure reducers for the active conversation's cache
 * (id, title, participants, watermarks).
 */

export const applyJoined = (
  prev: Conversation | null,
  data: ChatEvents['conversation:joined']
): Conversation | null => {
  if (prev && prev.id !== data.conversation_id) return prev;
  return {
    id: data.conversation_id,
    title: data.title,
    type: data.type,
    participants: data.participants.map(toParticipant),
    messages: [],
    last_activity: new Date().toISOString(),
    unread_count: 0,
  };
};

export const applyMessageRead = (
  prev: Conversation | null,
  data: ChatEvents['message:read']
): Conversation | null => {
  if (!prev || prev.id !== data.conversation_id || !data.actor_id || !data.last_read_seq) {
    return prev;
  }
  // Short-circuit when the watermark hasn't actually advanced
  const target = prev.participants.find((p) => p.id === data.actor_id);
  if (target?.last_read_seq === data.last_read_seq) return prev;
  const lastReadSeq = data.last_read_seq;
  return {
    ...prev,
    participants: prev.participants.map((p) =>
      p.id === data.actor_id ? { ...p, last_read_seq: lastReadSeq } : p
    ),
  };
};
