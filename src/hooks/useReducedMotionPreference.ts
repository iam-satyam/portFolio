import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const getSnapshot = () => window.matchMedia(query).matches;
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

// Subscribe directly so an OS preference change also stops running timers.
export const useReducedMotionPreference = () => useSyncExternalStore(subscribe, getSnapshot, () => true);
