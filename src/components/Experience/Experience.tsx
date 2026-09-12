import { motion } from 'framer-motion';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import type { Experience } from '../../types';

interface ExperienceProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceProps) => {
  return (
    <section id="experience" className="section experience-section">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><span>02</span> Experience</span>
            <h2>Growing through ownership, one shipped system at a time.</h2>
          </div>
          <p>
            My trajectory at Successive Digital has moved from structured mobile training to
            owning production features across enterprise and consumer applications.
          </p>
        </div>

        <div className="experience-frame">
          <aside className="company-panel">
            <div className="company-logo">
              <img
                src="/images/successive-digital.png"
                alt="Successive Digital"
                width="190"
                height="36"
              />
            </div>
            <div>
              <span>Current company</span>
              <h3>Successive Digital</h3>
              <p><MapPin size={14} aria-hidden="true" /> Noida, India</p>
            </div>
            <a
              href="https://successive.tech"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Successive Digital website"
            >
              Company <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </aside>

          <div className="experience-timeline">
            {experiences.map((experience, index) => (
              <motion.article
                className="role"
                key={experience.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="timeline-marker">
                  <span className={index === 0 ? 'is-current' : ''} />
                </div>

                <div className="role-head">
                  <div>
                    {index === 0 && <span className="current-badge">Current role</span>}
                    <h3>{experience.position}</h3>
                  </div>
                  <time>{experience.duration}</time>
                </div>

                <p className="role-summary">{experience.description}</p>

                <div className="role-content">
                  <div className="role-impact">
                    <span>Selected impact</span>
                    <ul>
                      {experience.achievements.map((achievement) => (
                        <li key={achievement}>
                          <Check size={15} aria-hidden="true" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="role-tools">
                    <span>Environment</span>
                    <div>
                      {experience.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
