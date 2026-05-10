import { apiClient } from '@/api/client';
import {
  Conversation,
  WireMessage,
  WireConversation,
  ListConversationsResponseSchema,
  ListConversationsResponseDto,
  ListMessagesResponseSchema,
  ListMessagesResponseDto,
} from '@/types/chat';
import { toParticipant, getActorDisplayName } from '@/features/chat/utils';

export interface ListConversationsResult {
  conversations: Conversation[];
  nextCursor: string | null;
  /** The current user's actor ID (first USER-type participant found). */
  currentActorId: string | null;
}

export const ConversationsApi = {
  async list(cursor?: string, limit = 25): Promise<ListConversationsResult> {
    const res = await apiClient.get<ListConversationsResponseDto>('/conversations', {
      params: { ...(cursor ? { cursor } : {}), limit },
    });
    ListConversationsResponseSchema.parse(res.data);

    let currentActorId: string | null = null;

    const conversations: Conversation[] = res.data.items.map((c: WireConversation) => {
      // Learn our actor ID from the first USER participant
      if (!currentActorId) {
        const userParticipant = c.participants.find((p) => p.actor_type === 'USER');
        if (userParticipant) currentActorId = userParticipant.actor_id;
      }

      const participants = c.participants.map(toParticipant);

      // Derive a title from the counterpart (non-self participant)
      const counterpart = c.participants.find((p) => p.actor_id !== currentActorId);
      const title = counterpart ? getActorDisplayName(counterpart) : undefined;

      return {
        id: c.id,
        type: c.type === 'PERSONA' ? 'ai_assistant' : 'direct',
        participants,
        messages: c.last_message ? [c.last_message] : [],
        last_message: c.last_message,
        last_activity: c.last_activity,
        unread_count: c.unread_count,
        title,
      } as Conversation;
    });

    return { conversations, nextCursor: res.data.next_cursor, currentActorId };
  },

  async getMessages(conversationId: string, limit = 50): Promise<WireMessage[]> {
    const res = await apiClient.get<ListMessagesResponseDto>(
      `/conversations/${conversationId}/messages`,
      { params: { limit } }
    );
    ListMessagesResponseSchema.parse(res.data);
    return res.data.items;
  },
};
