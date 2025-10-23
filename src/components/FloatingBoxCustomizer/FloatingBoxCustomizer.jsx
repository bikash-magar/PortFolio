import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './FloatingBoxCustomizer.css';

const FloatingBoxCustomizer = () => {
  const { floatingCards, updateFloatingCards } = usePortfolio();
  
  console.log('FloatingBoxCustomizer rendered', { floatingCards, updateFloatingCards });
  
  // Default floating cards structure
  const defaultCards = [
    { id: 1, icon: '⚛️', title: 'React', subtitle: 'Frontend', className: 'react-card' },
    { id: 2, icon: '🟨', title: 'JavaScript', subtitle: 'ES6+', className: 'javascript-card' },
    { id: 3, icon: '🎨', title: 'UI/UX', subtitle: 'Design', className: 'design-card' },
    { id: 4, icon: '🟢', title: 'Node.js', subtitle: 'Backend', className: 'node-card' },
    { id: 5, icon: '🗄️', title: 'Database', subtitle: 'MongoDB', className: 'database-card' },
    { id: 6, icon: '📦', title: 'Git', subtitle: 'Version Control', className: 'git-card' }
  ];

  const [cards, setCards] = useState(floatingCards || defaultCards);
  const [editingCard, setEditingCard] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Sync with context data when it changes
  useEffect(() => {
    setCards(floatingCards || defaultCards);
  }, [floatingCards]);

  const handleCardEdit = (cardId) => {
    setEditingCard(cardId);
  };

  const handleCardUpdate = (cardId, field, value) => {
    // Validate input
    if (field === 'title' && value.length > 20) {
      alert('Title should be 20 characters or less for better display');
      return;
    }
    if (field === 'subtitle' && value.length > 30) {
      alert('Subtitle should be 30 characters or less for better display');
      return;
    }
    if (field === 'icon' && value.length > 5) {
      alert('Icon should be a single emoji or short symbol');
      return;
    }

    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, [field]: value } : card
    );
    setCards(updatedCards);
    setHasChanges(true);
  };

  const handleCardSave = () => {
    setEditingCard(null);
  };

  const handleSaveChanges = () => {
    // Validate all cards before saving
    const hasEmptyFields = cards.some(card => 
      !card.title.trim() || !card.subtitle.trim() || !card.icon.trim()
    );
    
    if (hasEmptyFields) {
      alert('Please fill in all fields for all cards before saving.');
      return;
    }

    updateFloatingCards(cards);
    setHasChanges(false);
    
    // Show success message with animation
    const successMsg = document.createElement('div');
    successMsg.textContent = '✅ Floating cards updated successfully!';
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

  const handleResetToDefaults = () => {
    setCards(defaultCards);
    setHasChanges(true);
  };

  const moveCard = (fromIndex, toIndex) => {
    const newCards = [...cards];
    const [movedCard] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, movedCard);
    setCards(newCards);
    setHasChanges(true);
  };

  const addNewCard = () => {
    const newCard = {
      id: Date.now(),
      icon: '🔧',
      title: 'New Skill',
      subtitle: 'Category',
      className: 'new-card'
    };
    setCards([...cards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (cardId) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== cardId));
      setHasChanges(true);
    }
  };

  // Drag and Drop functions
  const handleDragStart = (e, card, index) => {
    setDraggedCard({ card, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedCard && draggedCard.index !== dropIndex) {
      const newCards = [...cards];
      const [movedCard] = newCards.splice(draggedCard.index, 1);
      newCards.splice(dropIndex, 0, movedCard);
      setCards(newCards);
      setHasChanges(true);
    }
    
    setDraggedCard(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverIndex(null);
  };

  return (
    <div className="floating-box-customizer">
      <div className="customizer-header">
        <h3>🎨 Floating Cards Customizer</h3>
        <p>Edit the floating tech cards that appear on your home page</p>
        {hasChanges && (
          <div className="changes-indicator">
            <span className="changes-dot"></span>
            Unsaved changes
          </div>
        )}
      </div>

      <div className="customizer-content">
        <div className="cards-grid">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className={`customizer-card ${editingCard === card.id ? 'editing' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, card, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="card-header">
                <div className="drag-handle" title="Drag to reorder">
                  ⋮⋮
                </div>
                <div className="card-controls">
                  <button 
                    className="move-btn" 
                    onClick={() => index > 0 && moveCard(index, index - 1)}
                    disabled={index === 0}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button 
                    className="move-btn" 
                    onClick={() => index < cards.length - 1 && moveCard(index, index + 1)}
                    disabled={index === cards.length - 1}
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => deleteCard(card.id)}
                    disabled={cards.length <= 1}
                    title="Delete card"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="card-preview">
                <div className={`floating-card-preview ${card.className}`}>
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-content">
                    <span className="card-title">{card.title}</span>
                    <span className="card-subtitle">{card.subtitle}</span>
                  </div>
                </div>
              </div>

              {editingCard === card.id ? (
                <div className="card-editor">
                  <div className="editor-row">
                    <label>Icon:</label>
                    <input
                      type="text"
                      value={card.icon}
                      onChange={(e) => handleCardUpdate(card.id, 'icon', e.target.value)}
                      placeholder="🔧"
                      maxLength="5"
                    />
                  </div>
                  <div className="editor-row">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardUpdate(card.id, 'title', e.target.value)}
                      placeholder="Technology Name"
                      maxLength="20"
                    />
                  </div>
                  <div className="editor-row">
                    <label>Subtitle:</label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => handleCardUpdate(card.id, 'subtitle', e.target.value)}
                      placeholder="Category/Level"
                      maxLength="30"
                    />
                  </div>
                  <button className="save-btn" onClick={handleCardSave}>
                    Save Card
                  </button>
                </div>
              ) : (
                <div className="card-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleCardEdit(card.id)}
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="customizer-actions">
          <button className="add-card-btn" onClick={addNewCard}>
            ➕ Add New Card
          </button>
          <button className="reset-btn" onClick={handleResetToDefaults}>
            🔄 Reset to Defaults
          </button>
          {hasChanges && (
            <button className="save-all-btn" onClick={handleSaveChanges}>
              💾 Save All Changes
            </button>
          )}
        </div>
      </div>

      <div className="customizer-tips">
        <h4>💡 Tips:</h4>
        <ul>
          <li>Use emojis for icons to keep the design consistent</li>
          <li>Keep titles short (1-2 words) for better display</li>
          <li>Subtitles should describe the category or level</li>
          <li>Drag cards by the ⋮⋮ handle to reorder them easily</li>
          <li>Use the move buttons for precise positioning</li>
          <li>Changes won't appear on your home page until you save</li>
        </ul>
      </div>
    </div>
  );
};

export default FloatingBoxCustomizer;