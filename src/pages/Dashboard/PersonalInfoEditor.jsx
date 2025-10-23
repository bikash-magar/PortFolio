import { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function PersonalInfoEditor() {
  const { personal, about, contact, updateData } = usePortfolio();
  
  // Local state for editing
  const [formData, setFormData] = useState({
    personal: { ...personal },
    about: { ...about },
    contact: { ...contact }
  });
  
  const [savingStates, setSavingStates] = useState({
    personal: false,
    about: false,
    contact: false
  });

  // Sync with context data when it changes
  useEffect(() => {
    setFormData({
      personal: { ...personal },
      about: { ...about },
      contact: { ...contact }
    });
  }, [personal, about, contact]);

  // Handle input changes
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle save for specific section
  const handleSave = async (section) => {
    setSavingStates(prev => ({ ...prev, [section]: true }));
    try {
      updateData(section, formData[section]);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSavingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Personal Information</h1>
      
      {/* Basic Information */}
      <div className="dashboard-section">
        <h2 className="section-title">Basic Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.personal.name || ''}
            onChange={(e) => handleChange('personal', 'name', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Professional Title</label>
          <input
            type="text"
            value={formData.personal.title || ''}
            onChange={(e) => handleChange('personal', 'title', e.target.value)}
            placeholder="e.g., Software Developer"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.personal.email || ''}
            onChange={(e) => handleChange('personal', 'email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.personal.phone || ''}
            onChange={(e) => handleChange('personal', 'phone', e.target.value)}
            placeholder="+1 (123) 456-7890"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={formData.personal.location || ''}
            onChange={(e) => handleChange('personal', 'location', e.target.value)}
            placeholder="City, Country"
          />
        </div>
        <button 
          className={`btn ${savingStates.personal ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => handleSave('personal')}
          disabled={savingStates.personal}
        >
          {savingStates.personal ? 'Saving...' : 'Save Basic Info'}
        </button>
      </div>

      {/* About Section */}
      <div className="dashboard-section">
        <h2 className="section-title">About Section</h2>
        <div className="form-group">
          <label>About Title</label>
          <input
            type="text"
            value={formData.about.title || ''}
            onChange={(e) => handleChange('about', 'title', e.target.value)}
            placeholder="About Me"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={formData.about.description || ''}
            onChange={(e) => handleChange('about', 'description', e.target.value)}
            placeholder="Tell visitors about yourself..."
          />
        </div>
        <div className="form-group">
          <label>Mission Statement</label>
          <textarea
            rows="3"
            value={formData.about.mission || ''}
            onChange={(e) => handleChange('about', 'mission', e.target.value)}
            placeholder="Your mission statement..."
          />
        </div>
        <div className="form-group">
          <label>Vision Statement</label>
          <textarea
            rows="3"
            value={formData.about.vision || ''}
            onChange={(e) => handleChange('about', 'vision', e.target.value)}
            placeholder="Your vision statement..."
          />
        </div>
        <button 
          className={`btn ${savingStates.about ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => handleSave('about')}
          disabled={savingStates.about}
        >
          {savingStates.about ? 'Saving...' : 'Save About Info'}
        </button>
      </div>

      {/* Social Links */}
      <div className="dashboard-section">
        <h2 className="section-title">Social Links</h2>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="url"
            value={formData.contact.linkedin || ''}
            onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            value={formData.contact.github || ''}
            onChange={(e) => handleChange('contact', 'github', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div className="form-group">
          <label>Twitter URL</label>
          <input
            type="url"
            value={formData.contact.twitter || ''}
            onChange={(e) => handleChange('contact', 'twitter', e.target.value)}
            placeholder="https://twitter.com/yourusername"
          />
        </div>
        <button 
          className={`btn ${savingStates.contact ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => handleSave('contact')}
          disabled={savingStates.contact}
        >
          {savingStates.contact ? 'Saving...' : 'Save Social Links'}
        </button>
      </div>
    </div>
  );
}

export default PersonalInfoEditor;