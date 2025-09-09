import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, Target, Lightbulb, CheckCircle } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col w-full group hover:-translate-y-1 h-fit"
    >
      {/* Project Image */}
      <div className="relative h-52 sm:h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-contain bg-white dark:bg-slate-800 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback to gradient background if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600', 'flex', 'items-center', 'justify-center');
            target.parentElement!.innerHTML = `
              <div class="text-white text-7xl font-bold opacity-30">
                ${project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
              <div class="absolute inset-0 bg-black/10"></div>
            `;
          }}
        />
        <div className="absolute top-6 right-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-gray-800 text-sm font-semibold shadow-lg border border-white/20"
          >
            {project.category}
          </motion.span>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {project.description}
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200/50 dark:border-blue-800/50 hover:shadow-sm transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>

        {/* Expand Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full py-4 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 border-2 font-semibold ${
            isExpanded 
              ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10 shadow-inner' 
              : 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          {isExpanded ? '↑ Show Less Details' : '↓ Show More Details'}
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              key={`expanded-${project.id}`}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6 overflow-hidden"
            >
              {/* Full Description */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Target size={18} />
                  Project Overview
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              {project.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle size={18} />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {project.challenges.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Lightbulb size={18} />
                      Challenges
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, challengeIndex) => (
                        <motion.li
                          key={challengeIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: challengeIndex * 0.1 }}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.solutions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle size={18} />
                      Solutions
                    </h4>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, solutionIndex) => (
                        <motion.li
                          key={solutionIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: solutionIndex * 0.1 }}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{solution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Impact & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Impact</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{project.impact}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Timeline
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{project.timeline}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium tracking-wide uppercase">
              Portfolio Showcase
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-8 tracking-tight">
            Featured Projects
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Explore my professional journey through cutting-edge mobile applications and enterprise solutions. 
            Each project showcases innovative problem-solving with modern technologies, 
            <span className="font-medium text-gray-800 dark:text-gray-200"> from scalable React Native architectures</span> to 
            <span className="font-medium text-gray-800 dark:text-gray-200"> mission-critical system integrations</span>. 
            <span className="block mt-2 text-lg">
              Transforming complex business requirements into elegant, user-centric digital experiences.
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div key={project.id} className="w-full flex">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
