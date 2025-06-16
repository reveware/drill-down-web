'use client';
import { Pen, Bomb, MessageCircle, Bot } from '@/components/shared/Icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { CreatePost } from '../../../features/posts/';
import { ActionModal } from './ActionModal';
import { ribbonAnimation, actionButtonAnimation, mainButtonAnimation } from './animations';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleActionClick = (label: string) => {
    setActiveModal(label);
    setIsExpanded(false);
  };

  const closeModal = () => setActiveModal(null);

  const actions: Action[] = [
    {
      icon: Pen,
      title: 'Create Post',
      content: <CreatePost />,
    },
    {
      icon: Bomb,
      title: 'Locked Post',
      content: <CreatePost />,
    },
    {
      icon: MessageCircle,
      title: 'Chat',
      content: <CreatePost />,
    },
  ];

  return (
    <div className={cn('fixed right-8 bottom-8 z-50', className)}>
      <div className="relative">
        {/* Ribbon of actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div {...ribbonAnimation} className="absolute right-16 bottom-0 flex gap-4">
              {actions.map((action, index) => (
                <Tooltip key={action.title}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => handleActionClick(action.title)}
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

      <ActionModal
        title={actions.find((action) => action.title === activeModal)?.title || ''}
        isOpen={!!activeModal}
        content={actions.find((action) => action.title === activeModal)?.content}
        onClose={closeModal}
      />
    </div>
  );
};
