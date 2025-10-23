import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function JourneyEditor() {
  const { learningJourney, addItem, updateItem, removeItem } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    step: '',
    title: '',
    description: '',
    date: ''
  });

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        step: item.step,
        title: item.title,
        description: item.description,
        date: item.date
      });
    } else {
      setEditingItem(null);
      const nextStep = Math.max(...learningJourney.map(item => parseInt(item.step)), 0) + 1;
      setFormData({
        step: nextStep.toString(),
        title: '',
        description: '',
        date: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (editingItem) {
      updateItem('learningJourney', editingItem.id, formData);
    } else {
      addItem('learningJourney', formData);
    }
    closeModal();
  };

  const handleDelete = (itemId) => {
    if (confirm('Are you sure you want to delete this journey item?')) {
      removeItem('learningJourney', itemId);
    }
  };

  // Sort journey items by step number
  const sortedItems = [...learningJourney].sort((a, b) => parseInt(a.step) - parseInt(b.step));

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Learning Journey</h1>
      
      <div className="dashboard-section">
        <div className="section-title">
          <span>Manage Journey Steps</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add New Step
          </button>
        </div>
        
        <div className="item-list">
          {sortedItems.map((item) => (
            <div key={item.id} className="item-list-item">
              <div className="item-info">
                <h4>Step {item.step}: {item.title}</h4>
                <p>{item.description}</p>
                <small>Date: {item.date}</small>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openModal(item)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
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
              <h3>{editingItem ? 'Edit Journey Step' : 'Add New Journey Step'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="form-group">
              <label>Step Number</label>
              <input
                type="number"
                value={formData.step}
                onChange={(e) => handleInputChange('step', e.target.value)}
                placeholder="1, 2, 3..."
              />
            </div>
            
            <div className="form-group">
              <label>Step Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Started learning HTML/CSS"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of this step..."
              />
            </div>
            
            <div className="form-group">
              <label>Date/Period</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                placeholder="e.g., 2021 or January 2021"
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingItem ? 'Update' : 'Add'} Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JourneyEditor;