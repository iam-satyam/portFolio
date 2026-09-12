import { motion } from 'framer-motion';
import { Award, BookOpen, Code2, GraduationCap, Rocket, Trophy } from 'lucide-react';

const proofPoints = [
  {
    value: '5+',
    label: 'Store-ready launches',
    description: 'Production releases delivered to Google Play and the Apple App Store.',
    icon: Rocket,
  },
  {
    value: '5★',
    label: 'Mentor feedback',
    description: 'Recognized during training for delivery, code quality, and technical depth.',
    icon: Award,
  },
  {
    value: '600+',
    label: 'DSA challenges solved',
    description: 'Consistent problem-solving practice across LeetCode and GeeksforGeeks.',
    icon: Code2,
  },
  {
    value: '9.42',
    label: 'Graduation CGPA',
    description: 'Computer Science, Maharaja Surajmal Institute of Technology.',
    icon: BookOpen,
  },
  {
    value: '3+',
    label: 'Hackathons participated',
    description: 'Collaborative problem-solving and rapid product building under tight timelines.',
    icon: Trophy,
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="section achievements-section">
      <div className="site-container">
        <div className="proof-intro">
          <div>
            <span className="eyebrow"><span>04</span> Education &amp; achievements</span>
            <h2>Milestones that mark the journey.</h2>
          </div>
          <p>
            Production delivery, academic depth, deliberate practice, and collaborative building
            reflect the consistency behind the work.
          </p>
        </div>

        <div className="proof-grid">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="proof-card-top">
                  <div className="proof-icon"><Icon size={18} aria-hidden="true" /></div>
                  <span>0{index + 1}</span>
                </div>
                <div className="proof-value">
                  <strong>{point.value}</strong>
                  <span>Verified signal</span>
                </div>
                <div className="proof-card-copy">
                  <h3>{point.label}</h3>
                  <p>{point.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="education-panel">
          <div className="education-heading">
            <div className="proof-icon"><GraduationCap size={18} aria-hidden="true" /></div>
            <div>
              <span>Education foundation</span>
              <h3>Strong fundamentals, applied in production.</h3>
            </div>
          </div>

          <div className="education-track">
            <article>
              <span>2024</span>
              <div>
                <strong>B.Tech, Computer Science & Engineering</strong>
                <p>Maharaja Surajmal Institute of Technology</p>
              </div>
              <small>CGPA 9.42</small>
            </article>
            <article>
              <span>2019</span>
              <div>
                <strong>Senior Secondary, Science</strong>
                <p>Rajkiya Pratibha Vikas Vidyalaya, New Delhi</p>
              </div>
              <small>92%</small>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
