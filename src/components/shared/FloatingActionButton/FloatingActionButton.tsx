'use client';
import { Pen, Bomb, MessageCircle, Bot } from '@/components/shared/Icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { CreatePost } from '../../../features/posts/';
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

  const handleActionClick = (action: Action) => {
    openModal({
      id: action.title,
      title: action.title,
      content: action.content,
    });
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
      content: <CreatePost onSuccess={closeModal} />,
    },
  ];

  const ActionRibbon = () => {
    return (
      <div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div {...ribbonAnimation} className="absolute right-16 bottom-0 flex gap-4">
              {actions.map((action, index) => (
                <Tooltip key={action.title}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => handleActionClick(action)}
                      className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md hover:cursor-pointer"
                      animate={actionButtonAnimation.animate}
                      transition={actionButtonAnimation.transition(index)}
                      whileHover={actionButtonAnimation.whileHover}
                    >
                      <ActionIcon {...action} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={4}>
                    {action.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  return (
    <div className={cn('fixed right-8 bottom-8 z-50', className)}>
      <div className="relative">
        {/* Ribbon of actions */}
        <ActionRibbon />
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'h-14 w-14 rounded-full text-white shadow-lg',
            'flex items-center justify-center',

            'hover:cursor-pointer',
            'from-accent/90 to-primary/90 bg-gradient-to-r',
            'bg-[length:200%_200%] bg-[position:0%_50%]'
          )}
          animate={mainButtonAnimation.animate(isExpanded)}
          transition={mainButtonAnimation.transition}
          whileHover={mainButtonAnimation.whileHover}
        >
          <Bot className="text-on-primary" size={40} />
        </motion.button>
      </div>
    </div>
  );
};
