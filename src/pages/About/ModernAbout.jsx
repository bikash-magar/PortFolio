import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './ModernAbout.css';

function ModernAbout() {
  const { personal, about, aboutContent, resume } = usePortfolio();

  // Get skills from resume data
  const skillsSection = resume?.sections?.find(section => section.type === 'skills');
  const experienceSection = resume?.sections?.find(section => section.type === 'experience');

  // Default content if not set in dashboard
  const defaultJourney = [
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
  ];

  const defaultValues = [
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
  ];

  const defaultFacts = [
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
  ];

  const storyJourney = aboutContent?.storyJourney || defaultJourney;
  const values = aboutContent?.values || defaultValues;
  const funFacts = aboutContent?.funFacts || defaultFacts;

  return (
    <div className="modern-about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="hero-content">
            <div className="profile-section">
              <div className="profile-image-large">
                <img src="/myProfile.jpg" alt={personal?.name || 'Bikash Magar'} />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{personal?.name || 'Bikash Magar'}</h1>
                <h2 className="profile-title">{personal?.title || 'Software Developer'}</h2>
                <p className="profile-location">📍 {personal?.location || 'Dayton, Ohio'}</p>
                <div className="contact-links">
                  <a href={`mailto:${personal?.email}`} className="contact-link">
                    📧 {personal?.email}
                  </a>
                  <a href={`tel:${personal?.phone}`} className="contact-link">
                    📱 {personal?.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-container">
          <div className="content-grid">
            {/* Story Section - Enhanced */}
            <div className="content-card story-card featured-story">
              <div className="card-header">
                <h3>🚀 My Story</h3>
                <p className="section-subtitle">From curiosity to expertise - my journey in tech</p>
              </div>
              <div className="card-content">
                <div className="story-content">
                  <div className="story-text">
                    <div className="story-intro">
                      <p className="story-lead">
                        {about?.description || 'Passionate software developer with a love for creating innovative solutions and beautiful user experiences.'}
                      </p>
                    </div>
                    
                    <div className="story-journey">
                      {storyJourney.map((item, index) => (
                        <div key={item.id} className="journey-item">
                          <div className="journey-icon">{item.icon}</div>
                          <div className="journey-content">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="story-stats">
                    <div className="highlights">
                      <div className="highlight-item">
                        <span className="highlight-number">3+</span>
                        <span className="highlight-label">Years Experience</span>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-number">50+</span>
                        <span className="highlight-label">Projects Completed</span>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-number">15+</span>
                        <span className="highlight-label">Technologies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Preview - Enhanced */}
            <div className="content-card skills-preview-card featured-section">
              <div className="card-header">
                <h3>💻 Core Technologies</h3>
                <p className="section-subtitle">The tools and frameworks I use to build amazing solutions</p>
              </div>
              <div className="card-content">
                <div className="enhanced-skills-content">
                  <div className="skills-intro">
                    <p className="skills-lead">
                      I believe in using the right tool for the job. Here are the technologies I'm passionate about and use to create exceptional digital experiences.
                    </p>
                  </div>
                  
                  <div className="skills-showcase">
                    {skillsSection?.categories?.map((category, index) => (
                      <div key={index} className="skill-category-enhanced">
                        <div className="category-header">
                          <div className="category-icon">{category.icon}</div>
                          <div className="category-info">
                            <h4>{category.category}</h4>
                            <span className="category-count">{category.skills?.length || 0} Technologies</span>
                          </div>
                        </div>
                        <div className="skills-tags-enhanced">
                          {category.skills?.map((skill, i) => (
                            <span key={i} className="skill-tag-enhanced">
                              {typeof skill === 'string' ? skill : skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Values & Approach - Enhanced */}
            <div className="content-card values-card featured-section">
              <div className="card-header">
                <h3>⭐ What I Believe In</h3>
                <p className="section-subtitle">The principles that guide my work and development approach</p>
              </div>
              <div className="card-content">
                <div className="enhanced-values-content">
                  <div className="values-intro">
                    <p className="values-lead">
                      My development philosophy is built on core principles that ensure quality, innovation, and meaningful collaboration in every project.
                    </p>
                  </div>
                  
                  <div className="values-showcase">
                    {values.map((value, index) => (
                      <div key={value.id} className="value-item-enhanced">
                        <div className="value-icon-enhanced">{value.icon}</div>
                        <div className="value-content">
                          <h4>{value.title}</h4>
                          <p>{value.description}</p>
                          <div className="value-highlight">{value.highlight}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Facts - Enhanced */}
            <div className="content-card fun-facts-card featured-section">
              <div className="card-header">
                <h3>🎉 Fun Facts</h3>
                <p className="section-subtitle">A glimpse into my personality and what makes me tick</p>
              </div>
              <div className="card-content">
                <div className="enhanced-facts-content">
                  <div className="facts-intro">
                    <p className="facts-lead">
                      Beyond the code, here are some interesting things about me that shape my perspective and approach to development.
                    </p>
                  </div>
                  
                  <div className="facts-showcase">
                    {funFacts.map((fact, index) => (
                      <div key={fact.id} className="fact-item-enhanced">
                        <div className="fact-icon-enhanced">{fact.icon}</div>
                        <div className="fact-content">
                          <h4>{fact.title}</h4>
                          <p>{fact.description}</p>
                          <div className="fact-stat">{fact.stat}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="content-card cta-card">
              <div className="card-content">
                <h3>Let's Work Together!</h3>
                <p>I'm always interested in new opportunities and exciting projects. Whether you have a question, a project idea, or just want to connect, I'd love to hear from you!</p>
                <div className="cta-buttons">
                  <a href="/portfolio" className="cta-btn primary">View My Work</a>
                  <a href="/contact" className="cta-btn secondary">Get In Touch</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModernAbout;