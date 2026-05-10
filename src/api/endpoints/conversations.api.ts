import { apiClient } from '@/api/client';
import { Conversation, WireMessage, WireConversation } from '@/types/chat';
import { toParticipant } from '@/features/chat/utils';

export interface ListConversationsParams {
  cursor?: string;
  limit?: number;
  query?: string;
  type?: 'USER' | 'PERSONA';
}

export interface ListConversationsResult {
  conversations: Conversation[];
  nextCursor: string | null;
}

const wireToConversation = (c: WireConversation): Conversation => ({
  id: c.id,
  title: c.title,
  type: c.type,
  participants: c.participants.map(toParticipant),
  messages: c.last_message ? [c.last_message] : [],
  last_message: c.last_message,
  last_activity: c.last_activity,
  unread_count: c.unread_count,
});

export const ConversationsApi = {
  async list({
    cursor,
    limit = 25,
    query,
    type,
  }: ListConversationsParams = {}): Promise<ListConversationsResult> {
    const res = await apiClient.get<{
      items: WireConversation[];
      next_cursor: string | null;
    }>('/conversations', {
      params: {
        limit,
        ...(cursor ? { cursor } : {}),
        ...(query ? { query } : {}),
        ...(type ? { type } : {}),
      },
    });

    return {
      conversations: res.data.items.map(wireToConversation),
      nextCursor: res.data.next_cursor,
    };
  },

  async getMessages(conversationId: string, limit = 50): Promise<WireMessage[]> {
    const res = await apiClient.get<{ items: WireMessage[] }>(
      `/conversations/${conversationId}/messages`,
      { params: { limit } }
    );
    return res.data.items;
  },

  async delete(conversationId: string): Promise<void> {
    await apiClient.delete(`/conversations/${conversationId}`);
  },
};
