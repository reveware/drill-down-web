'use client';
import { Pen, Bomb, MessageCircle, Bot } from '@/components/shared/Icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { CreatePost } from '../../../features/posts/';
import { Chat } from '@/features/chat/components/Chat/Chat';
import { useCompanion } from '@/features/persona/hooks/useCompanion';
import {
  ribbonAnimation,
  actionButtonAnimation,
  mainButtonAnimation,
} from './FloatingActionButton.animations';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useModal } from '@/hooks/useModal';

interface Action {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}
interface FloatingActionButtonProps {
  className?: string;
}

export const ActionIcon = ({ icon: Icon }: Action) => {
  return <Icon size={20} />;
};

export const FloatingActionButton = ({ className }: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openModal, closeModal } = useModal();
  const { data: companion } = useCompanion();

  const handleActionClick = (action: Action) => {
    if (action.disabled) return;
    openModal({ id: action.title, title: action.title, content: action.content });
    setIsExpanded(false);
  };

  const actions: Action[] = [
    {
      icon: Pen,
      title: 'Create Post',
      content: <CreatePost onSuccess={closeModal} />,
    },
    {
      icon: Bomb,
      title: 'Locked Post',
      content: <CreatePost onSuccess={closeModal} />,
    },
    {
      icon: MessageCircle,
      title: 'Chat',
      disabled: !companion,
      content: companion ? <Chat init={{ byPersonaSlug: companion.slug }} /> : null,
    },
  ];

  const ActionRibbon = () => (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          {...ribbonAnimation}
          className="absolute right-0 bottom-full mb-4 flex flex-col items-end gap-4"
        >
          {actions.map((action, index) => (
            <Tooltip key={action.title}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => handleActionClick(action)}
                  className={`bg-secondary text-secondary-foreground flex h-12 w-12 items-center justify-center rounded-full shadow-md ${action.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={actionButtonAnimation.animate(index)}
                  exit={actionButtonAnimation.exit}
                  transition={actionButtonAnimation.transition}
                  whileHover={actionButtonAnimation.whileHover}
                >
                  <ActionIcon {...action} />
                </motion.button>
              </TooltipTrigger>

              {/* Tooltip on the LEFT so it doesn't cover the buttons */}
              <TooltipContent side="left" sideOffset={6}>
                {action.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={cn('fixed right-8 bottom-8 z-50', className)}>
      <div className="relative">
        <ActionRibbon />
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'h-14 w-14 rounded-full',
            'bg-primary text-primary glow-md',
            'flex items-center justify-center',
            'hover:cursor-pointer'
          )}
          animate={mainButtonAnimation.animate(isExpanded)}
          transition={mainButtonAnimation.transition}
          whileHover={mainButtonAnimation.whileHover}
        >
          <Bot className="text-primary-foreground" size={40} />
        </motion.button>
      </div>
    </div>
  );
};
