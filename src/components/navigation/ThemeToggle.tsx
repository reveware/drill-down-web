'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from '@/components/shared/icons';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  const targetTheme = isDark ? 'light' : 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <div
      className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
      onClick={() => setTheme(targetTheme)}
      aria-label={label}
    >
      <Icon className="text-current" size={20} />
      <span>{label}</span>
    </div>
  );
};
