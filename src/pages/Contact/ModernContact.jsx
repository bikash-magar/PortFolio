import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './ModernContact.css';

function ModernContact() {
  const { personal, contact } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  return (
    <div className="modern-contact">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="page-container">
          <h1>Get In Touch</h1>
          <p>Have a project in mind? Let's work together to create something amazing!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="page-container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Let's Start a Conversation</h2>
              <p>
                I'm always interested in new opportunities, interesting projects, 
                and great people. Drop me a line and let's chat!
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>{personal.email || contact.email || 'bikashmagar.dev@gmail.com'}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>{personal.phone || contact.phone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>{personal.location || contact.location || 'Your City, Country'}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-icons">
                  {contact.linkedin && (
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span>💼</span>
                      LinkedIn
                    </a>
                  )}
                  {contact.github && (
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span>💻</span>
                      GitHub
                    </a>
                  )}
                  {contact.twitter && (
                    <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                      <span>🐦</span>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Me a Message</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-message">
                    <span>✅</span>
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="contact-stats">
        <div className="page-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <h4>Quick Response</h4>
              <p>I typically respond within 24 hours</p>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">🤝</div>
              <h4>Collaborative</h4>
              <p>I love working with great teams</p>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <h4>Results Driven</h4>
              <p>Focused on delivering quality solutions</p>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">💡</div>
              <h4>Creative Problem Solving</h4>
              <p>Innovative approaches to challenges</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModernContact;