import { Conversation, WireMessage } from '@/types/chat';

const AOI_AVATAR = 'https://randomuser.me/api/portraits/women/1.jpg';

const aoiActor = {
  actor_id: 'aoi',
  actor_type: 'PERSONA' as const,
  persona: { id: 'aoi', slug: 'aoi', name: 'Aoi', avatar: AOI_AVATAR },
};

export const mockAoiConversation: Conversation = {
  id: 'aoi-conversation',
  title: 'Aoi',
  type: 'PERSONA',
  participants: [
    { id: 'current-user', name: 'You', is_agent: false },
    {
      id: 'aoi',
      name: 'Aoi',
      avatar: AOI_AVATAR,
      is_agent: true,
      persona: { id: 'aoi', slug: 'aoi' },
    },
  ],
  messages: [
    {
      id: 'welcome-message',
      conversation_id: 'aoi-conversation',
      content: [{ type: 'text', text: "Hello! I'm Aoi. How can I help you today?" }],
      seq: '1',
      timestamp: new Date().toISOString(),
      sender: aoiActor,
      type: 'text',
      status: 'sent',
    },
  ],
  last_activity: new Date().toISOString(),
  unread_count: 0,
};

export const createMockConversation = (): Conversation => ({ ...mockAoiConversation });

export const generateResponse = (conversationId: string, message: string): WireMessage => {
  const isAoi = conversationId.includes('aoi');
  const text = isAoi ? generateAssistantCopy(message) : 'Got it. Anything else?';

  return {
    id: `${isAoi ? 'aoi' : 'assistant'}-${Date.now()}`,
    conversation_id: conversationId,
    content: [{ type: 'text', text }],
    seq: `${Date.now()}`,
    timestamp: new Date().toISOString(),
    sender: isAoi
      ? aoiActor
      : {
          actor_id: 'assistant',
          actor_type: 'PERSONA',
          persona: { id: 'assistant', slug: 'assistant', name: 'Assistant' },
        },
    type: 'text',
    status: 'sent',
  };
};

const generateAssistantCopy = (message: string): string => {
  const m = message.toLowerCase();
  if (m.includes('hello') || m.includes('hi')) return 'Hello! How can I assist you today?';
  if (m.includes('help')) return "I'm here to help! What would you like to know?";
  if (m.includes('time')) return `The current time is ${new Date().toLocaleTimeString()}.`;
  if (m.includes('thank')) return "You're welcome! Feel free to ask me anything!";

  const responses = [
    "That's interesting! Tell me more.",
    'I understand. How can I help you with this?',
    'Thanks for sharing. What would you like to do next?',
    'I see. Is there anything specific I can help with?',
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};
