import { useEffect } from 'react';
import { Conversation } from '@/types/chat';
import { useIsActorSelf } from './useIsActorSelf';

export const useAutoMarkRead = (
  conversation: Conversation | null | undefined,
  markAsRead: (upToSeq: string) => void
) => {
  const isSelf = useIsActorSelf();
  const lastMsg = conversation?.messages[conversation.messages.length - 1];
  const lastMsgSeq = lastMsg?.seq;
  const isLastMsgFromSelf = lastMsg ? isSelf(lastMsg.sender) : false;

  useEffect(() => {
    if (!lastMsgSeq || isLastMsgFromSelf) return;
    markAsRead(lastMsgSeq);
  }, [lastMsgSeq, isLastMsgFromSelf, markAsRead]);
};
