import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function CertificationsEditor() {
  const { certifications, addItem, updateItem, removeItem } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    description: ''
  });

  const openModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        description: cert.description
      });
    } else {
      setEditingCert(null);
      setFormData({
        name: '',
        issuer: '',
        date: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCert(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (editingCert) {
      updateItem('certifications', editingCert.id, formData);
    } else {
      addItem('certifications', formData);
    }
    closeModal();
  };

  const handleDelete = (certId) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      removeItem('certifications', certId);
    }
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Certifications</h1>
      
      <div className="dashboard-section">
        <div className="section-title">
          <span>Manage Certifications</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            Add New Certification
          </button>
        </div>
        
        <div className="item-list">
          {certifications.map((cert) => (
            <div key={cert.id} className="item-list-item">
              <div className="item-info">
                <h4>{cert.name}</h4>
                <p>{cert.description}</p>
                <small>Issued by: {cert.issuer} | Date: {cert.date}</small>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openModal(cert)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(cert.id)}
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
              <h3>{editingCert ? 'Edit Certification' : 'Add New Certification'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="form-group">
              <label>Certification Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., AWS Certified Developer"
              />
            </div>
            
            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => handleInputChange('issuer', e.target.value)}
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            
            <div className="form-group">
              <label>Date Obtained</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                placeholder="e.g., 2023 or January 2023"
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the certification..."
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingCert ? 'Update' : 'Add'} Certification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificationsEditor;