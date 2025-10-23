import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { generateResumePDF } from '../../utils/pdfGenerator';
import './ModernPortfolio.css';

function ModernPortfolio() {
  const { technologies, tools, certifications, projects, resume, personal } = usePortfolio();
  const [activeTab, setActiveTab] = useState('technologies');
  const resumeRef = useRef(null);

  // PDF download using canvas method
  const downloadResumeAsPDF = async () => {
    if (!resumeRef.current) {
      alert('Resume content not found. Please make sure you are on the Resume tab.');
      return;
    }

    try {
      // Show loading state
      const button = document.querySelector('.download-pdf-btn');
      if (!button) return;
      
      const originalText = button.textContent;
      button.textContent = 'Generating PDF...';
      button.disabled = true;

      // Wait longer for the UI to stabilize
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Starting PDF generation process...');
      console.log('Resume ref element:', resumeRef.current);

      // Generate filename
      const fileName = `${personal?.name?.replace(/\s+/g, '_') || 'Resume'}_CV.pdf`;
      
      // Use the utility function with better error handling
      await generateResumePDF(resumeRef.current, fileName);

      console.log('PDF generation completed successfully');

      // Reset button state
      button.textContent = originalText;
      button.disabled = false;
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      
      // Show more specific error message
      let errorMessage = 'Error generating PDF. ';
      if (error.message.includes('visible')) {
        errorMessage += 'Please make sure the resume is fully loaded and visible.';
      } else if (error.message.includes('capture')) {
        errorMessage += 'There was an issue capturing the resume content. Please try refreshing the page.';
      } else {
        errorMessage += 'Please try again or refresh the page.';
      }
      
      alert(errorMessage);
      
      // Reset button state on error
      const button = document.querySelector('.download-pdf-btn');
      if (button) {
        button.textContent = '📄 Download PDF';
        button.disabled = false;
      }
    }
  };

  const tabs = [
    { id: 'technologies', label: 'Technologies', data: technologies },
    { id: 'tools', label: 'Tools', data: tools },
    { id: 'certifications', label: 'Certifications', data: certifications },
    { id: 'projects', label: 'Projects', data: projects },
    { id: 'resume', label: 'Resume', data: resume?.sections || [] }
  ];

  const renderTechnologyCard = (tech) => (
    <div key={tech.id} className="portfolio-card tech-card">
      <div className="card-header">
        <div className="tech-icon">
          {tech.name?.charAt(0) || 'T'}
        </div>
        <h3>{tech.name}</h3>
      </div>
      <p className="card-description">{tech.description}</p>
      <div className="card-footer">
        <span className="category-tag">{tech.category}</span>
        <span className="proficiency-badge">{tech.proficiency}</span>
      </div>
    </div>
  );

  const renderToolCard = (tool) => (
    <div key={tool.id} className="portfolio-card tool-card">
      <div className="card-header">
        <div className="tool-icon">
          {tool.name?.charAt(0) || 'T'}
        </div>
        <h3>{tool.name}</h3>
      </div>
      <p className="card-description">{tool.description}</p>
      <div className="card-footer">
        <span className="category-tag">{tool.category}</span>
        <span className="experience-badge">{tool.experience}</span>
      </div>
    </div>
  );

  const renderCertificationCard = (cert) => (
    <div key={cert.id} className="portfolio-card cert-card">
      <div className="card-header">
        <div className="cert-icon">🏆</div>
        <h3>{cert.name}</h3>
      </div>
      <p className="card-description">{cert.organization}</p>
      <div className="cert-details">
        <p><strong>Issued:</strong> {cert.issueDate}</p>
        {cert.expiryDate && <p><strong>Expires:</strong> {cert.expiryDate}</p>}
        {cert.credentialId && <p><strong>ID:</strong> {cert.credentialId}</p>}
      </div>
      {cert.verificationUrl && (
        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="verify-btn">
          Verify Certificate
        </a>
      )}
    </div>
  );

  const renderProjectCard = (project) => (
    <div key={project.id} className="portfolio-card project-card">
      <div className="project-image">
        <img src="/api/placeholder/300/200" alt={project.title} />
        <div className="project-overlay">
          <div className="project-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="card-content">
        <h3>{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="tech-stack">
          {project.technologies?.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResumeLayout = () => {
    return (
      <div>
        {/* Download Button */}
        <div className="resume-download-container">
          <button 
            onClick={downloadResumeAsPDF}
            className="download-pdf-btn"
          >
            📄 Download PDF
          </button>
        </div>
        
        {/* Resume Content */}
        <div ref={resumeRef} className="resume-card">
          {/* Resume Header */}
          <div className="resume-header">
            <h1>{personal?.name || 'Your Name'}</h1>
            <div className="title">{personal?.title || 'Professional Title'}</div>
            <div className="resume-contact">
              <span>📧 {personal?.email || 'email@example.com'}</span>
              <span>📱 {personal?.phone || '+13269006983'}</span>
              <span>📍 {personal?.location || 'City, Country'}</span>
            </div>
          </div>

          {/* Resume Sections */}
        {resume?.sections?.map((section) => (
          <div key={section.id} className="resume-section">
            <h2 className="resume-section-title">{section.title}</h2>
            
            {section.type === 'summary' && (
              <p className="resume-summary">{section.content}</p>
            )}
            
            {section.type === 'experience' && (
              <div>
                {section.items?.map((item, index) => (
                  <div key={index} className="resume-experience-item">
                    <div className="experience-header">
                      <div className="experience-title">
                        <h3 className="experience-position">{item.position}</h3>
                        <div className="experience-company">{item.company}</div>
                        <div className="experience-location">{item.location}</div>
                      </div>
                      <div className="experience-duration">{item.duration}</div>
                    </div>
                    <p className="experience-description">{item.description}</p>
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="experience-achievements">
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'education' && (
              <div>
                {section.items?.map((item, index) => (
                  <div key={index} className="resume-education-item">
                    <div className="education-header">
                      <div>
                        <h3 className="education-degree">{item.degree}</h3>
                        <div className="education-institution">{item.institution}</div>
                        <div className="education-location-duration">{item.location}</div>
                      </div>
                      <div className="education-duration">{item.duration}</div>
                    </div>
                    {item.gpa && (
                      <div className="education-gpa">GPA: {item.gpa}</div>
                    )}
                    {item.relevant_courses && item.relevant_courses.length > 0 && (
                      <div className="education-courses">
                        <span className="education-courses-label">Relevant Coursework:</span>
                        <div className="course-tags">
                          {item.relevant_courses.map((course, i) => (
                            <span key={i} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'skills' && (
              <div className="resume-skills-grid">
                {section.categories?.map((category, index) => (
                  <div key={index} className="skill-category" style={{'--category-color': category.color || '#667eea'}}>
                    <div className="skill-category-header">
                      <span className="skill-category-icon">{category.icon}</span>
                      <h3 className="skill-category-title">{category.category}</h3>
                      <div className="skill-count">{category.skills.length}</div>
                    </div>
                    <div className="skills-list">
                      {category.skills.map((skill, i) => (
                        <div 
                          key={i} 
                          className="skill-item"
                          title={`${typeof skill === 'string' ? skill : skill.name}${typeof skill === 'object' && skill.description ? `: ${skill.description}` : ''}`}
                        >
                          <div className="skill-info">
                            <span className="skill-name">
                              {typeof skill === 'string' ? skill : skill.name}
                            </span>
                            {typeof skill === 'object' && skill.description && (
                              <span className="skill-description">{skill.description}</span>
                            )}
                          </div>
                          {/* {typeof skill === 'string' && (
                            <span className="skill-tag">{skill}</span>
                          )} */}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'projects' && (
              <div className="resume-projects-grid">
                {section.items?.map((project, index) => (
                  <div key={index} className="resume-project-item">
                    <div className="project-header">
                      <div className="project-info">
                        <h3 className="project-name">{project.name}</h3>
                        <div className="project-duration">{project.duration}</div>
                      </div>
                      <div className="project-links">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                            GitHub
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-technologies">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="project-highlights">
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'certifications' && (
              <div className="resume-certifications-grid">
                {section.items?.map((cert, index) => (
                  <div key={index} className="resume-certification-item">
                    <div className="certification-header">
                      <h3 className="certification-name">{cert.name}</h3>
                      <div className="certification-date">{cert.date}</div>
                    </div>
                    <div className="certification-issuer">{cert.issuer}</div>
                    {cert.credentialId && (
                      <div className="certification-id">ID: {cert.credentialId}</div>
                    )}
                    <p className="certification-description">{cert.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'leadership' && (
              <div className="resume-leadership-grid">
                {section.items?.map((leadership, index) => (
                  <div key={index} className="resume-leadership-item">
                    <h3 className="leadership-skill">{leadership.skill}</h3>
                    <p className="leadership-description">{leadership.description}</p>
                    {leadership.examples && leadership.examples.length > 0 && (
                      <ul className="leadership-examples">
                        {leadership.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    );
  };

  const renderCards = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab)?.data || [];
    
    // Special handling for resume layout
    if (activeTab === 'resume') {
      if (!resume?.sections || resume.sections.length === 0) {
        return (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No resume sections yet</h3>
            <p>Content will appear here once added through the dashboard.</p>
          </div>
        );
      }
      return renderResumeLayout();
    }
    
    if (activeTabData.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No {activeTab} yet</h3>
          <p>Content will appear here once added through the dashboard.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'technologies':
        return activeTabData.map(renderTechnologyCard);
      case 'tools':
        return activeTabData.map(renderToolCard);
      case 'certifications':
        return activeTabData.map(renderCertificationCard);
      case 'projects':
        return activeTabData.map(renderProjectCard);
      default:
        return null;
    }
  };

  return (
    <div className="modern-portfolio">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="page-container">
          <h1>My Portfolio</h1>
          <p>Showcasing my skills, experience, and projects</p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className={`portfolio-content ${activeTab === 'resume' ? 'resume-mode' : ''}`}>
        <div className={`page-container ${activeTab === 'resume' ? 'resume-container' : ''}`}>
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="tab-count">({tab.data?.length || 0})</span>
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="cards-grid">
            {renderCards()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModernPortfolio;