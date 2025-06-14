'use client';
import { Pen, Bomb, MessageCircle, Bot } from '@/components/shared/Icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Action {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  className?: string;
}

export const ActionIcon = ({ icon: Icon }: Action) => {
  return <Icon size={20} />;
};

export const FloatingActionButton = ({ className }: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions: Action[] = [
    {
      icon: Pen,
      label: 'Create Post',
      onClick: () => console.log('Create post'),
    },
    {
      icon: Bomb,
      label: 'Locked Post',
      onClick: () => console.log('Locked post'),
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      onClick: () => console.log('Chat'),
    },
  ];

  return (
    <div className={cn('fixed right-8 bottom-8 z-50', className)}>
      <div className="relative">
        {/* Ribbon of actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-16 bottom-0 flex gap-4"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.2 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={action.onClick}
                  className="bg-primary text-on-primary hover:bg-primary/90 flex items-center gap-2 rounded-full px-4 py-4 shadow-lg transition-colors hover:cursor-pointer"
                >
                  <ActionIcon {...action} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'h-14 w-14 rounded-full text-white shadow-lg',
            'flex items-center justify-center',
            'focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'hover:cursor-pointer',
            'from-accent/5 via-accent/80 to-primary bg-gradient-to-r',
            'bg-[length:200%_200%] bg-[position:0%_50%]'
          )}
          animate={{
            rotate: isExpanded ? 45 : 0,
            scale: isExpanded ? 1.1 : 1,
            backgroundPosition: !isExpanded ? ['0% 50%', '100% 50%', '0% 50%'] : undefined,
          }}
          transition={{
            rotate: { duration: 0.2 },
            scale: { duration: 0.2 },
            backgroundPosition: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <Bot className="text-on-primary" size={40} />
        </motion.button>
      </div>
    </div>
  );
};
