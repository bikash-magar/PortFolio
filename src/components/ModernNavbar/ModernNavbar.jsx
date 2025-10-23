import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import './ModernNavbar.css';

function ModernNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { personal, contact, isDarkMode, toggleDarkMode } = usePortfolio();

  // Create WhatsApp link - Direct approach
  const createWhatsAppLink = () => {
    // Your direct WhatsApp number - no dependencies on context
    const myWhatsAppNumber = "13269006983"; // Your number without + or spaces
    const message = "Hi there! I would like to discuss a potential project with you.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;
    
    console.log('WhatsApp Link Generated:', whatsappURL);
    return whatsappURL;
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const whatsappLink = createWhatsAppLink();
    console.log('Opening WhatsApp with link:', whatsappLink);
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <span className="brand-initial">


               {/* {(personal.name || 'YN').charAt(0)}  */}
              <img src="./public/profile-min.jpg" alt="profilePic" />

              
            </span>
          </div>
          <span className="brand-text">
            {personal.name || 'Bikash Magar'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav desktop-nav">
          {navigationItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          <DarkModeToggle isDark={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <button 
            onClick={handleWhatsAppClick}
            className="cta-button"
            title="Message me on WhatsApp"
            type="button"
          >
            💬 Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          {navigationItems.map((item) => (
            <li key={item.path} className="mobile-nav-item">
              <Link
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mobile-nav-item">
            <button
              onClick={(e) => {
                handleWhatsAppClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="mobile-cta-button"
              title="Message me on WhatsApp"
              type="button"
            >
              💬 Let's Talk
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default ModernNavbar;