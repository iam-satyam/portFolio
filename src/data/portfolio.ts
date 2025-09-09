import type { Project, Experience, Skill, ContactInfo } from '../types';

// Satyam's actual portfolio data
export const projects: Project[] = [

  {
    id: 'project-2',
    title: 'SAIL (Grahak Sampark)',
    description: 'Customer relationship management app for Steel Authority of India Ltd with field operations support',
    fullDescription: 'SAIL Grahak Sampark is a comprehensive mobile application developed for the Steel Authority of India Ltd (SAIL) to enhance their customer relationship management and field operations. The app enables customer service and field executives to manage meetings, visits, customer profiles, product catalogs, and customer interactions efficiently.',
    technologies: ['React Native', 'Google Maps SDK', 'Firebase', 'REST APIs', 'Redux',"Push Notifications"],
    category: 'Enterprise App',
    image: '/images/sail-appstore.png',
    demoUrl: 'https://play.google.com/store/apps/details?id=com.successive.sailGrahak',
    githubUrl: '#',
    features: [
      'Customer profile and interaction management',
      'Meeting and visit scheduling system',
      'Product catalog management',
      'Field operations support',
      'Google Maps integration for location services',
      'Nearest personnel assignment system',
      'Real-time communication tools',
      'Comprehensive reporting and analytics'
    ],
    challenges: [
      'Integrating complex Google Maps functionality',
      'Optimizing personnel assignment algorithms',
      'Managing large-scale customer data',
      'Ensuring reliable performance in field conditions'
    ],
    solutions: [
      'Integrated Google Maps SDK for precise location services',
      'Developed efficient algorithms for nearest personnel assignment',
      'Implemented robust data management with pagination and caching',
      'Added offline capabilities for field operations'
    ],
    impact: 'Improved customer response time and operational efficiency for SAIL field operations',
    timeline: '5 months'
  },  {
    id: 'project-1',
    title: 'NewEra (Nexo)',
    description: 'Tablet and mobile-based kiosk management application for employee attendance, product sales, and inventory control',
    fullDescription: 'Nexo is a comprehensive kiosk management application designed to streamline employee operations. The app enables employees to clock in/out, track sales, and manage inventory in real time from a single intuitive interface. Built with robust offline-first support using Realm Local Database, ensuring all core features work seamlessly without internet connectivity.',
    technologies: ['React Native', 'Realm Database', 'Redux', 'TypeScript', 'Firebase','CrashAnalytics'],
    category: 'Kiosk App',
    image: '/images/nexo-logo.png',
    demoUrl:'https://drive.google.com/file/d/1rm1fGMuNvzxTWs_Tq-QTaSu--h8IJDMV/view?usp=sharing',
    githubUrl: '#',
    features: [
      'Employee attendance management with clock in/out functionality',
      'Real-time product sales tracking and reporting',
      'Comprehensive inventory control and management',
      'Customer information management system',
      'Offline-first architecture with automatic sync',
      'Intuitive tablet and mobile interface',
      'Real-time data synchronization when online',
      'Role-based access control for different user types'
    ],
    challenges: [
      'Implementing robust offline functionality',
      'Ensuring data consistency across devices',
      'Optimizing performance for tablet interfaces',
      'Managing complex inventory operations'
    ],
    solutions: [
      'Used Realm Local Database for reliable offline storage',
      'Implemented automatic data synchronization mechanisms',
      'Optimized UI components for both mobile and tablet screens',
      'Created efficient data models for inventory tracking'
    ],
    impact: 'Streamlined kiosk operations and improved employee productivity with reliable offline functionality',
    timeline: '4 months'
  },
  {
    id: 'project-3',
    title: 'EasyGuest VMS',
    description: 'Advanced visitor management system with face detection, automated check-in/out, and admin portal',
    fullDescription: 'EasyGuest is a sophisticated visitor management application that enables seamless visitor registration with advanced features. Users register by entering details and capturing images with OpenCV-based face detection. The system securely stores data using Firebase, Google Drive, and Apps Script integration.',
    technologies: ['React Native', 'OpenCV', 'Firebase', 'Google Drive API', 'Apps Script', 'Face Recognition'],
    category: 'Security App',
    image: '/images/easyguest-launch.png',
    demoUrl: 'https://apps.apple.com/us/app/easyguest-vms/id6744635281?platform=ipad',
    githubUrl: '#',
    features: [
      'Visitor registration with image capture',
      'OpenCV-based face detection and matching',
      'Unique visitor ID and iCard generation',
      'Quick check-in/out with face recognition',
      'Phone number-based visitor lookup',
      'Visitor feedback system at checkout',
      'Admin portal with CRUD operations',
      'Real-time notification management',
      'Responsive design for mobile and tablets'
    ],
    challenges: [
      'Implementing accurate face detection and matching',
      'Managing secure data storage across multiple platforms',
      'Ensuring real-time notification delivery',
      'Creating responsive UI for different device sizes'
    ],
    solutions: [
      'Integrated OpenCV for reliable face detection algorithms',
      'Used Firebase as Backend-as-a-Service with Google Drive integration using AppScript',
      'Firebase push notification',
      'Designed adaptive UI components for mobile and tablet compatibility'
    ],
    impact: 'Enhanced security and visitor experience with automated processes and real-time monitoring',
    timeline: '2 months'
  },
  {
    id: 'project-4',
    title: 'Podium 5',
    description: 'Maritime fleet tracking and Ship Security Alert System (SSAS) management application for global maritime operations',
    fullDescription: 'Podium 5 is a mission-critical mobile application developed for Pole Star Global, serving the maritime community with comprehensive fleet tracking and security management solutions. The app integrates with both OTiS and Podium5 platforms to provide real-time maritime operations management, making shipping operations more effective, safer, and efficient.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'REST APIs', 'Real-time Tracking', 'Security Systems'],
    category: 'Maritime App',
    image: '/images/podium5-logo.png',
    demoUrl: 'https://play.google.com/store/apps/details?id=com.stratumfive_mobileapp&hl=en_IN',
    githubUrl: '#',
    features: [
      'Real-time fleet tracking and monitoring',
      'Ship Security Alert System (SSAS) management',
      'Integration with OTiS and Podium5 platforms',
      'Maritime operations data organization',
      'Critical security alert handling',
      'Global maritime community connectivity',
      'Real-time vessel position tracking',
      'Emergency response coordination'
    ],
    challenges: [
      'Implementing real-time tracking for global maritime operations',
      'Ensuring critical system reliability for safety applications',
      'Managing complex maritime data integration',
      'Meeting strict maritime security standards'
    ],
    solutions: [
      'Built robust real-time tracking system with high reliability',
      'Implemented fail-safe security alert mechanisms',
      'Created efficient data management for maritime operations',
      'Designed user-friendly interface for critical operations'
    ],
    impact: 'Revolutionized maritime operations by providing mission-critical tracking and security solutions for global shipping',
    timeline: '3 months'
  }
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Successive Digital',
    position: 'Associate Engineer',
    duration: 'April 2024 - Present',
    description: 'Contributing to ongoing project development and delivering scalable mobile solutions using React Native and modern technologies.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'Firebase', 'GraphQL', 'REST APIs', 'Razorpay', 'Google Maps'],
    achievements: [
      'Designed and implemented reusable, responsive UI components reducing development time by 30%',
      'Built authentication, real-time updates, and efficient data layers using REST APIs, Firebase, and GraphQL',
      'Integrated Razorpay for secure transactions and Google Maps for location-based services',
      'Deployed 3+ production-ready apps to Google Play and Apple App Store with zero critical issues',
      'Enhanced cross-device compatibility and user experience across mobile and tablet platforms'
    ]
  },
  {
    id: 'exp-2',
    company: 'Successive Digital',
    position: 'Trainee Engineer',
    duration: 'October 2023 - April 2024',
    description: 'Gained comprehensive hands-on experience in React Native development and mobile application concepts through structured training programs.',
    technologies: ['React Native', 'JavaScript', 'Mobile Development', 'Redux', 'Firebase'],
    achievements: [
      'Completed 10+ structured training modules in React Native development',
      'Consistently earned 5-star feedback from mentors for performance and code quality',
      'Demonstrated excellent delivery timelines and technical understanding',
      'Built foundational knowledge in mobile app architecture and best practices'
    ]
  }
];

export const skills: Skill[] = [
  // Mobile Development
  { name: 'React Native', category: 'Mobile', proficiency: 95 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { name: 'JavaScript', category: 'Frontend', proficiency: 92 },
  { name: 'Kotlin', category: 'Mobile', proficiency: 60 },
  
  // State Management & APIs
  { name: 'Redux', category: 'Frontend', proficiency: 95 },
  { name: 'Context API', category: 'Frontend', proficiency: 95 },
  { name: 'REST APIs', category: 'Backend', proficiency: 90 },
  { name: 'GraphQL', category: 'Backend', proficiency: 80 },
  
  // Backend & Cloud
  { name: 'Firebase', category: 'Backend', proficiency: 88 },
  { name: 'Supabase', category: 'Backend', proficiency: 75 },
  { name: 'Google Apps Script', category: 'Backend', proficiency: 80 },
  
  // Maps & Location Services
  { name: 'Google Maps SDK', category: 'Mobile', proficiency: 85 },
  { name: 'Deep Linking', category: 'Mobile', proficiency: 80 },
  { name: 'Razorpay', category: 'Mobile', proficiency: 85 },
  { name: 'Push Notifications', category: 'Mobile', proficiency: 90 },
  
  // Database & Storage
  { name: 'SQLite', category: 'Database', proficiency: 85 },
  { name: 'Realm Database', category: 'Database', proficiency: 90 },
  { name: 'AsyncStorage', category: 'Database', proficiency: 88 },
  
  // Development Tools
  { name: 'Git', category: 'Tools', proficiency: 90 },
  { name: 'Android Studio', category: 'Tools', proficiency: 85 },
  { name: 'Xcode', category: 'Tools', proficiency: 80 },
  { name: 'Visual Studio', category: 'Tools', proficiency: 85 },
  
  // Programming Languages
  { name: 'C++', category: 'Backend', proficiency: 82 },
  { name: 'C#', category: 'Backend', proficiency: 75 },
  
  // Testing & DevOps
  { name: 'Jest', category: 'Tools', proficiency: 78 },
  { name: 'JIRA', category: 'Tools', proficiency: 70 },
];

export const contactInfo: ContactInfo = {
  email: 'satyam202000@gmail.com',
  phone: '+91 9319733487',
  location: 'New Delhi, India 110059',
  linkedin: 'https://www.linkedin.com/in/satyam-a4791321a/',
  github: 'https://leetcode.com/u/satyamEpoch',
  website: 'https://satyam-portfolio.vercel.app'
};
