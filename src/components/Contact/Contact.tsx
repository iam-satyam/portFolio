import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Copy, Download, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import type { ContactInfo } from '../../types';

interface ContactProps {
  contactInfo: ContactInfo;
}

const Contact = ({ contactInfo }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Satyam,\n\n${formData.message}\n\nBest,\n${formData.name}\n${formData.email}`,
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="site-container">
        <motion.div
          className="contact-frame"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="contact-copy">
            <span className="eyebrow"><span>05</span> Start a conversation</span>
            <h2>Building something mobile that needs to be excellent?</h2>
            <p>
              I’m interested in thoughtful product teams, ambitious mobile problems, and work where
              engineering quality is part of the user experience.
            </p>

            <div className="contact-status">
              <span className="availability-dot" aria-hidden="true" />
              Open to React Native and full-stack product opportunities
            </div>

            <div className="direct-contact">
              <a href={`mailto:${contactInfo.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span><small>Email</small>{contactInfo.email}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <div className="contact-links">
              {contactInfo.linkedin && (
                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} aria-hidden="true" /> LinkedIn
                </a>
              )}
              {contactInfo.leetcode && (
                <a href={contactInfo.leetcode} target="_blank" rel="noreferrer">
                  <Code2 size={16} aria-hidden="true" /> LeetCode
                </a>
              )}
              <span><MapPin size={16} aria-hidden="true" /> New Delhi, India</span>
            </div>

            <a
              className="resume-link"
              href="/resume/Satyam_Singh_Resume.pdf"
              download="Satyam_Singh_Resume.pdf"
            >
              <Download size={16} aria-hidden="true" />
              Download complete resume
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <span>Send a note</span>
              <small>Opens in your email app</small>
            </div>

            <label>
              <span>Your name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Jane Smith"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              />
            </label>

            <label>
              <span>Work email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
            </label>

            <label>
              <span>What are you building?</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="A little context about the product, team, or role…"
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              />
            </label>

            <button className="button button-primary" type="submit">
              Open email draft <Send size={16} aria-hidden="true" />
            </button>
            <p className="form-note" aria-live="polite">
              {draftOpened
                ? 'Your email app should now have a pre-filled draft. Nothing was sent automatically.'
                : 'This opens a pre-filled draft in your email app.'}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
