'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink } from '@/components/shared/Icons';
import { Participant } from '@/types/chat';

interface ChatHeaderProps {
  participant: Participant;
  onOpenFullChat: () => void;
}

const ParticipantInfo = ({ participant }: { participant: Participant }) => {
  return (
    <div className="relative flex items-center gap-3">
      <div className="from-accent/90 to-primary/90 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r">
        {participant.avatar ? (
          <Image
            src={participant.avatar}
            alt={participant.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="font-medium text-white">{participant.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div>
        <h3 className="leading-tight font-medium">{participant.name}</h3>
        <p className="text-muted-foreground text-xs">
          {participant.is_agent ? 'AI Assistant' : 'User'}
        </p>
      </div>
    </div>
  );
};

export const ChatHeader = ({ participant, onOpenFullChat }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between pb-3">
      <ParticipantInfo participant={participant} />
      <Button variant="outline" size="sm" onClick={onOpenFullChat} className="ml-auto text-xs">
        <ExternalLink className="h-1 w-1" />
        Full Chat
      </Button>
    </div>
  );
};
