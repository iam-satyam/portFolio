import type { Project, Experience, Skill, ContactInfo } from '../types';

// Satyam's actual portfolio data
export const projects: Project[] = [
{
  id: 'project-5',
  title: 'SHEIN India',
  description:
    'Large-scale e-commerce mobile application delivering seamless fashion shopping experiences',
  fullDescription:
    'SHEIN India is a high-traffic fashion e-commerce mobile application built to handle complex user journeys at scale. I worked on critical customer-facing modules including authentication, home screen, category browsing, cart, and checkout. The app features advanced UI interactions, optimized pagination strategies, and intelligent user engagement using CleverTap notifications.',
  technologies: [
    'React Native',
    'TypeScript',
    'Redux',
    'REST APIs',
    'Firebase',
    'CleverTap',
    'Reanimated',
    'FDK'
  ],
  category: 'E-commerce App',
  image: '/images/shein-app.png',
  demoUrl: '#',
  githubUrl: '#',
  features: [
    'Authentication flows with OTP verification, registration, and auto-read OTP support',
    'Dynamic Home Screen with complex pull-to-refresh animations',
    'Category and product listing screens with pagination',
    'PagerView-based preloading to improve scroll performance and UX',
    'Cart management including add, remove, update quantity',
    'Checkout flow with address selection and order summary handling',
    'Low stock and limited availability indicators',
    'CleverTap integration for push notifications and user engagement'
  ],
  challenges: [
    'Managing complex UI and state across cart and checkout flows',
    'Ensuring smooth performance for large product lists',
    'Handling advanced animation states during pull-to-refresh',
    'Optimizing navigation and screen lifecycle handling'
  ],
  solutions: [
    'Implemented structured Redux architecture for scalable state management',
    'Used PagerView to preload category data and reduce perceived loading time',
    'Built custom pull-to-refresh animations using Reanimated',
    'Improved API abstraction and error handling for stability'
  ],
  impact:
    'Enhanced user experience with smoother animations, faster category browsing, and reliable cart and checkout flows',
  timeline: 'Ongoing'
},

  {
    id: 'project-2',
    title: 'SAIL (Grahak Sampark)',
    description: 'Customer relationship management app for Steel Authority of India Ltd with field operations support',
    fullDescription: 'SAIL Grahak Sampark is a comprehensive mobile application developed for the Steel Authority of India Ltd (SAIL) to enhance their customer relationship management and field operations. The app enables customer service and field executives to manage meetings, visits, customer profiles, product catalogs, and customer interactions efficiently.',
    technologies: ['React Native', 'Google SDKs', 'Firebase', 'REST APIs', 'Redux',"Push Notifications"],
    category: 'Enterprise App',
    image: '/images/sail-appstore.png',
    demoUrl: 'https://play.google.com/store/apps/details?id=com.successive.sailGrahak',
    githubUrl: '#',
    features: [
      'Customer profile and interaction management',
      'Meeting and visit scheduling system',
      'Product catalog management',
      'Field operations support',
      'Google SDK integrations for location services',
      'Nearest personnel assignment system',
      'Real-time communication tools',
      'Comprehensive reporting and analytics'
    ],
    challenges: [
      'Integrating complex location functionality through Google SDKs',
      'Optimizing personnel assignment algorithms',
      'Managing large-scale customer data',
      'Ensuring reliable performance in field conditions'
    ],
    solutions: [
      'Integrated Google SDKs for precise location services',
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
    description: 'Building scalable cross-platform products across commerce, loyalty, and offline-first enterprise workflows.',
    technologies: ['React Native', 'Redux', 'TypeScript', 'Firebase', 'Realm', 'REST APIs', 'Razorpay', 'Google SDKs', 'CI/CD'],
    achievements: [
      'Built and deployed 3+ cross-platform applications across Android and iOS',
      'Integrated payments, deep linking, push notifications, and maps, improving feature adoption by 35%',
      'Implemented Realm-based offline-first architecture, improving application performance by 30%',
      'Contributed to CI/CD pipelines and testing, reducing release turnaround time by 25%'
    ]
  },
  {
    id: 'exp-2',
    company: 'Successive Digital',
    position: 'Trainee Engineer',
    duration: 'October 2023 - April 2024',
    description: 'Completed structured React Native training and translated core mobile concepts into production-ready modules.',
    technologies: ['React Native', 'JavaScript', 'Mobile Development', 'Redux', 'Firebase'],
    achievements: [
      'Completed 10+ structured training modules and built production-ready React Native features',
      'Consistently earned 5-star feedback from mentors for performance and code quality',
      'Developed hands-on experience in debugging, SDK integration, testing, and mobile deployment'
    ]
  }
];

export const skills: Skill[] = [
  // Mobile product delivery
  { name: 'React Native', category: 'Mobile' },
  { name: 'Kotlin', category: 'Mobile' },
  { name: 'Juspay', category: 'Mobile' },
  { name: 'Razorpay', category: 'Mobile' },
  { name: 'Google SDKs', category: 'Mobile' },
  { name: 'Deferred Deep Links', category: 'Mobile' },
  { name: 'Push Notifications', category: 'Mobile' },
  { name: 'CI/CD Pipeline Creation', category: 'Mobile' },

  // Frontend architecture
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Redux', category: 'Frontend' },
  { name: 'Zustand', category: 'Frontend' },
  { name: 'Context API', category: 'Frontend' },

  // APIs and platform services
  { name: 'REST APIs', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Google Apps Script', category: 'Backend' },

  // Product analytics and attribution
  { name: 'AppsFlyer', category: 'Analytics' },
  { name: 'Amplitude', category: 'Analytics' },
  { name: 'GA4', category: 'Analytics' },
  { name: 'CleverTap', category: 'Analytics' },
  { name: 'Firebase', category: 'Analytics' },

  // Database and storage
  { name: 'SQLite', category: 'Database' },
  { name: 'Realm Database', category: 'Database' },
  { name: 'AsyncStorage', category: 'Database' },

  // Development tools
  { name: 'Git', category: 'Tools' },
  { name: 'Android Studio', category: 'Tools' },
  { name: 'Xcode', category: 'Tools' },
  { name: 'Visual Studio', category: 'Tools' },
  { name: 'Jest', category: 'Tools' },
  { name: 'JIRA', category: 'Tools' },
];

export const contactInfo: ContactInfo = {
  email: 'satyam202000@gmail.com',
  phone: '+91 9319733487',
  location: 'New Delhi, India 110059',
  linkedin: 'https://www.linkedin.com/in/satyam-a4791321a/',
  leetcode: 'https://leetcode.com/u/satyamEpoch',
  website: 'https://satyam-portfolio.vercel.app'
};
