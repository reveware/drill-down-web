import { useCallback } from 'react';
import { ConversationsApi, ListConversationsResult } from '@/api/endpoints/conversations.api';
import { WireMessage } from '@/types/chat';

export const useConversationsApi = () => {
  const listConversations = useCallback(async (): Promise<ListConversationsResult> => {
    return ConversationsApi.list();
  }, []);

  const getMessages = useCallback(
    async (conversationId: string, limit = 50): Promise<WireMessage[]> => {
      return ConversationsApi.getMessages(conversationId, limit);
    },
    []
  );

  return { listConversations, getMessages };
};
