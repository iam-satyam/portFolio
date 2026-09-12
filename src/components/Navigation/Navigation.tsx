import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'skills', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Highlights' },
];

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotionPreference();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)');
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const content = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.nav-inner')];
    const previousInert = content.map(element => element?.hasAttribute('inert'));
    content.forEach(element => element?.setAttribute('inert', ''));
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key !== 'Tab') return;
      const buttons = menuRef.current?.querySelectorAll<HTMLButtonElement>('button');
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      content.forEach((element, index) => { if (!previousInert[index]) element?.removeAttribute('inert'); });
      window.removeEventListener('keydown', onKeyDown);
      menuButton?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  const mobileItems = [{ id: 'home', label: 'Home' }, ...navItems, { id: 'contact', label: 'Contact' }];

  return (
    <>
      <motion.nav
        aria-label="Primary navigation"
        initial={reducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}
      >
        <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
        <div className="nav-inner">
          <button className="wordmark" onClick={() => scrollToSection('home')} aria-label="Go to home">
            <span className="wordmark-mark" aria-hidden="true">S</span>
            <span className="wordmark-name">Satyam Singh</span>
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? 'is-active' : ''}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <motion.span key={theme} initial={reducedMotion ? false : { rotate: -45, scale: 0.7, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.22 }}>
                {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              </motion.span>
              <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button className="nav-cta" onClick={() => scrollToSection('contact')}>
              Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
            </button>

            <button
              className="menu-toggle"
              ref={menuButtonRef}
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-controls">
              <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="menu-toggle" onClick={() => setIsOpen(false)} aria-label="Close navigation menu"><X size={21} /></button>
            </div>
            <motion.div
              className="mobile-menu-inner"
              initial={reducedMotion ? false : { y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            >
              <span className="eyebrow">Navigate</span>
              {mobileItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                  onClick={() => scrollToSection(item.id)}
                  className={activeSection === item.id ? 'is-active' : ''}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <p>React Native engineer · New Delhi, India</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
