import React, { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function ResumeEditor() {
  const { resume, updateData } = usePortfolio();
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Store original data when component mounts
  React.useEffect(() => {
    if (resume && !originalData) {
      setOriginalData(JSON.parse(JSON.stringify(resume)));
    }
  }, [resume, originalData]);

  const handleEditSection = (section) => {
    setEditingSection(section.id);
    setFormData({ ...section });
  };

  const handleSaveSection = () => {
    const updatedSections = resume.sections.map(section =>
      section.id === editingSection ? formData : section
    );
    
    updateData('resume', {
      ...resume,
      sections: updatedSections
    });
    
    setEditingSection(null);
    setFormData({});
    setHasChanges(true);
    alert('Resume section updated successfully!');
  };

  const handleGlobalSave = () => {
    // Data is already saved in localStorage through context
    setHasChanges(false);
    setOriginalData(JSON.parse(JSON.stringify(resume)));
    alert('All resume changes saved successfully!');
  };

  const handleGlobalCancel = () => {
    if (hasChanges && window.confirm('Are you sure you want to cancel all changes? This will revert to the last saved state.')) {
      updateData('resume', originalData);
      setHasChanges(false);
      setEditingSection(null);
      setFormData({});
      alert('Changes cancelled and reverted to last saved state.');
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (itemIndex, field, value) => {
    const updatedItems = [...(formData.items || [])];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handleSkillCategoryChange = (categoryIndex, field, value) => {
    const updatedCategories = [...(formData.categories || [])];
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

  const handleSkillsChange = (categoryIndex, skillsString) => {
    // Support both simple (string) and enhanced (object with level) formats
    const skillsArray = skillsString.split(',').map(skill => {
      const trimmedSkill = skill.trim();
      if (!trimmedSkill) return null;
      
      // Check if skill includes level (e.g., "JavaScript (90%)" or "JavaScript - 90")
      const levelMatch = trimmedSkill.match(/(.+?)\s*[\(\-]\s*(\d+)[\%\)]?\s*[\)]?$/);
      if (levelMatch) {
        return {
          name: levelMatch[1].trim(),
          level: parseInt(levelMatch[2])
        };
      }
      
      // Default format - just the skill name
      return trimmedSkill;
    }).filter(skill => skill);
    
    handleSkillCategoryChange(categoryIndex, 'skills', skillsArray);
  };

  const addExperienceItem = () => {
    const newItem = {
      id: Date.now(),
      position: '',
      company: '',
      location: '',
      duration: '',
      description: '',
      achievements: []
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const addEducationItem = () => {
    const newItem = {
      id: Date.now(),
      degree: '',
      institution: '',
      location: '',
      duration: '',
      gpa: '',
      relevant_courses: []
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const addSkillCategory = () => {
    const newCategory = {
      id: Date.now(),
      category: '',
      icon: '💻',
      color: '#667eea',
      skills: []
    };
    setFormData(prev => ({
      ...prev,
      categories: [...(prev.categories || []), newCategory]
    }));
  };

  const addProjectItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      duration: '',
      highlights: [],
      githubUrl: '',
      liveUrl: ''
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const addCertificationItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const addLeadershipItem = () => {
    const newItem = {
      id: Date.now(),
      skill: '',
      description: '',
      examples: []
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const removeItem = (itemIndex) => {
    const updatedItems = formData.items.filter((_, index) => index !== itemIndex);
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const removeSkillCategory = (categoryIndex) => {
    const updatedCategories = formData.categories.filter((_, index) => index !== categoryIndex);
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

  const renderSummaryEditor = () => (
    <div className="form-group">
      <label>Professional Summary</label>
      <textarea
        value={formData.content || ''}
        onChange={(e) => handleInputChange('content', e.target.value)}
        rows={6}
        placeholder="Write your professional summary..."
        className="form-input"
      />
    </div>
  );

  const renderExperienceEditor = () => (
    <div>
      <div className="section-header">
        <h4>Work Experience</h4>
        <button type="button" onClick={addExperienceItem} className="btn btn-secondary">
          Add Experience
        </button>
      </div>
      
      {formData.items?.map((item, index) => (
        <div key={item.id} className="item-editor">
          <div className="item-header">
            <h5>Experience {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeItem(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={item.position || ''}
                onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={item.company || ''}
                onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={item.duration || ''}
                onChange={(e) => handleItemChange(index, 'duration', e.target.value)}
                placeholder="e.g., 2022 - Present"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={item.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              rows={3}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Achievements (one per line)</label>
            <textarea
              value={(item.achievements || []).join('\n')}
              onChange={(e) => handleItemChange(index, 'achievements', e.target.value.split('\n').filter(a => a.trim()))}
              rows={4}
              placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
              className="form-input"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducationEditor = () => (
    <div>
      <div className="section-header">
        <h4>Education</h4>
        <button type="button" onClick={addEducationItem} className="btn btn-secondary">
          Add Education
        </button>
      </div>
      
      {formData.items?.map((item, index) => (
        <div key={item.id} className="item-editor">
          <div className="item-header">
            <h5>Education {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeItem(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={item.degree || ''}
                onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={item.institution || ''}
                onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={item.duration || ''}
                onChange={(e) => handleItemChange(index, 'duration', e.target.value)}
                placeholder="e.g., 2018 - 2022"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>GPA (optional)</label>
            <input
              type="text"
              value={item.gpa || ''}
              onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
              placeholder="e.g., 3.8/4.0"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Relevant Courses (comma-separated)</label>
            <textarea
              value={(item.relevant_courses || []).join(', ')}
              onChange={(e) => handleItemChange(index, 'relevant_courses', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
              rows={2}
              placeholder="Data Structures, Algorithms, Web Development"
              className="form-input"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkillsEditor = () => (
    <div>
      <div className="section-header">
        <h4>Skills</h4>
        <button type="button" onClick={addSkillCategory} className="btn btn-secondary">
          Add Skill Category
        </button>
      </div>
      
      {formData.categories?.map((category, index) => (
        <div key={category.id} className="item-editor">
          <div className="item-header">
            <h5>Category {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeSkillCategory(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                value={category.category || ''}
                onChange={(e) => handleSkillCategoryChange(index, 'category', e.target.value)}
                placeholder="e.g., Programming Languages"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                value={category.icon || ''}
                onChange={(e) => handleSkillCategoryChange(index, 'icon', e.target.value)}
                placeholder="💻"
                className="form-input"
                style={{ width: '80px' }}
              />
            </div>
            
            <div className="form-group">
              <label>Color</label>
              <input
                type="color"
                value={category.color || '#667eea'}
                onChange={(e) => handleSkillCategoryChange(index, 'color', e.target.value)}
                className="form-input"
                style={{ width: '80px', height: '40px' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Skills</label>
            <textarea
              value={
                (category.skills || []).map(skill => 
                  typeof skill === 'string' 
                    ? skill 
                    : `${skill.name} (${skill.level}%)`
                ).join(', ')
              }
              onChange={(e) => handleSkillsChange(index, e.target.value)}
              rows={3}
              placeholder="JavaScript (90%), Python (85%), React (90%)"
              className="form-input"
            />
            <small className="form-help">
              Enter skills separated by commas. Add proficiency levels in parentheses: "JavaScript (90%)"
            </small>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjectsEditor = () => (
    <div>
      <div className="section-header">
        <h4>Projects</h4>
        <button type="button" onClick={addProjectItem} className="btn btn-secondary">
          Add Project
        </button>
      </div>
      
      {formData.items?.map((project, index) => (
        <div key={project.id} className="item-editor">
          <div className="item-header">
            <h5>Project {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeItem(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                value={project.name || ''}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="E-Commerce Platform"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={project.duration || ''}
                onChange={(e) => handleItemChange(index, 'duration', e.target.value)}
                placeholder="3 months"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={project.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              rows={2}
              placeholder="Full-stack web application with React frontend and Node.js backend"
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                value={project.githubUrl || ''}
                onChange={(e) => handleItemChange(index, 'githubUrl', e.target.value)}
                placeholder="https://github.com/username/project"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Live Demo URL</label>
              <input
                type="url"
                value={project.liveUrl || ''}
                onChange={(e) => handleItemChange(index, 'liveUrl', e.target.value)}
                placeholder="https://your-demo.com"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Technologies (comma-separated)</label>
            <textarea
              value={(project.technologies || []).join(', ')}
              onChange={(e) => handleItemChange(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
              rows={2}
              placeholder="React, Node.js, MongoDB, Express"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Key Highlights (comma-separated)</label>
            <textarea
              value={(project.highlights || []).join(', ')}
              onChange={(e) => handleItemChange(index, 'highlights', e.target.value.split(',').map(h => h.trim()).filter(h => h))}
              rows={3}
              placeholder="Implemented secure payment processing, Built responsive design"
              className="form-input"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificationsEditor = () => (
    <div>
      <div className="section-header">
        <h4>Certifications</h4>
        <button type="button" onClick={addCertificationItem} className="btn btn-secondary">
          Add Certification
        </button>
      </div>
      
      {formData.items?.map((cert, index) => (
        <div key={cert.id} className="item-editor">
          <div className="item-header">
            <h5>Certification {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeItem(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Certification Name</label>
              <input
                type="text"
                value={cert.name || ''}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="AWS Certified Developer"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                value={cert.date || ''}
                onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                placeholder="2024"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Issuer</label>
              <input
                type="text"
                value={cert.issuer || ''}
                onChange={(e) => handleItemChange(index, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Credential ID</label>
              <input
                type="text"
                value={cert.credentialId || ''}
                onChange={(e) => handleItemChange(index, 'credentialId', e.target.value)}
                placeholder="AWS-DEV-2024-001"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={cert.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              rows={2}
              placeholder="Cloud development and deployment expertise"
              className="form-input"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeadershipEditor = () => (
    <div>
      <div className="section-header">
        <h4>Leadership Skills</h4>
        <button type="button" onClick={addLeadershipItem} className="btn btn-secondary">
          Add Leadership Skill
        </button>
      </div>
      
      {formData.items?.map((leadership, index) => (
        <div key={leadership.id} className="item-editor">
          <div className="item-header">
            <h5>Leadership Skill {index + 1}</h5>
            <button 
              type="button" 
              onClick={() => removeItem(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              value={leadership.skill || ''}
              onChange={(e) => handleItemChange(index, 'skill', e.target.value)}
              placeholder="Team Leadership"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={leadership.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              rows={2}
              placeholder="Led cross-functional teams of 5-8 developers on multiple projects"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Examples (comma-separated)</label>
            <textarea
              value={(leadership.examples || []).join(', ')}
              onChange={(e) => handleItemChange(index, 'examples', e.target.value.split(',').map(ex => ex.trim()).filter(ex => ex))}
              rows={3}
              placeholder="Managed development team for e-commerce platform launch, Coordinated with stakeholders"
              className="form-input"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEditor = () => {
    if (!editingSection) return null;

    const section = resume.sections.find(s => s.id === editingSection);
    if (!section) return null;

    return (
      <div className="editor-modal">
        <div className="editor-content">
          <div className="editor-header">
            <h3>Edit {section.title}</h3>
          </div>
          
          <div className="editor-form">
            {section.type === 'summary' && renderSummaryEditor()}
            {section.type === 'experience' && renderExperienceEditor()}
            {section.type === 'education' && renderEducationEditor()}
            {section.type === 'skills' && renderSkillsEditor()}
            {section.type === 'projects' && renderProjectsEditor()}
            {section.type === 'certifications' && renderCertificationsEditor()}
            {section.type === 'leadership' && renderLeadershipEditor()}
          </div>
          
          <div className="editor-footer">
            <div className="editor-actions">
              <button onClick={handleCancelEdit} className="btn btn-secondary">
                <i className="fas fa-times" style={{marginRight: '8px'}}></i>
                Cancel
              </button>
              <button onClick={handleSaveSection} className="btn btn-primary">
                <i className="fas fa-save" style={{marginRight: '8px'}}></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Resume Editor</h1>
      <p className="dashboard-subtitle">
        Manage your resume sections that appear in the Portfolio page
      </p>
      
      <div className="resume-sections">
        {resume.sections?.map((section) => (
          <div key={section.id} className="resume-section-card">
            <div className="section-header">
              <h3>{section.title}</h3>
              <button 
                onClick={() => handleEditSection(section)}
                className="btn btn-primary"
              >
                Edit Section
              </button>
            </div>
            
            <div className="section-preview">
              {section.type === 'summary' && (
                <p className="preview-text">{section.content}</p>
              )}
              
              {section.type === 'experience' && (
                <div className="preview-items">
                  {section.items?.map((item, index) => (
                    <div key={index} className="preview-item">
                      <strong>{item.position}</strong> at {item.company} ({item.duration})
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'education' && (
                <div className="preview-items">
                  {section.items?.map((item, index) => (
                    <div key={index} className="preview-item">
                      <strong>{item.degree}</strong> - {item.institution} ({item.duration})
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'skills' && (
                <div className="preview-skills">
                  {section.categories?.map((category, index) => (
                    <div key={index} className="skill-category-preview">
                      <div className="skill-category-header-preview">
                        <span className="skill-icon-preview">{category.icon}</span>
                        <strong>{category.category}:</strong>
                      </div>
                      <div className="skills-preview-list">
                        {category.skills?.map((skill, i) => (
                          <span key={i} className="skill-preview-item">
                            {typeof skill === 'string' 
                              ? skill 
                              : `${skill.name} (${skill.level}%)`
                            }
                          </span>
                        )).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'projects' && (
                <div className="preview-items">
                  {section.items?.map((project, index) => (
                    <div key={index} className="preview-item">
                      <strong>{project.name}</strong> ({project.duration})
                      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px' }}>
                        {project.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'certifications' && (
                <div className="preview-items">
                  {section.items?.map((cert, index) => (
                    <div key={index} className="preview-item">
                      <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'leadership' && (
                <div className="preview-items">
                  {section.items?.map((leadership, index) => (
                    <div key={index} className="preview-item">
                      <strong>{leadership.skill}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px' }}>
                        {leadership.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Global Save/Cancel Buttons */}
      <div className="resume-actions">
        <div className="actions-container">
          <div className="actions-info">
            {hasChanges && (
              <span className="changes-indicator">
                <i className="fas fa-circle" style={{color: '#ffc107', marginRight: '8px'}}></i>
                You have unsaved changes
              </span>
            )}
            {!hasChanges && (
              <span className="saved-indicator">
                <i className="fas fa-check-circle" style={{color: '#28a745', marginRight: '8px'}}></i>
                All changes saved
              </span>
            )}
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn btn-secondary"
              onClick={handleGlobalCancel}
              disabled={!hasChanges}
            >
              <i className="fas fa-undo" style={{marginRight: '8px'}}></i>
              Cancel Changes
            </button>
            
            <button 
              className="btn btn-primary"
              onClick={handleGlobalSave}
              disabled={!hasChanges}
            >
              <i className="fas fa-save" style={{marginRight: '8px'}}></i>
              Save All Changes
            </button>
          </div>
        </div>
      </div>
      
      {renderEditor()}
    </div>
  );
}

export default ResumeEditor;