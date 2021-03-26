import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const eventListener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', eventListener);
    document.addEventListener('touchstart', eventListener);

    return () => {
      document.removeEventListener('mousedown', eventListener);
      document.removeEventListener('touchstart', eventListener);
    };
  }, [handler]);
};
