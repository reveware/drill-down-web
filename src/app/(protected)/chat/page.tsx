'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useConfirm } from '@/components/providers/ConfirmProvider';
import { toast } from '@/lib/toast';
import { useChatSocket } from '@/components/providers/ChatSocketProvider';
import { useDeleteConversation } from '@/features/chat/hooks/useDeleteConversation';
import { Chat } from '@/features/chat/components/Chat/Chat';
import { ConversationList } from '@/features/chat/components/ConversationList/ConversationList';
import { ActorPicker } from '@/features/chat/components/ActorPicker/ActorPicker';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();
  const confirm = useConfirm();
  const { service } = useChatSocket();

  const [activeId, setActiveId] = useState<string | null>(null);
  const { mutateAsync: deleteConversation } = useDeleteConversation();

  const didAutoSelect = useRef(false);
  useEffect(() => {
    if (didAutoSelect.current) return;
    const id = searchParams.get('id');
    if (id) {
      didAutoSelect.current = true;
      setActiveId(id);
    }
  }, [searchParams]);

  const handleNewConversation = () => {
    openModal({
      id: 'new-conversation',
      title: 'New conversation',
      content: (
        <ActorPicker
          onSelectUser={(userId) => {
            service?.initConversation({ byUserId: userId });
            closeModal();
          }}
          onSelectPersona={(slug) => {
            service?.initConversation({ byPersonaSlug: slug });
            closeModal();
          }}
        />
      ),
    });
  };

  const handleDelete = async (conversationId: string) => {
    const ok = await confirm({
      emoji: '🗑️',
      title: 'Delete this conversation?',
      description: 'This cannot be undone.',
      confirmLabel: 'Delete',
      destructive: true,
    });
    if (!ok) return;
    try {
      await deleteConversation(conversationId);
      if (activeId === conversationId) setActiveId(null);
    } catch (e) {
      console.error('Failed to delete conversation', { conversationId, error: e });
      toast.error('Failed to delete conversation');
    }
  };

  return (
    <div className="bg-background flex h-full">
      <ConversationList
        activeConversationId={activeId}
        onSelect={setActiveId}
        onNewConversation={handleNewConversation}
      />

      {/* Mobile: show the panel only when active. Desktop: always visible. */}
      <div className={cn('flex-1 flex-col', activeId ? 'flex' : 'hidden md:flex')}>
        <Chat
          init={activeId ? { byId: activeId } : null}
          onBack={() => setActiveId(null)}
          onDelete={handleDelete}
          onNewConversation={handleNewConversation}
        />
      </div>
    </div>
  );
}
