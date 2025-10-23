import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Home.css';

function Home() {
  const { personal, about, technologies, projects, certifications, floatingCards, profilePicture } = usePortfolio();

  // Professional 3-item floating cards - carefully selected core technologies
  const defaultCards = [
    { id: 1, icon: '⚛️', title: 'React Ecosystem', subtitle: 'Frontend Expert', className: 'react-card' },
    { id: 2, icon: '�', title: 'Full-Stack Dev', subtitle: 'Node.js & APIs', className: 'node-card' },
    { id: 3, icon: '☁️', title: 'Cloud & DevOps', subtitle: 'AWS & CI/CD', className: 'cloud-card' }
  ];

  const displayCards = floatingCards && floatingCards.length > 0 ? floatingCards : defaultCards;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-text">Hello, I'm</span>
            </div>
            <h1 className="hero-name">
              {personal.name || "Your Name"}
            </h1>
            <h2 className="hero-title">
              {personal.title || "Software Developer"}
            </h2>
            <p className="hero-description">
              {about.description || "Passionate developer creating amazing digital experiences with modern technologies and clean, efficient code."}
            </p>
            
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{projects?.length || 0}+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{technologies?.length || 0}+</span>
                <span className="stat-label">Technologies</span>
              </div>
                            <div className="stat-item">
                <span className="stat-number">{certifications?.length || 0}+</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="profile-container">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt={`${personal.name || 'Profile'}`} 
                  className="profile-picture"
                />
              ) : (
                <div className="profile-placeholder">
                  <i className="fas fa-user"></i>
                  <span>Profile Picture</span>
                </div>
              )}
            </div>
            
            {/* Floating Tech Cards around profile */}
            <div className="floating-elements">
              {displayCards.map((card, index) => (
                <div 
                  key={card.id} 
                  className={`floating-card ${card.className || ''}`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    transform: `translateY(${Math.sin(index * 0.5) * 10}px)`
                  }}
                >
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-content">
                    <h4>{card.title}</h4>
                    <p>{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Scroll Down</span>
        </div>
      </section>

      <section className="quick-about">
        <div className="page-container">
          <div className="about-grid">
            <div className="about-text">
              <h3>About Me</h3>
              <p>{about.mission || "I'm passionate about creating innovative solutions and bringing ideas to life through code. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies."}</p>
              <Link to="/about" className="learn-more-btn">
                Learn More About Me <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">💡</div>
                <h4>Problem Solver</h4>
                <p>I love tackling complex challenges and finding elegant solutions</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🤝</div>
                <h4>Team Player</h4>
                <p>Collaborative approach to development and knowledge sharing</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🚀</div>
                <h4>Fast Learner</h4>
                <p>Always eager to learn new technologies and best practices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Technologies */}
      <section className="featured-tech">
        <div className="page-container">
          <h3>Technologies I Work With</h3>
          <div className="tech-grid">
            {technologies?.slice(0, 6).map((tech, index) => (
              <div key={index} className="tech-item">
                <div className="tech-icon">💻</div>
                <div className="tech-info">
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-category">{tech.category}</span>
                </div>
              </div>
            )) || (
              <>
                <div className="tech-item">
                  <div className="tech-icon">⚛️</div>
                  <div className="tech-info">
                    <span className="tech-name">React</span>
                    <span className="tech-category">Frontend</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">�</div>
                  <div className="tech-info">
                    <span className="tech-name">JavaScript</span>
                    <span className="tech-category">Language</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">🎨</div>
                  <div className="tech-info">
                    <span className="tech-name">CSS3</span>
                    <span className="tech-category">Styling</span>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">�</div>
                  <div className="tech-info">
                    <span className="tech-name">Node.js</span>
                    <span className="tech-category">Backend</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="tech-cta">
            <Link to="/portfolio" className="view-all-tech">
              View All Technologies <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;