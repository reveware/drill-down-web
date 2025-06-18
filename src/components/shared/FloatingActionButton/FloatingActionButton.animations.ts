import { Easing, Variants } from 'framer-motion';

export const ribbonAnimation: Variants = {
  initial: { opacity: 0, scale: 0.4 },
  animate: { opacity: 1, scale: 1.1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const actionButtonAnimation = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  },
  whileHover: {
    scale: 1.1,
  },
  transition: (index: number) => ({
    backgroundPosition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as Easing,
      delay: index * 1 + 0.5,
    },
    scale: {
      duration: 0.2,
      ease: 'easeOut' as Easing,
    },
  }),
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
