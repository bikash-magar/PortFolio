import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function ToolsEditor() {
  const { tools, addItem, updateItem, removeItem } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'IDE'
  });

  const categories = ['IDE', 'Version Control', 'Testing', 'DevOps', 'Design', 'Database', 'Other'];

  const openModal = (tool = null) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        name: tool.name,
        description: tool.description,
        category: tool.category
      });
    } else {
      setEditingTool(null);
      setFormData({
        name: '',
        description: '',
        category: 'IDE'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTool(null);
    setFormData({
      name: '',
      description: '',
      category: 'IDE'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (editingTool) {
      updateItem('tools', editingTool.id, formData);
    } else {
      addItem('tools', formData);
    }
    closeModal();
  };

  const handleDelete = (toolId) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      removeItem('tools', toolId);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Tools & Utilities</h1>
      
      <div className="dashboard-section">
        <div className="section-title">
          <span>Manage Tools</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add New Tool
          </button>
        </div>
        
        <div className="item-list">
          {tools.map((tool) => (
            <div key={tool.id} className="item-list-item">
              <div className="item-info">
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
                <small>Category: {tool.category}</small>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openModal(tool)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(tool.id)}
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
              <h3>{editingTool ? 'Edit Tool' : 'Add New Tool'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="form-group">
              <label>Tool Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., VS Code, Git, Docker"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the tool..."
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
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingTool ? 'Update' : 'Add'} Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolsEditor;