import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConversationsApi } from '@/api/endpoints/conversations.api';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => ConversationsApi.delete(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
