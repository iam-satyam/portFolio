import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  DatabaseZap,
  Download,
  ExternalLink,
  Gauge,
  Layers3,
  MapPin,
  Pause,
  Play,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

const metrics = [
  { value: '7', label: 'production apps' },
  { value: '600+', label: 'DSA problems solved' },
  { value: '30%', label: 'faster delivery' },
];

const headlineLines = [
  { text: 'I engineer', emphasis: false },
  { text: 'mobile products', emphasis: true },
  { text: 'built for the', emphasis: false },
  { text: 'real world.', emphasis: true },
];

const subtitle =
  'Building scalable React Native applications for enterprise products, high-traffic commerce, and offline-first mobile experiences.';

const expertise = [
  'React Native',
  'Enterprise Mobile Apps',
  'Offline-First Systems',
  'High Performance UI',
  'Analytics Integration',
  'Native SDKs',
  'Scalable Architecture',
];

const trustIndicators = [
  '2+ Years Experience',
  '7 Production Apps',
  'React Native Specialist',
];

const engineeringHighlights = [
  { label: 'Performance Optimized', icon: Gauge },
  { label: 'Offline First', icon: DatabaseZap },
  { label: 'Production Ready', icon: ShieldCheck },
  { label: 'Analytics Driven', icon: BarChart3 },
  { label: 'Scalable Architecture', icon: Layers3 },
  { label: 'Native Integrations', icon: Boxes },
];

const phoneProjects = [
  {
    id: 'ajio',
    title: 'AJIO',
    eyebrow: 'Enterprise commerce',
    description: 'High-scale shopping experiences across checkout, analytics, and engagement.',
    technologies: ['React Native', 'TypeScript', 'AppsFlyer'],
    image: '/images/ajio-app.png',
    accent: '#ff8a6b',
    metric: 'Enterprise',
    metricLabel: 'High-traffic commerce',
    notification: 'Commerce journey healthy',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.ril.ajio&hl=en_IN',
    liveLabel: 'View live app',
  },
  {
    id: 'shein',
    title: 'SHEIN India',
    eyebrow: 'High-traffic commerce',
    description: 'Production shopping journeys spanning discovery, cart, and checkout.',
    technologies: ['React Native', 'TypeScript', 'Reanimated'],
    image: '/images/shein-app.png',
    accent: '#c5ff9d',
    metric: 'Production',
    metricLabel: 'iOS + Android delivery',
    notification: 'All commerce signals healthy',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.ril.shein&hl=en_IN',
    liveLabel: 'View live app',
  },
  {
    id: 'gotopass',
    title: 'GoToPass',
    eyebrow: 'Travel & hospitality',
    description: 'A unified loyalty experience for reservations, points, stages, and benefits.',
    technologies: ['React Native', 'Redux', 'Firebase'],
    image: '/images/gotopass-app.jpg',
    accent: '#d9a852',
    metric: 'One pass',
    metricLabel: 'Multi-property loyalty',
    notification: 'Membership data refreshed',
    liveUrl: 'https://play.google.com/store/apps/details?id=jp.gotopass.app&hl=en_IN',
    liveLabel: 'View live app',
  },
  {
    id: 'podium',
    title: 'Podium5',
    eyebrow: 'Maritime operations',
    description: 'Mission-critical fleet tracking and ship security workflows for mobile.',
    technologies: ['React Native', 'TypeScript', 'REST APIs'],
    image: '/images/podium5-logo.png',
    accent: '#58c8ff',
    metric: 'Global',
    metricLabel: 'Maritime operations',
    notification: 'Fleet positions updated',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.stratumfive_mobileapp&hl=en_IN',
    liveLabel: 'View live app',
  },
  {
    id: 'sail',
    title: 'SAIL CRM',
    eyebrow: 'Enterprise CRM',
    description: 'Field-ready customer workflows designed for unreliable connectivity.',
    technologies: ['React Native', 'Firebase', 'Google SDKs'],
    image: '/images/sail-appstore.png',
    accent: '#6ca7ff',
    metric: '10K+',
    metricLabel: 'Field-workforce use case',
    notification: 'Field activity synced',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.successive.sailGrahak&hl=en_IN',
    liveLabel: 'View live app',
  },
  {
    id: 'nexo',
    title: 'Nexo',
    eyebrow: 'Kiosk operations',
    description: 'Offline-first enterprise operations across inventory, sales, and attendance.',
    technologies: ['React Native', 'Realm DB', 'Redux'],
    image: '/images/nexo-logo.png',
    accent: '#bf8cff',
    metric: 'Offline-first',
    metricLabel: 'Realm sync architecture',
    notification: '12 offline records synced',
    liveUrl: 'https://drive.google.com/file/d/1rm1fGMuNvzxTWs_Tq-QTaSu--h8IJDMV/view?usp=sharing',
    liveLabel: 'Watch demo',
  },
  {
    id: 'easyguest',
    title: 'EasyGuest',
    eyebrow: 'Visitor security',
    description: 'Identity-assisted visitor management with reliable check-in workflows.',
    technologies: ['React Native', 'Firebase', 'OpenCV'],
    image: '/images/easyguest-launch.png',
    accent: '#72e5cb',
    metric: 'Identity-assisted',
    metricLabel: 'Secure visitor intake',
    notification: 'Visitor verification complete',
    liveUrl: 'https://apps.apple.com/us/app/easyguest-vms/id6744635281?platform=ipad',
    liveLabel: 'View live app',
  },
] as const;

const sequenceItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const headlineLine = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const handleMagneticMove = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  element.style.setProperty('--magnetic-x', `${x * 9}px`);
  element.style.setProperty('--magnetic-y', `${y * 7}px`);
  element.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`);
  element.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`);
};

const resetMagneticButton = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.style.setProperty('--magnetic-x', '0px');
  event.currentTarget.style.setProperty('--magnetic-y', '0px');
};

const Hero = () => {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activePhoneProject, setActivePhoneProject] = useState(0);
  const [isPhonePaused, setIsPhonePaused] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const reducedMotion = useReducedMotionPreference();
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const copyInView = useInView(heroCopyRef);
  const phoneInView = useInView(heroVisualRef, { amount: 0.2 });
  const autoRotate = !isPhonePaused && !rotationPaused && !phoneFocused && !reducedMotion && phoneInView && pageVisible;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion || !copyInView || !pageVisible) return;
    const interval = window.setInterval(() => {
      setActiveExpertise((current) => (current + 1) % expertise.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [reducedMotion, copyInView, pageVisible]);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = window.setInterval(() => {
      setActivePhoneProject((current) => (current + 1) % phoneProjects.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [autoRotate]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  const handleCopyPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const copy = heroCopyRef.current;
    if (!copy) return;
    const bounds = copy.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const normalizedX = x / bounds.width - 0.5;
    const normalizedY = y / bounds.height - 0.5;
    copy.style.setProperty('--copy-x', `${x}px`);
    copy.style.setProperty('--copy-y', `${y}px`);
    copy.style.setProperty('--headline-shift-x', `${normalizedX * 5}px`);
    copy.style.setProperty('--headline-shift-y', `${normalizedY * 3}px`);
  };

  const resetCopyPointer = () => {
    const copy = heroCopyRef.current;
    if (!copy) return;
    copy.style.setProperty('--copy-x', '50%');
    copy.style.setProperty('--copy-y', '42%');
    copy.style.setProperty('--headline-shift-x', '0px');
    copy.style.setProperty('--headline-shift-y', '0px');
  };

  const handlePhonePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const visual = heroVisualRef.current;
    if (!visual) return;
    const bounds = visual.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const normalizedX = x / bounds.width - 0.5;
    const normalizedY = y / bounds.height - 0.5;
    visual.style.setProperty('--phone-tilt-x', `${normalizedY * -5}deg`);
    visual.style.setProperty('--phone-tilt-y', `${normalizedX * 7}deg`);
    visual.style.setProperty('--phone-light-x', `${(x / bounds.width) * 100}%`);
    visual.style.setProperty('--phone-light-y', `${(y / bounds.height) * 100}%`);
  };

  const resetPhonePointer = () => {
    const visual = heroVisualRef.current;
    if (!visual) return;
    visual.style.setProperty('--phone-tilt-x', '0deg');
    visual.style.setProperty('--phone-tilt-y', '0deg');
    visual.style.setProperty('--phone-light-x', '68%');
    visual.style.setProperty('--phone-light-y', '20%');
    setIsPhonePaused(false);
  };

  const activeProject = phoneProjects[activePhoneProject];

  return (
    <section id="home" className="hero section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-container hero-grid">
        <motion.div
          ref={heroCopyRef}
          className="hero-copy"
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          onPointerMove={handleCopyPointerMove}
          onPointerLeave={resetCopyPointer}
        >
          <div className="hero-copy-atmosphere" aria-hidden="true" />

          <motion.div className="availability hero-status-pill" variants={sequenceItem}>
            <span className="availability-dot" aria-hidden="true" />
            Available for opportunities
            <span className="availability-divider" aria-hidden="true" />
            <span className="availability-location">
              <MapPin size={12} aria-hidden="true" />
              New Delhi
            </span>
          </motion.div>

          <motion.h1
            className="hero-display"
            aria-label="I engineer mobile products built for the real world."
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.105 } },
            }}
          >
            {headlineLines.map((line) => (
              <motion.span
                className={`hero-display-line ${line.emphasis ? 'is-emphasis' : ''}`}
                key={line.text}
                aria-hidden="true"
                variants={headlineLine}
              >
                {line.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-lede hero-dynamic-subtitle"
            variants={sequenceItem}
          >
            {subtitle}
          </motion.p>

          <motion.div className="hero-expertise" variants={sequenceItem}>
            <span aria-hidden="true">→</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={expertise[activeExpertise]}
                initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
              >
                {expertise[activeExpertise]}
              </motion.strong>
            </AnimatePresence>
          </motion.div>

          <motion.div className="hero-actions hero-premium-actions" variants={sequenceItem}>
            <button
              className="button button-primary hero-magnetic-button"
              onClick={scrollToProjects}
              onPointerMove={handleMagneticMove}
              onPointerLeave={resetMagneticButton}
            >
              <span>Explore My Work</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <a
              className="button button-secondary hero-magnetic-button"
              href="/resume/Satyam_Singh_Resume.pdf"
              download="Satyam_Singh_Resume.pdf"
              onPointerMove={handleMagneticMove}
              onPointerLeave={resetMagneticButton}
            >
              <Download size={16} aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={sequenceItem} aria-label="Professional credibility">
            {trustIndicators.map((indicator) => (
              <span key={indicator}>
                <Check size={11} strokeWidth={3} aria-hidden="true" />
                {indicator}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="hero-engineering-highlights"
            variants={sequenceItem}
            aria-label="Engineering highlights"
          >
            {engineeringHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.label}
                >
                  <Icon size={13} aria-hidden="true" />
                  <span>{highlight.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          ref={heroVisualRef}
          className="hero-visual"
          data-rotating={autoRotate}
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handlePhonePointerMove}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') setIsPhonePaused(true); }}
          onPointerLeave={resetPhonePointer}
          onFocusCapture={() => setPhoneFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPhoneFocused(false); }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Interactive production project showcase"
        >
          <div className="visual-orbit orbit-one" aria-hidden="true" />
          <div className="visual-orbit orbit-two" aria-hidden="true" />

          <motion.div
            className="float-note float-note-top"
            animate={{ y: reducedMotion || !phoneInView ? 0 : [0, -4, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="float-note-signal" aria-hidden="true" />
            <span>
              <strong>7 production builds</strong>
              <small>live project rotation</small>
            </span>
          </motion.div>

          <div className="phone-stage">
            <div className="phone-shell premium-phone-shell">
              <div className="phone-frame-highlight" aria-hidden="true" />
              <div className="phone-top" aria-hidden="true">
                <span>9:41</span>
                <span className="phone-island">
                  <i />
                </span>
                <span className="signal-bars">▮▮▮</span>
              </div>

              <div className="phone-content project-phone-content">
                <div className="phone-project-nav">
                  <span>
                    <Smartphone size={11} aria-hidden="true" />
                    Production work
                  </span>
                  <strong>
                    {String(activePhoneProject + 1).padStart(2, '0')}
                    <i>/</i>
                    {String(phoneProjects.length).padStart(2, '0')}
                  </strong>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    className="phone-project-slide"
                    key={activeProject.id}
                    style={{ '--project-accent': activeProject.accent } as CSSProperties}
                    initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                    transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="phone-notification"
                      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0 : 0.25 }}
                    >
                      <span className="phone-notification-icon">
                        <Check size={10} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>
                        <strong>System update</strong>
                        <small>{activeProject.notification}</small>
                      </span>
                      <time>now</time>
                    </motion.div>

                    <div className="phone-project-preview">
                      <div className="phone-preview-grid" aria-hidden="true" />
                      <div className="phone-preview-orb" aria-hidden="true" />
                      <div className="phone-preview-toolbar">
                        <span>{activeProject.eyebrow}</span>
                        <i>
                          <span />
                          <span />
                          <span />
                        </i>
                      </div>
                      <motion.div
                        className={`phone-preview-logo is-${activeProject.id}`}
                        initial={reducedMotion ? false : { y: 8, rotate: -2 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ delay: 0.15, duration: 0.55 }}
                      >
                        <img
                          src={activeProject.image}
                          alt={`${activeProject.title} application icon`}
                          width="84"
                          height="84"
                        />
                      </motion.div>
                      <div className="phone-preview-metric">
                        <span>{activeProject.metric}</span>
                        <small>{activeProject.metricLabel}</small>
                      </div>
                      <div className="phone-preview-signals" aria-hidden="true">
                        {[34, 52, 43, 70, 61, 84, 76, 96].map((height, index) => (
                          <i key={`${activeProject.id}-${height}-${index}`} style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    </div>

                    <div className="phone-project-copy">
                      <span>{activeProject.eyebrow}</span>
                      <h2>{activeProject.title}</h2>
                      <p>{activeProject.description}</p>
                    </div>

                    <div className="phone-project-tech" aria-label={`${activeProject.title} technology stack`}>
                      {activeProject.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <a
                      className="phone-project-link"
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${activeProject.liveLabel}: ${activeProject.title}`}
                    >
                      <span>{activeProject.liveLabel}</span>
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </motion.article>
                </AnimatePresence>

                <div className="phone-carousel-progress" aria-label="Choose a project">
                  {phoneProjects.map((project, index) => (
                    <button
                      className={index === activePhoneProject ? 'is-active' : ''}
                      key={project.id}
                      type="button"
                      onClick={() => { setActivePhoneProject(index); setRotationPaused(true); }}
                      aria-label={`Show ${project.title}`}
                      aria-current={index === activePhoneProject ? 'true' : undefined}
                    >
                      <span />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-controls">
            <span>Explore the apps <span aria-hidden="true">·</span> {activePhoneProject + 1} / {phoneProjects.length}</span>
            {!reducedMotion && <button type="button" onClick={() => {
              setRotationPaused(paused => !paused);
              setPhoneFocused(false);
              setIsPhonePaused(false);
            }} aria-label={rotationPaused ? 'Play project slideshow' : 'Pause project slideshow'}>
              {rotationPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {rotationPaused ? 'Play' : 'Pause'}
            </button>}
          </div>

          <motion.div
            className="float-note float-note-bottom"
            animate={{ y: reducedMotion || !phoneInView ? 0 : [0, 4, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="float-number">2+</span>
            <span>
              years shipping
              <small>mobile products</small>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="site-container metrics-strip" aria-label="Career highlights">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
        <div className="metric-context">
          <span>Across commerce, enterprise, kiosks, visitor security, and maritime operations.</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
