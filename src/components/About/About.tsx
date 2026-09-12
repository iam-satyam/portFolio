import { useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import {
  Activity,
  Atom,
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  Braces,
  Check,
  Cloud,
  CloudCog,
  Code2,
  CreditCard,
  Database,
  DatabaseZap,
  FileCode2,
  Flame,
  Gauge,
  GitBranch,
  HardDrive,
  KeyRound,
  Layers3,
  Link2,
  ListChecks,
  Megaphone,
  MoveUpRight,
  Network,
  Rocket,
  Route,
  Smartphone,
  TestTube2,
  Timer,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Skill } from '../../types';

interface SkillsProps {
  skills: Skill[];
}

const capabilities = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Mobile product engineering',
    description:
      'End-to-end React Native delivery with secure payments, platform SDKs, deep linking, and store-ready releases.',
    detail: 'Juspay · Razorpay · Google SDKs · deferred deep links',
  },
  {
    number: '02',
    icon: DatabaseZap,
    title: 'Resilient data systems',
    description:
      'Offline-first workflows, predictable state, caching, pagination, and sync strategies that keep products usable.',
    detail: 'Realm · Redux · REST · GraphQL',
  },
  {
    number: '03',
    icon: Gauge,
    title: 'Performance & craft',
    description:
      'Responsive interfaces, reusable systems, and measured animation tuned for smooth interaction on real devices.',
    detail: 'Reanimated · profiling · design systems',
  },
];

const categoryOrder: Skill['category'][] = [
  'Mobile',
  'Frontend',
  'Backend',
  'Analytics',
  'Database',
  'Tools',
];

interface CategoryMeta {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SkillMeta {
  badge: string;
  credibility: string;
  icon: LucideIcon;
}

interface EngineeringStat {
  label: string;
  icon: LucideIcon;
  value?: number;
  suffix?: string;
  display?: string;
}

const categoryMeta: Partial<Record<Skill['category'], CategoryMeta>> = {
  Mobile: {
    title: 'Mobile Engineering',
    description:
      'Building scalable cross-platform mobile applications with production-ready architecture, native SDKs, payments, and release pipelines.',
    icon: Smartphone,
  },
  Frontend: {
    title: 'Frontend Engineering',
    description:
      'Designing predictable interface architecture, scalable state, and type-safe product experiences.',
    icon: Layers3,
  },
  Backend: {
    title: 'Backend Integration',
    description:
      'Building secure, scalable API integrations, authentication flows, and connected platform services.',
    icon: CloudCog,
  },
  Analytics: {
    title: 'Analytics & User Intelligence',
    description:
      'Implementing analytics, attribution, customer engagement, and user behavior tracking.',
    icon: BarChart3,
  },
  Database: {
    title: 'Offline Storage & Databases',
    description:
      'Engineering resilient local persistence, offline-first workflows, and dependable data layers.',
    icon: DatabaseZap,
  },
  Tools: {
    title: 'Developer Tools',
    description:
      'Shipping confidently through disciplined source control, testing, native tooling, and delivery workflows.',
    icon: Gauge,
  },
};

const skillMeta: Record<string, SkillMeta> = {
  'React Native': { badge: 'Production', credibility: 'Built and shipped production apps', icon: Atom },
  Kotlin: { badge: 'Native', credibility: 'Android platform integrations', icon: Code2 },
  Juspay: { badge: 'Payments', credibility: 'Secure checkout integration', icon: CreditCard },
  Razorpay: { badge: 'Payments', credibility: 'Production payment flows', icon: CreditCard },
  'Google SDKs': { badge: 'Platform', credibility: 'Native platform capabilities', icon: Boxes },
  'Deferred Deep Links': {
    badge: 'Growth',
    credibility: 'Context-aware app routing',
    icon: Link2,
  },
  'Push Notifications': {
    badge: 'Engagement',
    credibility: 'Lifecycle messaging',
    icon: BellRing,
  },
  'CI/CD Pipeline Creation': {
    badge: 'Delivery',
    credibility: 'Automated build and release',
    icon: GitBranch,
  },
  TypeScript: { badge: 'Type Safety', credibility: 'Maintainable product code', icon: Braces },
  JavaScript: { badge: 'Core', credibility: 'Cross-platform application logic', icon: Code2 },
  Redux: { badge: 'Enterprise', credibility: 'Large-scale state management', icon: Workflow },
  Zustand: { badge: 'State', credibility: 'Lightweight state architecture', icon: Zap },
  'Context API': { badge: 'Architecture', credibility: 'Scoped application state', icon: Network },
  'REST APIs': { badge: 'Integration', credibility: 'Enterprise backend integration', icon: Cloud },
  GraphQL: { badge: 'API', credibility: 'Typed data orchestration', icon: Network },
  Supabase: { badge: 'Platform', credibility: 'Cloud data services', icon: Database },
  'Google Apps Script': {
    badge: 'Automation',
    credibility: 'Connected workflow integrations',
    icon: FileCode2,
  },
  AppsFlyer: { badge: 'Attribution', credibility: 'Attribution and deep linking', icon: Route },
  Amplitude: { badge: 'Event Tracking', credibility: 'User behavior analytics', icon: Activity },
  GA4: { badge: 'Measurement', credibility: 'Product and acquisition insights', icon: BarChart3 },
  CleverTap: { badge: 'Engagement', credibility: 'Customer engagement', icon: Megaphone },
  Firebase: { badge: 'Platform', credibility: 'Analytics, auth, and notifications', icon: Flame },
  SQLite: { badge: 'Local Data', credibility: 'Structured device storage', icon: Database },
  'Realm Database': {
    badge: 'Offline First',
    credibility: 'Offline-first architecture',
    icon: DatabaseZap,
  },
  AsyncStorage: { badge: 'Persistence', credibility: 'Fast key-value persistence', icon: HardDrive },
  Git: { badge: 'Version Control', credibility: 'Collaborative delivery', icon: GitBranch },
  'Android Studio': { badge: 'Android', credibility: 'Native build and debugging', icon: Bot },
  Xcode: { badge: 'iOS', credibility: 'iOS build and release', icon: Wrench },
  'Visual Studio': { badge: 'IDE', credibility: 'Integrated development workflow', icon: Code2 },
  Jest: { badge: 'Testing', credibility: 'Reliable unit test coverage', icon: TestTube2 },
  JIRA: { badge: 'Delivery', credibility: 'Agile planning and execution', icon: ListChecks },
};

const engineeringStats: EngineeringStat[] = [
  { value: 7, suffix: '+', label: 'Production apps', icon: Smartphone },
  { value: 2, suffix: '+', label: 'Years experience', icon: Timer },
  { display: 'Enterprise', label: 'Application delivery', icon: Rocket },
  { value: 5, suffix: '+', label: 'Analytics integrations', icon: BarChart3 },
  { display: 'Offline-first', label: 'Architecture', icon: DatabaseZap },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.045,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
};

const AnimatedStat = ({ stat, index }: { stat: EngineeringStat; index: number }) => {
  const statRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotionPreference();
  const value = useMotionValue(reduceMotion ? (stat.value ?? 0) : 0);
  const roundedValue = useTransform(value, (latest) => Math.round(latest));
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView || stat.value === undefined) return;
    if (reduceMotion) {
      value.set(stat.value);
      return;
    }

