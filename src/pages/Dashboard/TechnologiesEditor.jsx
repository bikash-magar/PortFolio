import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function TechnologiesEditor() {
  const { technologies, addItem, updateItem, removeItem } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Programming Language',
    proficiency: 'Beginner'
  });

  const categories = ['Programming Language', 'Framework', 'Library', 'Database', 'Cloud Service', 'Other'];
  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const openModal = (tech = null) => {
    if (tech) {
      setEditingTech(tech);
      setFormData({
        name: tech.name,
        description: tech.description,
        category: tech.category,
        proficiency: tech.proficiency
      });
    } else {
      setEditingTech(null);
      setFormData({
        name: '',
        description: '',
        category: 'Programming Language',
        proficiency: 'Beginner'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTech(null);
    setFormData({
      name: '',
      description: '',
      category: 'Programming Language',
      proficiency: 'Beginner'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (editingTech) {
      // Update existing technology
      updateItem('technologies', editingTech.id, formData);
    } else {
      // Add new technology
      addItem('technologies', formData);
    }
    closeModal();
  };

  const handleDelete = (techId) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      removeItem('technologies', techId);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Technologies</h1>
      
      <div className="dashboard-section">
        <div className="section-title">
          <span>Manage Technologies</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add New Technology
          </button>
        </div>
        
        <div className="item-list">
          {technologies.map((tech) => (
            <div key={tech.id} className="item-list-item">
              <div className="item-info">
                <h4>{tech.name}</h4>
                <p>{tech.description}</p>
                <small>Category: {tech.category} | Proficiency: {tech.proficiency}</small>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openModal(tech)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(tech.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingTech ? 'Edit Technology' : 'Add New Technology'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="form-group">
              <label>Technology Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., React, Python, Docker"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the technology..."
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Proficiency Level</label>
              <select
                value={formData.proficiency}
                onChange={(e) => handleInputChange('proficiency', e.target.value)}
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingTech ? 'Update' : 'Add'} Technology
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologiesEditor;