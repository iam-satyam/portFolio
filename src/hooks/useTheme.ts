import { useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';
const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const transitionTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f7f9fc' : '#080a0c');
  }, [theme]);

  useEffect(() => {
    const syncPreference = (event: StorageEvent) => {
      if (event.key !== 'portfolio-theme' && event.key !== null) return;
      setTheme(isTheme(event.newValue) ? event.newValue : 'dark');
    };
    window.addEventListener('storage', syncPreference);
    return () => {
      window.removeEventListener('storage', syncPreference);
      window.clearTimeout(transitionTimer.current);
      document.documentElement.classList.remove('theme-changing');
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', next); } catch { /* The theme still works without storage. */ }
    document.documentElement.classList.add('theme-changing');
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-changing');
    }, 240);
    setTheme(next);
  };

  return { theme, toggleTheme };
};
