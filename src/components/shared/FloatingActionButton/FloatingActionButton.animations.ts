import { Easing } from 'framer-motion';

export const ribbonAnimation = {
  initial: { opacity: 0, scale: 0.9, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 8 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
};

export const actionButtonAnimation = {
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05, type: 'spring' as const, stiffness: 300 },
  }),
  transition: (index: number) => ({
    delay: 0,
    type: 'spring' as const,
    damping: 20,
    stiffness: 260,
  }),
  whileHover: { scale: 1.1 },
  exit: { opacity: 0, y: 12 },
};

export const mainButtonAnimation = {
  animate: (isExpanded: boolean) => ({
    rotate: isExpanded ? 45 : 0,
    scale: isExpanded ? 1.1 : 1,
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  }),
  whileHover: {
    scale: 1.1,
  },
  transition: {
    rotate: { duration: 0.2 },
    scale: { duration: 0.2 },
    backgroundPosition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as Easing,
    },
  },
};
