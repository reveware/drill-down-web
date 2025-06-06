'use client';
import { useEffect, useState } from 'react';

export const useCountdown = (target: string | undefined | null): number => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!target) {
      return;
    }
    console.log('target', target);
    const unlockTime = new Date(target).getTime();
    const update = () => setRemaining(Math.max(0, unlockTime - Date.now()));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return remaining;
};
