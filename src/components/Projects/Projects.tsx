import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import {
  ArrowUpRight,
  Check,
  CircleGauge,
  Database,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import type { CaseStudyProject, ProjectGroup } from '../../types';

interface ProjectsProps {
  projects: CaseStudyProject[];
}

const filters: Array<'All' | ProjectGroup> = ['All', 'Commerce', 'Travel', 'Enterprise'];

const BrandImage = ({ project }: { project: CaseStudyProject }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="case-logo">
      {!loaded && <span className="case-logo-skeleton" aria-hidden="true" />}
      <img
        className={loaded ? 'is-loaded' : ''}
        src={project.image}
        alt={`${project.title} app icon`}
        width="112"
        height="112"
        loading={project.featured ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

const DeviceScreen = ({ project }: { project: CaseStudyProject }) => {
  return (
    <div className={`device-screen screen-${project.visual}`}>
      <div className="device-status">
        <span>9:41</span>
        <i />
        <span>● ● ●</span>
      </div>
      <div className="device-app-head">
        <BrandImage project={project} />
        <div>
          <small>{project.client}</small>
          <strong>{project.title}</strong>
        </div>
      </div>

      {project.visual === 'commerce' && (
        <>
          <div className="mock-search">Search styles and products</div>
          <div className="commerce-hero">
            <span>NEW SEASON</span>
            <strong>Made for now.</strong>
            <button>Explore</button>
          </div>
          <div className="product-tiles">
            <span /><span /><span />
          </div>
        </>
      )}

      {project.visual === 'loyalty' && (
        <>
          <div className="loyalty-card">
            <span>MEMBER PASS</span>
            <strong>Gold</strong>
            <small>2,480 available points</small>
            <i />
          </div>
          <div className="reservation-card">
            <span>UPCOMING STAY</span>
            <strong>Hakone · 18 Aug</strong>
            <small>Reservation confirmed</small>
          </div>
          <div className="device-action-row"><span>Rewards</span><span>Bookings</span><span>Pass</span></div>
        </>
      )}

      {project.visual === 'maritime' && (
        <>
          <div className="maritime-map">
            <span className="map-route route-one" />
            <span className="map-route route-two" />
            <i className="vessel vessel-one">▲</i>
            <i className="vessel vessel-two">▲</i>
            <small>Live fleet · 08 vessels</small>
          </div>
          <div className="alert-card">
            <ShieldCheck size={15} />
            <span><strong>Security status</strong><small>All signals normal</small></span>
          </div>
        </>
      )}

      {project.visual === 'crm' && (
        <>
          <div className="crm-summary">
            <span><small>Today</small><strong>12 visits</strong></span>
            <span><small>Follow-ups</small><strong>08</strong></span>
          </div>
          <div className="crm-list">
            {['Customer meeting', 'Dealer follow-up', 'Visit report'].map((item, index) => (
              <div key={item}><i>{index + 1}</i><span><strong>{item}</strong><small>Synced · just now</small></span><Check size={13} /></div>
            ))}
          </div>
        </>
      )}

      {project.visual === 'kiosk' && (
        <>
          <div className="kiosk-summary">
            <span>SHIFT OVERVIEW</span>
            <strong>₹48,240</strong>
            <small>Sales today · synced locally</small>
          </div>
          <div className="inventory-bars">
            {[72, 48, 88, 58, 94, 67, 81].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="sync-state"><Database size={13} /> Offline data ready <span>●</span></div>
        </>
      )}

      {project.visual === 'visitor' && (
        <>
          <div className="visitor-frame">
            <div className="face-target"><span /><span /><span /><span /></div>
            <div className="qr-pattern" />
          </div>
          <div className="visitor-state">
            <Check size={14} />
            <span><strong>Identity verified</strong><small>Visitor pass generated</small></span>
          </div>
        </>
      )}

      <div className="device-home" />
    </div>
  );
};

const StoreLinks = ({ project }: { project: CaseStudyProject }) => {
  const { android, ios, demo } = project.storeLinks;

  return (
    <div className="store-links">
      {android && (
        <a
          className="store-badge-link"
          href={android}
          target="_blank"
          rel="noreferrer"
          aria-label={`Get ${project.title} on Google Play`}
        >
          <img
            src="/badges/google-play-badge.png"
            alt="Get it on Google Play"
            width="103"
            height="40"
            loading="lazy"
          />
        </a>
      )}
      {ios && (
        <a
          className="store-badge-link"
          href={ios}
          target="_blank"
          rel="noreferrer"
          aria-label={`Download ${project.title} on the App Store`}
        >
          <img
            src="/badges/app-store-badge.svg"
            alt="Download on the App Store"
            width="120"
            height="40"
            loading="lazy"
          />
        </a>
      )}
      {demo && (
        <a className="demo-store-link" href={demo} target="_blank" rel="noreferrer">
          <Play size={14} aria-hidden="true" />
          <span><small>View the</small>Product demo</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      )}
      {!android && !ios && demo && (
        <span className="private-release">
          {project.id === 'nexo'
            ? 'Deployed only in the South African region'
            : 'Private deployment'}
        </span>
      )}
    </div>
  );
};

const CaseStudyModal = ({
  project,
  onClose,
}: {
  project: CaseStudyProject;
  onClose: () => void;
}) => {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="case-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.aside
        id={`case-study-modal-${project.id}`}
        className="case-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-modal-title-${project.id}`}
        style={{
          '--case-accent': project.accent,
          '--case-deep': project.deepAccent,
        } as CSSProperties}
        initial={{ x: '100%', opacity: 0.6 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.5 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="case-modal-header">
          <div>
            <BrandImage project={project} />
            <span>
              <small>{project.client}</small>
              <strong id={`case-modal-title-${project.id}`}>{project.title}</strong>
            </span>
          </div>
          <button ref={closeButtonRef} onClick={onClose} aria-label={`Close ${project.title} case study`}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="case-modal-scroll">
          <div className="case-modal-hero">
            <div className="case-badges">
              {project.featured && (
                <span className="featured-badge"><Sparkles size={11} /> Featured project</span>
              )}
              <span><span className="live-dot" /> Production app</span>
              <span>{project.category}</span>
            </div>

            <p>{project.overview}</p>

            <div className="case-modal-facts">
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Duration</span><strong>{project.duration}</strong></div>
              {project.metrics.map((metric) => (
                <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>
              ))}
            </div>

            <StoreLinks project={project} />
          </div>

          <div className="case-modal-content">
            <section className="case-modal-section case-modal-problem">
              <span>01 / Business problem</span>
              <p>{project.businessProblem}</p>
            </section>

            <section className="case-modal-section">
              <span>02 / Engineering contribution</span>
              <ul>
                {project.contributions.map((item) => (
                  <li key={item}><Check size={13} aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </section>

            <div className="case-modal-grid">
              <section className="case-modal-section">
                <span>03 / Features developed</span>
                <ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>

              <section className="case-modal-section">
                <span>04 / Technical challenges</span>
                <ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>

              <section className="case-modal-section">
                <span>05 / Solutions implemented</span>
                <ul>{project.solutions.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>

              <section className="case-modal-section case-modal-performance">
                <span><CircleGauge size={14} aria-hidden="true" /> 06 / Performance work</span>
                <ul>{project.performance.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>

            <section className="case-modal-section case-modal-timeline">
              <span>07 / Delivery timeline</span>
              <div>
                {['Discover', 'Architect', 'Build', 'Stabilize', 'Ship'].map((phase, phaseIndex) => (
                  <span key={phase}><i>{phaseIndex + 1}</i>{phase}</span>
                ))}
              </div>
            </section>

            <section className="case-modal-section case-modal-stack">
              <span>08 / Technology system</span>
              <div>
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.aside>
    </motion.div>,
    document.body,
  );
};

const CaseStudyCard = ({
  project,
  index,
  onOpen,
}: {
  project: CaseStudyProject;
  index: number;
  onOpen: (project: CaseStudyProject) => void;
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.article
      ref={cardRef}
      className={`case-study ${project.featured ? 'is-featured' : 'is-collection'} case-${project.visual}`}
      style={{
        '--case-accent': project.accent,
        '--case-deep': project.deepAccent,
      } as CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.08 }}
    >
      <div className="animated-case-border" aria-hidden="true" />
      <div className="case-copy">
        <div className="case-index">
          <span>0{index + 1}</span>
          <span>{project.category}</span>
        </div>

        <div className="case-badges">
          {project.featured && <span className="featured-badge"><Sparkles size={11} /> Featured project</span>}
          <span><span className="live-dot" /> Production app</span>
          {project.storeLinks.android && <span>Android</span>}
          {project.storeLinks.ios && <span>iOS</span>}
        </div>

        <div className="case-title-row">
          <BrandImage project={project} />
          <div>
            <span>{project.client}</span>
            <h3>{project.title}</h3>
          </div>
        </div>

        <p className="case-overview">{project.overview}</p>

        <div className="case-facts">
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Duration</span><strong>{project.duration}</strong></div>
        </div>

        <div className="contribution-preview">
          <span>Contribution highlights</span>
          <div>
            {project.contributions.slice(0, project.featured ? 3 : 2).map((contribution) => (
              <p key={contribution}><Check size={13} /> {contribution}</p>
            ))}
          </div>
        </div>

        <div className="case-actions">
          <button
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-controls={`case-study-modal-${project.id}`}
          >
            View case study
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <StoreLinks project={project} />
        </div>
      </div>

      <div className="case-visual">
        <div className="case-glow" aria-hidden="true" />
        <motion.div className="device-stage" style={{ y: reducedMotion ? 0 : visualY }}>
          <div className="device-shadow" />
          <div className="device-shell">
            <DeviceScreen project={project} />
          </div>
          <div className="floating-metric metric-primary">
            <span>{project.metrics[0].value}</span>
            <small>{project.metrics[0].label}</small>
          </div>
          <div className="floating-metric metric-secondary">
            <span>{project.metrics[1].value}</span>
            <small>{project.metrics[1].label}</small>
          </div>
        </motion.div>
        <div className="case-tech-row">
          {project.technologies.slice(0, project.featured ? 6 : 4).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>

    </motion.article>
  );
};

const Projects = ({ projects }: ProjectsProps) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = activeFilter === 'All' || project.group === activeFilter;
      const haystack = [
        project.title,
        project.client,
        project.category,
        project.role,
        ...project.technologies,
        ...project.features,
      ]
        .join(' ')
        .toLowerCase();
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeFilter, projects, query]);

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const collectionProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="section projects-section">
      <div className="site-container">
        <div className="section-heading projects-heading">
          <div>
            <span className="eyebrow"><span>03</span> Selected work</span>
            <h2>Production apps, told as engineering case studies.</h2>
          </div>
          <p>
            Seven shipped products across commerce, hospitality, field operations, security, kiosks,
            and maritime systems—organized around the problems, decisions, and technical work behind them.
          </p>
        </div>

        <div className="project-statistics">
          <div><strong>07</strong><span>production products</span></div>
          <div><strong>06</strong><span>industry contexts</span></div>
          <div><strong>02</strong><span>mobile platforms</span></div>
          <p>From 10K+ field-team workflows to high-traffic consumer commerce.</p>
        </div>

        <div className="project-toolbar">
          <div className="project-filters" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
                <span>
                  {filter === 'All' ? projects.length : projects.filter((project) => project.group === filter).length}
                </span>
              </button>
            ))}
          </div>

          <label className="project-search">
            <Search size={15} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tech or product…"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear project search">
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        <div className="project-result-meta" role="status" aria-live="polite">
          <span>{filteredProjects.length.toString().padStart(2, '0')} case studies</span>
          <span>Scroll to explore</span>
        </div>

        {filteredProjects.length ? (
          <>
            <div className="featured-case-studies">
              {featuredProjects.map((project) => (
                <CaseStudyCard
                  project={project}
                  index={projects.indexOf(project)}
                  key={project.id}
                  onOpen={setSelectedProject}
                />
              ))}
            </div>

            {collectionProjects.length > 0 && (
              <>
                <div className="collection-heading">
                  <span>More production systems</span>
                  <p>Enterprise workflows where reliability mattered more than spectacle.</p>
                </div>
                <div className="case-study-collection">
                  {collectionProjects.map((project) => (
                    <CaseStudyCard
                      project={project}
                      index={projects.indexOf(project)}
                      key={project.id}
                      onOpen={setSelectedProject}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="project-empty">
            <Search size={22} />
            <h3>No matching case studies</h3>
            <p>Try another technology, product name, or category.</p>
            <button onClick={() => { setQuery(''); setActiveFilter('All'); }}>Reset filters</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
