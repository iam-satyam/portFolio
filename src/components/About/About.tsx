import React from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.proficiency}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

interface SkillsProps {
  skills: Skill[];
}

const About: React.FC<SkillsProps> = ({ skills }) => {
  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <motion.p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate React Native Developer with expertise in building scalable mobile applications. 
            I specialize in creating offline-first solutions and seamless user experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                With hands-on experience at Successive Digital, I have delivered 3+ end-to-end mobile applications 
                covering customer management, kiosk operations, and maritime operations. My expertise lies in 
                React Native, Redux, and Firebase integration, where I focus on building scalable, offline-first solutions. 
                I have also integrated a wide range of Google SDK services to enhance app functionality.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                I hold a B.Tech in Computer Science from Maharaja Surajmal Institute of Technology, 
                graduating with a CGPA of 9.42. Beyond development, I am passionate about problem-solving, 
                having solved 600+ DSA challenges on LeetCode and GeeksforGeeks.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Education & Achievements
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Bachelor of Technology - CSE</h4>
                  <p className="text-gray-600 dark:text-gray-300">Maharaja Surajmal Institute Of Technology (GGISPU)</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">August 2024 • CGPA: 9.42</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Senior Secondary (12th) - Science</h4>
                  <p className="text-gray-600 dark:text-gray-300">Rajkiya Pratibha Vikas Vidyalaya, New Delhi</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">April 2019 • 92%</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What I Bring to Your Team
              </h3>
              <ul className="space-y-3">
                {[
                  '🚀 End-to-end mobile app delivery from concept to App Store with zero critical issues',
                  '💡 Advanced problem-solving expertise with 600+ DSA challenges mastered across multiple platforms',
                  '⚡ Offline-first architecture specialist ensuring 100% app functionality without internet dependency',
                  '🛠️ Full-stack mobile development with React Native, Redux, Firebase, and modern payment integrations',
                  '📈 Proven ability to reduce development time by 30% through reusable component architecture',
                  '🎯 Mission-critical system integration experience serving enterprise clients like SAIL and maritime operations',
                  '🌟 Excellence in cross-functional collaboration, agile delivery, and stakeholder communication'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technical Skills
            </h3>
            
            {skillCategories.map((category) => (
              <div key={category} className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {category}
                </h4>
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