    const controls = animate(value, stat.value, {
      duration: 0.75,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [index, isInView, reduceMotion, stat.value, value]);

  return (
    <motion.div
      className="engineering-stat"
      ref={statRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.055 }}
      viewport={{ once: true, amount: 0.65 }}
    >
      <Icon size={16} aria-hidden="true" />
      <div>
        <strong>
          {stat.value !== undefined ? <motion.span>{roundedValue}</motion.span> : stat.display}
          {stat.suffix}
        </strong>
        <span>{stat.label}</span>
      </div>
    </motion.div>
  );
};

const About = ({ skills }: SkillsProps) => {
  return (
    <section id="skills" className="section expertise-section">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><span>01</span> Expertise</span>
            <h2>Built for the messy middle between idea and production.</h2>
          </div>
          <p>
            I work across the product surface, but my sharpest edge is mobile: turning demanding
            requirements into calm, maintainable software that performs outside the happy path.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.article
                className={`capability-card ${index === 0 ? 'is-featured' : ''}`}
                key={capability.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="capability-top">
                  <span>{capability.number}</span>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className="capability-detail">
                  {capability.detail}
                  <MoveUpRight size={15} aria-hidden="true" />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="skills-console">
          <div className="skills-console-head">
            <div>
              <span className="eyebrow">Technical signal</span>
              <h3>A production toolkit built around integration.</h3>
            </div>
            <p>
              Mobile delivery, payments, attribution, analytics, automation, and platform services
              organized around the work they enable.
            </p>
          </div>

          <div className="engineering-stats" aria-label="Engineering experience summary">
            {engineeringStats.map((stat, index) => (
              <AnimatedStat key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          <div className="skills-console-body">
            <div className="skill-groups" aria-label="Technical toolkit">
              {categoryOrder.map((category, categoryIndex) => {
                const categorySkills = skills.filter((skill) => skill.category === category);
                if (!categorySkills.length) return null;
                const meta = categoryMeta[category];
                if (!meta) return null;
                const CategoryIcon = meta.icon;

                return (
                  <motion.article
                    className={`skill-group ${
                      category === 'Mobile' || category === 'Analytics' ? 'is-highlighted' : ''
                    }`}
                    data-category={category.toLowerCase()}
                    key={category}
                    tabIndex={0}
                    aria-labelledby={`skill-category-${category.toLowerCase()}`}
                    onPointerMove={handleCardPointerMove}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    whileHover={{ y: -5 }}
                    transition={{ delay: categoryIndex * 0.035 }}
                  >
                    <div className="skill-group-header">
                      <div className="skill-group-icon">
                        <CategoryIcon size={20} aria-hidden="true" />
                      </div>
                      <div className="skill-group-title">
                        <div>
                          <h4 id={`skill-category-${category.toLowerCase()}`}>{meta.title}</h4>
                          <span>{categorySkills.length.toString().padStart(2, '0')} capabilities</span>
                        </div>
                        <p>{meta.description}</p>
                      </div>
                    </div>

                    <motion.div className="skill-tags" role="list" variants={cardVariants}>
                      {categorySkills.map((skill) => {
                        const technology = skillMeta[skill.name] ?? {
                          badge: 'Production',
                          credibility: 'Applied in product delivery',
                          icon: KeyRound,
                        };
                        const TechnologyIcon = technology.icon;

                        return (
                          <motion.div
                            className="skill-item"
                            key={skill.name}
                            role="listitem"
                            variants={skillVariants}
                          >
                            <div className="skill-item-icon">
                              <TechnologyIcon size={17} aria-hidden="true" />
                            </div>
                            <div className="skill-item-copy">
                              <strong>{skill.name}</strong>
                              <span>{technology.credibility}</span>
                            </div>
                            <small>
                              <Check size={11} strokeWidth={3} aria-hidden="true" />
                              {technology.badge}
                            </small>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
