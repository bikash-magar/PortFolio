import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function ProjectsEditor() {
  const { projects, technologies, addItem, updateItem, removeItem } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    image: ''
  });

  const availableTechnologies = technologies.map(tech => tech.name);

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies || [],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        image: project.image || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: [],
        githubUrl: '',
        liveUrl: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleSave = () => {
    if (editingProject) {
      updateItem('projects', editingProject.id, formData);
    } else {
      addItem('projects', formData);
    }
    closeModal();
  };

  const handleDelete = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      removeItem('projects', projectId);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Projects</h1>
      
      <div className="dashboard-section">
        <div className="section-title">
          <span>Manage Projects</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add New Project
          </button>
        </div>
        
        <div className="item-list">
          {projects.map((project) => (
            <div key={project.id} className="item-list-item">
              <div className="item-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <small>
                  Technologies: {project.technologies?.join(', ') || 'None specified'}
                  {project.githubUrl && <><br />GitHub: {project.githubUrl}</>}
                  {project.liveUrl && <><br />Live: {project.liveUrl}</>}
                </small>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openModal(project)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(project.id)}
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
              <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Portfolio Website"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of the project..."
              />
            </div>
            
            <div className="form-group">
              <label>Technologies Used</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {availableTechnologies.map(tech => (
                  <label key={tech} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="checkbox"
                      checked={formData.technologies.includes(tech)}
                      onChange={() => handleTechnologyToggle(tech)}
                    />
                    {tech}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>
            
            <div className="form-group">
              <label>Live Demo URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                placeholder="https://yourproject.com"
              />
            </div>
            
            <div className="form-group">
              <label>Project Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/project-screenshot.jpg"
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingProject ? 'Update' : 'Add'} Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsEditor;