import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-2 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"></div>
      
      <div className="ml-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {experience.position}
            </h3>
            <h4 className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
              {experience.company}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
            <Calendar size={16} />
            <span className="text-sm">{experience.duration}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {experience.description}
        </p>
        
        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h5>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, achievementIndex) => (
              <motion.li
                key={achievementIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: achievementIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

interface ExperienceProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            My professional journey in web development, highlighting key roles and achievements
            that have shaped my expertise in building modern web applications.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
