import { ChatEvents, Participant, WireMessage } from '@/types/chat';
import { UserDetail } from '@/types/user';

export const buildOptimisticMessage = (
  conversationId: string,
  content: string,
  user: UserDetail | null,
  actorId: string | null
): WireMessage => {
  const clientTempId = `temp-${crypto.randomUUID()}`;
  return {
    id: clientTempId,
    conversation_id: conversationId,
    content: [{ type: 'text', text: content }],
    timestamp: new Date().toISOString(),
    sender: {
      actor_id: actorId ?? user?.id ?? 'current-user',
      actor_type: 'USER',
      user: user
        ? {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
          }
        : undefined,
    },
    type: 'text',
    status: 'sending',
    client_temp_id: clientTempId,
  };
};

export const buildStreamPlaceholder = (
  participants: Participant[],
  data: ChatEvents['message:stream']
): WireMessage =>
  buildPersonaStreamMessage(participants, {
    conversationId: data.conversation_id,
    streamId: data.stream_id,
    text: data.delta,
    status: 'sending',
  });

export const buildStreamErrorMessage = (
  participants: Participant[],
  data: ChatEvents['message:error']
): WireMessage =>
  buildPersonaStreamMessage(participants, {
    conversationId: data.conversation_id,
    streamId: data.stream_id,
    text: data.message,
    status: 'failed',
  });

interface PersonaStreamMessage {
  conversationId: string;
  streamId: string;
  text: string;
  status: WireMessage['status'];
}

const buildPersonaStreamMessage = (
  participants: Participant[],
  { conversationId, streamId, text, status }: PersonaStreamMessage
): WireMessage => {
  const personaParticipant = participants.find((p) => p.is_agent);
  return {
    id: streamId,
    conversation_id: conversationId,
    content: [{ type: 'text', text }],
    timestamp: new Date().toISOString(),
    sender: {
      actor_id: personaParticipant?.id ?? 'persona',
      actor_type: 'PERSONA',
      persona: personaParticipant?.persona
        ? {
            id: personaParticipant.persona.id,
            slug: personaParticipant.persona.slug,
            name: personaParticipant.name,
            avatar: personaParticipant.avatar,
          }
        : undefined,
    },
    stream_id: streamId,
    type: 'text',
    status,
  };
};
