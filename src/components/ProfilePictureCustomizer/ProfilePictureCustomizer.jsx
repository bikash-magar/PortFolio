import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './ProfilePictureCustomizer.css';

const ProfilePictureCustomizer = () => {
  const { profilePicture, updateProfilePicture } = usePortfolio();
  const [preview, setPreview] = useState(profilePicture);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, GIF, etc.)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event for handleFileSelect
      const syntheticEvent = {
        target: { files: [file] }
      };
      handleFileSelect(syntheticEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSave = () => {
    updateProfilePicture(preview);
    setHasChanges(false);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '✅ Profile picture updated successfully!';
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      setPreview(null);
      setHasChanges(true);
    }
  };

  const handleReset = () => {
    setPreview(profilePicture);
    setHasChanges(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-picture-customizer">
      <div className="customizer-header">
        <h3>📷 Profile Picture Customizer</h3>
        <p>Upload and manage your profile picture for the home page</p>
        {hasChanges && (
          <div className="changes-indicator">
            <span className="changes-dot"></span>
            Unsaved changes
          </div>
        )}
      </div>

      <div className="customizer-content">
        <div className="picture-section">
          <div className="current-picture">
            <h4>Current Profile Picture</h4>
            <div className="profile-preview-container">
              {preview ? (
                <img 
                  src={preview} 
                  alt="Profile" 
                  className="profile-preview"
                />
              ) : (
                <div className="profile-placeholder">
                  <i className="fas fa-user"></i>
                  <span>No profile picture</span>
                </div>
              )}
            </div>
            
            {preview && (
              <button className="remove-btn" onClick={handleRemove}>
                🗑️ Remove Picture
              </button>
            )}
          </div>

          <div className="upload-section">
            <h4>Upload New Picture</h4>
            <div 
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={triggerFileInput}
            >
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <p><strong>Click to upload</strong> or drag and drop</p>
                <p>PNG, JPG, GIF up to 5MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="customizer-actions">
          {hasChanges && (
            <>
              <button className="reset-btn" onClick={handleReset}>
                🔄 Reset Changes
              </button>
              <button className="save-btn" onClick={handleSave}>
                💾 Save Profile Picture
              </button>
            </>
          )}
        </div>
      </div>

      <div className="customizer-tips">
        <h4>💡 Tips:</h4>
        <ul>
          <li>Use a square image (1:1 ratio) for best results</li>
          <li>Recommended size: 400x400 pixels or larger</li>
          <li>Keep file size under 5MB for faster loading</li>
          <li>JPG format is recommended for photos</li>
          <li>PNG format is recommended for logos or graphics</li>
          <li>Your face should be clearly visible and centered</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePictureCustomizer;