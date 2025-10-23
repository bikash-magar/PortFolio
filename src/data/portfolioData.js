// Central data store for portfolio content

// Default data structure
const defaultPortfolioData = {
  // Personal Information
  personal: {
    name: "Bikash Magar",
    title: "CyberSecurity",
    email: "bikashmagar.dev@gmail.com",
    phone: "+13269006983", // Your WhatsApp number
    location: "Dayton, Country"
  },
  
  // Profile picture
  profilePicture: null,
  
  // Floating cards for home page
  floatingCards: [
    { id: 1, icon: '⚛️', title: 'React', subtitle: 'Frontend', className: 'react-card' },
    { id: 2, icon: '🟨', title: 'JavaScript', subtitle: 'ES6+', className: 'javascript-card' },
    { id: 3, icon: '🎨', title: 'UI/UX', subtitle: 'Design', className: 'design-card' }
  ],
  
  // About section
  about: {
    title: "About Me",
    description: "Your personal description here...",
    mission: "Your mission statement...",
    vision: "Your vision statement..."
  },
  
  // Technologies data
  technologies: [
    {
      id: 1,
      name: "Python",
      description: "A versatile language for scripting, data science, and web development.",
      category: "Programming Language",
      proficiency: "Advanced"
    },
    {
      id: 2,
      name: "Java",
      description: "A robust language used for enterprise applications and Android development.",
      category: "Programming Language",
      proficiency: "Intermediate"
    },
    {
      id: 3,
      name: "JavaScript",
      description: "The backbone of web development, enabling interactive web pages.",
      category: "Programming Language",
      proficiency: "Advanced"
    }
  ],
  
  // Tools data
  tools: [
    {
      id: 1,
      name: "Visual Studio Code",
      description: "A powerful code editor from Microsoft.",
      category: "IDE"
    },
    {
      id: 2,
      name: "Git",
      description: "Version control system for tracking changes in code.",
      category: "Version Control"
    },
    {
      id: 3,
      name: "Docker",
      description: "Containerization platform for developing and deploying applications.",
      category: "DevOps"
    },
    {
      id: 4,
      name: "Postman",
      description: "API testing tool for developers.",
      category: "Testing"
    }
  ],
  
  // Certifications data
  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Cloud development certification"
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      description: "Frontend development with React"
    }
  ],
  
  // Learning Journey data
  learningJourney: [
    {
      id: 1,
      step: "1",
      title: "Started learning HTML/CSS",
      description: "Built my first static websites",
      date: "2021"
    },
    {
      id: 2,
      step: "2",
      title: "Moved to JavaScript",
      description: "Added interactivity to web pages",
      date: "2022"
    },
    {
      id: 3,
      step: "3",
      title: "Explored React",
      description: "Built dynamic single-page applications",
      date: "2022"
    },
    {
      id: 4,
      step: "4",
      title: "Built projects",
      description: "Created full-stack applications",
      date: "2023"
    }
  ],
  
  // Projects data
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio built with React",
      technologies: ["React", "CSS", "JavaScript"],
      githubUrl: "https://github.com/bikashmagar/portfolio",
      liveUrl: "https://yourportfolio.com",
      image: "/path/to/project-image.jpg"
    }
  ],
  
  // Blogs data
  blogs: [],
  
  // Resume sections
  resume: {
    sections: [
      {
        id: 1,
        title: "Professional Summary",
        type: "summary",
        content: "Passionate software developer with experience in modern web technologies and a strong foundation in problem-solving. Committed to writing clean, efficient code and continuous learning."
      },
      {
        id: 2,
        title: "Work Experience",
        type: "experience", 
        items: [
          {
            id: 1,
            position: "Software Developer",
            company: "Tech Company Inc.",
            location: "City, Country",
            duration: "2022 - Present",
            description: "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
            achievements: [
              "Improved application performance by 30%",
              "Led a team of 3 developers on key projects",
              "Implemented automated testing reducing bugs by 25%"
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Education",
        type: "education",
        items: [
          {
            id: 1,
            degree: "Bachelor of Computer Science",
            institution: "University Name",
            location: "City, Country",
            duration: "2018 - 2022",
            gpa: "3.8/4.0",
            relevant_courses: ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
          }
        ]
      },
      {
        id: 4,
        title: "Skills",
        type: "skills",
        categories: [
          {
            id: 1,
            category: "Programming Languages",
            icon: "💻",
            color: "#667eea",
            skills: [
              { name: "JavaScript", description: "Expert - Advanced ES6+, async/await, frameworks" },
              { name: "Python", description: "Advanced - Data analysis, web development, automation" },
              { name: "Java", description: "Intermediate - Object-oriented programming, Spring framework" },
              { name: "TypeScript", description: "Advanced - Type-safe development, complex applications" }
            ]
          },
          {
            id: 2,
            category: "Frontend",
            icon: "🎨",
            color: "#764ba2",
            skills: [
              { name: "React", description: "Expert - Hooks, Context, custom components, state management" },
              { name: "Vue.js", description: "Intermediate - Component development, Vuex store management" },
              { name: "HTML5", description: "Expert - Semantic markup, accessibility, modern standards" },
              { name: "CSS3", description: "Expert - Flexbox, Grid, animations, responsive design" },
              { name: "Sass", description: "Advanced - Variables, mixins, nesting, BEM methodology" }
            ]
          },
          {
            id: 3,
            category: "Backend",
            icon: "⚙️",
            color: "#f093fb",
            skills: [
              { name: "Node.js", description: "Advanced - Server development, API design, middleware" },
              { name: "Express", description: "Advanced - RESTful APIs, routing, authentication" },
              { name: "Django", description: "Intermediate - MVC architecture, ORM, admin panel" },
              { name: "PostgreSQL", description: "Intermediate - Complex queries, indexing, optimization" },
              { name: "MongoDB", description: "Advanced - Document design, aggregation, indexing" }
            ]
          },
          {
            id: 4,
            category: "Tools & Technologies",
            icon: "🛠️",
            color: "#f5576c",
            skills: [
              { name: "Git", description: "Expert - Branching, merging, rebasing, collaboration workflows" },
              { name: "Docker", description: "Intermediate - Containerization, Docker Compose, deployment" },
              { name: "AWS", description: "Intermediate - EC2, S3, Lambda, basic cloud architecture" },
              { name: "Jenkins", description: "Basic - CI/CD pipelines, automated testing integration" },
              { name: "Jest", description: "Advanced - Unit testing, mocking, test-driven development" }
            ]
          },
          {
            id: 5,
            category: "Design & UI/UX",
            icon: "✨",
            color: "#4facfe",
            skills: [
              { name: "Figma", description: "Advanced - Prototyping, design systems, collaboration" },
              { name: "Adobe XD", description: "Intermediate - Wireframing, interactive prototypes" },
              { name: "Responsive Design", description: "Expert - Mobile-first, adaptive layouts, performance" },
              { name: "User Experience", description: "Advanced - User research, usability testing, design thinking" }
            ]
          }
        ]
      },
      {
        id: 5,
        title: "Projects",
        type: "projects",
        items: [
          {
            id: 1,
            name: "E-Commerce Platform",
            description: "Full-stack web application with React frontend and Node.js backend",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
            duration: "3 months",
            highlights: [
              "Implemented secure payment processing",
              "Built responsive design for mobile and desktop",
              "Integrated real-time inventory management"
            ],
            githubUrl: "https://github.com/bikashmagar/ecommerce-platform",
            liveUrl: "https://your-ecommerce-demo.com"
          },
          {
            id: 2,
            name: "Task Management System",
            description: "Collaborative project management tool with real-time updates",
            technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "WebSocket"],
            duration: "2 months",
            highlights: [
              "Real-time collaboration features",
              "Advanced filtering and search capabilities",
              "Role-based access control"
            ],
            githubUrl: "https://github.com/bikashmagar/task-manager",
            liveUrl: "https://your-task-manager.com"
          },
          {
            id: 3,
            name: "Data Visualization Dashboard",
            description: "Interactive analytics dashboard for business intelligence",
            technologies: ["D3.js", "React", "Python", "FastAPI", "Chart.js"],
            duration: "4 months",
            highlights: [
              "Interactive data visualizations",
              "Real-time data processing",
              "Export functionality for reports"
            ],
            githubUrl: "https://github.com/bikashmagar/data-dashboard"
          }
        ]
      },
      {
        id: 6,
        title: "Certifications",
        type: "certifications",
        items: [
          {
            id: 1,
            name: "AWS Certified Developer Associate",
            issuer: "Amazon Web Services",
            date: "2024",
            credentialId: "AWS-DEV-2024-001",
            description: "Cloud development and deployment expertise"
          },
          {
            id: 2,
            name: "React Developer Certification",
            issuer: "Meta",
            date: "2023",
            credentialId: "META-REACT-2023-002",
            description: "Advanced React development and best practices"
          },
          {
            id: 3,
            name: "Google Cloud Professional",
            issuer: "Google Cloud",
            date: "2024",
            credentialId: "GCP-PRO-2024-003",
            description: "Cloud architecture and infrastructure management"
          },
          {
            id: 4,
            name: "Certified Scrum Master",
            issuer: "Scrum Alliance",
            date: "2023",
            credentialId: "CSM-2023-004",
            description: "Agile project management and team leadership"
          }
        ]
      },
      {
        id: 7,
        title: "Leadership Skills",
        type: "leadership",
        items: [
          {
            id: 1,
            skill: "Team Leadership",
            description: "Led cross-functional teams of 5-8 developers on multiple projects",
            examples: [
              "Managed development team for e-commerce platform launch",
              "Coordinated with stakeholders and product managers",
              "Implemented agile methodologies to improve team productivity"
            ]
          },
          {
            id: 2,
            skill: "Project Management",
            description: "Successfully delivered 15+ projects on time and within budget",
            examples: [
              "Planned and executed sprint cycles using Scrum methodology",
              "Managed project timelines and resource allocation",
              "Maintained 95% on-time delivery rate across all projects"
            ]
          },
          {
            id: 3,
            skill: "Mentoring & Training",
            description: "Mentored junior developers and conducted technical training sessions",
            examples: [
              "Mentored 3 junior developers, all received promotions within 1 year",
              "Conducted weekly code review sessions",
              "Developed internal training materials for new technologies"
            ]
          },
          {
            id: 4,
            skill: "Strategic Planning",
            description: "Contributed to technical roadmap and architectural decisions",
            examples: [
              "Participated in technology stack selection for new products",
              "Designed scalable system architectures",
              "Led technical decision-making for critical business features"
            ]
          }
        ]
      }
    ],
    downloadUrl: null // Can be set to a PDF URL
  },

  // Contact information
  contact: {
    email: "bikashmagar.dev@gmail.com",
    phone: "+13269006983", // Your WhatsApp number
    linkedin: "https://linkedin.com/in/bikashmagar",
    github: "https://github.com/bikashmagar",
    twitter: "https://twitter.com/bikashmagar"
  },

  // About Content for ModernAbout page
  aboutContent: {
    storyJourney: [
      {
        id: 1,
        icon: "🎯",
        title: "The Beginning",
        description: "Started my coding journey with curiosity and determination, diving deep into various programming languages and frameworks."
      },
      {
        id: 2,
        icon: "💡",
        title: "Discovery",
        description: "Found my passion in full-stack development, creating seamless experiences from backend APIs to beautiful user interfaces."
      },
      {
        id: 3,
        icon: "🚀",
        title: "Today",
        description: "Continuously learning and building innovative solutions, always excited about the next challenge and opportunity to grow."
      }
    ],
    values: [
      {
        id: 1,
        icon: "🎯",
        title: "Quality First",
        description: "Every line of code matters. I believe in writing clean, maintainable, and scalable solutions that stand the test of time.",
        highlight: "Clean Code"
      },
      {
        id: 2,
        icon: "🤝",
        title: "Collaboration",
        description: "Great products are built by great teams. I thrive in collaborative environments where ideas flow freely and everyone contributes.",
        highlight: "Teamwork"
      },
      {
        id: 3,
        icon: "📚",
        title: "Continuous Learning",
        description: "Technology evolves rapidly. I stay current with the latest trends, best practices, and emerging technologies in the field.",
        highlight: "Growth Mindset"
      },
      {
        id: 4,
        icon: "🚀",
        title: "Innovation",
        description: "I love exploring new technologies and finding creative solutions to complex problems that make a real difference.",
        highlight: "Creative Solutions"
      }
    ],
    funFacts: [
      {
        id: 1,
        icon: "☕",
        title: "Coffee Enthusiast",
        description: "I run on caffeine and creativity. My best code is written with a perfect cup of coffee by my side.",
        stat: "5+ cups daily"
      },
      {
        id: 2,
        icon: "🎮",
        title: "Gaming Strategist",
        description: "Strategy games help me think analytically and approach problems from different angles.",
        stat: "Problem Solver"
      },
      {
        id: 3,
        icon: "🌱",
        title: "Lifelong Learner",
        description: "Currently exploring AI and machine learning, always curious about emerging technologies.",
        stat: "Never Stops"
      },
      {
        id: 4,
        icon: "🎵",
        title: "Music-Powered Coding",
        description: "Lo-fi beats and ambient music fuel my productivity and help me stay in the flow state.",
        stat: "Focus Mode"
      }
    ]
  },

  // Blog posts
  blogs: [
    {
      id: 1,
      title: "Getting Started with React: A Beginner's Guide",
      category: "Tutorial",
      content: "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React, including components, props, state, and hooks. Whether you're new to React or looking to refresh your knowledge, this article will help you get started on your React journey.",
      excerpt: "Learn the basics of React development, from setting up your first component to understanding state management and hooks.",
      tags: ["React", "JavaScript", "Frontend", "Tutorial"],
      readTime: "8 min read",
      status: "published",
      publishedDate: "2024-01-15T10:00:00Z",
      updatedDate: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Building Scalable Web Applications with Node.js",
      category: "Development",
      content: "Node.js has revolutionized server-side development with its event-driven, non-blocking I/O model. This article explores best practices for building scalable Node.js applications, including architecture patterns, performance optimization, and deployment strategies.",
      excerpt: "Discover how to build high-performance, scalable web applications using Node.js and modern JavaScript patterns.",
      tags: ["Node.js", "Backend", "JavaScript", "Scalability"],
      readTime: "12 min read",
      status: "published",
      publishedDate: "2024-01-20T14:30:00Z",
      updatedDate: "2024-01-20T14:30:00Z"
    },
    {
      id: 3,
      title: "The Future of Web Development: Trends to Watch in 2024",
      category: "Technology",
      content: "Web development is constantly evolving, and 2024 brings exciting new trends and technologies. From AI-powered development tools to WebAssembly and edge computing, this article explores the technologies that will shape the future of web development.",
      excerpt: "Explore the latest trends and technologies that are shaping the future of web development in 2024 and beyond.",
      tags: ["Web Development", "Trends", "Technology", "Future"],
      readTime: "10 min read",
      status: "published",
      publishedDate: "2024-01-25T09:15:00Z",
      updatedDate: "2024-01-25T09:15:00Z"
    }
  ]
};

// Function to load data from localStorage or use default
const loadPortfolioData = () => {
  try {
    const storedData = localStorage.getItem('portfolio_data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Check if we need to add new resume sections
      if (parsedData.resume && parsedData.resume.sections) {
        const hasProjects = parsedData.resume.sections.some(s => s.type === 'projects');
        const hasCertifications = parsedData.resume.sections.some(s => s.type === 'certifications');
        const hasLeadership = parsedData.resume.sections.some(s => s.type === 'leadership');
        
        // If missing new sections, add them
        if (!hasProjects || !hasCertifications || !hasLeadership) {
          console.log('Adding missing resume sections...');
          const newSections = defaultPortfolioData.resume.sections.filter(section => 
            section.type === 'projects' || section.type === 'certifications' || section.type === 'leadership'
          );
          parsedData.resume.sections = [...parsedData.resume.sections, ...newSections];
          
          // Update localStorage with new sections
          localStorage.setItem('portfolio_data', JSON.stringify(parsedData));
        }
      }
      
      // Merge with default data to ensure all fields exist
      return { ...defaultPortfolioData, ...parsedData };
    }
  } catch (error) {
    console.error('Error loading stored data:', error);
  }
  return defaultPortfolioData;
};

// Export the loaded data
export const portfolioData = loadPortfolioData();

// Helper functions for data management
export const updatePortfolioData = (section, newData) => {
  portfolioData[section] = newData;
};

export const addToArray = (section, newItem) => {
  if (Array.isArray(portfolioData[section])) {
    const newId = Math.max(...portfolioData[section].map(item => item.id), 0) + 1;
    portfolioData[section].push({ ...newItem, id: newId });
  }
};

export const updateArrayItem = (section, itemId, updatedItem) => {
  if (Array.isArray(portfolioData[section])) {
    const index = portfolioData[section].findIndex(item => item.id === itemId);
    if (index !== -1) {
      portfolioData[section][index] = { ...updatedItem, id: itemId };
    }
  }
};

export const removeFromArray = (section, itemId) => {
  if (Array.isArray(portfolioData[section])) {
    portfolioData[section] = portfolioData[section].filter(item => item.id !== itemId);
  }
};