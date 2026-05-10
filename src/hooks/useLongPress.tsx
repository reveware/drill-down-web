import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  /** Duration in ms before the press is considered "long". Default: 500 */
  threshold?: number;
  /** Called when a long press is detected. */
  onLongPressed: (e: React.TouchEvent | React.MouseEvent) => void;
}

/**
 * Returns event handlers (`onTouchStart`, `onTouchEnd`, `onTouchMove`,
 * `onContextMenu`) that detect a long press / hold gesture.
 *
 * Works on both touch (mobile) and mouse (desktop right-click is suppressed
 * in favor of `onLongPressed`). Movement cancels the press.

 */
export const useLongPress = ({ onLongPressed, threshold = 500 }: UseLongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const didLongPressRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      didLongPressRef.current = false;
      timerRef.current = setTimeout(() => {
        didLongPressRef.current = true;
        onLongPressed(e);
      }, threshold);
    },
    [onLongPressed, threshold]
  );

  const onTouchEnd = useCallback(() => {
    clear();
  }, [clear]);

  const onTouchMove = useCallback(() => {
    // Movement cancels the long press (user is scrolling)
    clear();
  }, [clear]);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    // On mobile, contextmenu fires after the long-press browser behavior.
    // Suppress the native menu so our handler takes over.
    if (didLongPressRef.current) {
      e.preventDefault();
    }
  }, []);

  return { onTouchStart, onTouchEnd, onTouchMove, onContextMenu };
};
