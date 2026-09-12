import { ArrowUp, Code2, Linkedin } from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

const Footer = () => {
  const reducedMotion = useReducedMotionPreference();
  return (
    <footer className="footer">
      <div className="site-container footer-inner">
        <div className="footer-signoff">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <div>
            <strong>Satyam Singh</strong>
            <span>Mobile products, engineered with care.</span>
          </div>
        </div>

        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Satyam Singh</span>
          <span>Built with React, TypeScript & restraint</span>
          <span>v2.0</span>
        </div>

        <div className="footer-actions">
          <a
            href="https://www.linkedin.com/in/satyam-a4791321a/"
            target="_blank"
            rel="noreferrer"
            aria-label="Satyam on LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://leetcode.com/u/satyamEpoch"
            target="_blank"
            rel="noreferrer"
            aria-label="Satyam on LeetCode"
          >
            <Code2 size={16} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <p className="footer-legal">
          Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other
          countries. Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
