import { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

function AboutContentEditor() {
  const { aboutContent, updateData } = usePortfolio();
  
  // Default data structure
  const defaultContent = {
    storyJourney: [
      {
        id: 1,
        icon: "🎯",
        title: "The Beginning",
        description: "Started my coding journey with curiosity and determination, diving deep into various programming languages and frameworks."
      },
      {
        id: 2,
        icon: "💡",
        title: "Discovery",
        description: "Found my passion in full-stack development, creating seamless experiences from backend APIs to beautiful user interfaces."
      },
      {
        id: 3,
        icon: "🚀",
        title: "Today",
        description: "Continuously learning and building innovative solutions, always excited about the next challenge and opportunity to grow."
      }
    ],
    values: [
      {
        id: 1,
        icon: "🎯",
        title: "Quality First",
        description: "Every line of code matters. I believe in writing clean, maintainable, and scalable solutions that stand the test of time.",
        highlight: "Clean Code"
      },
      {
        id: 2,
        icon: "🤝",
        title: "Collaboration",
        description: "Great products are built by great teams. I thrive in collaborative environments where ideas flow freely and everyone contributes.",
        highlight: "Teamwork"
      },
      {
        id: 3,
        icon: "📚",
        title: "Continuous Learning",
        description: "Technology evolves rapidly. I stay current with the latest trends, best practices, and emerging technologies in the field.",
        highlight: "Growth Mindset"
      },
      {
        id: 4,
        icon: "🚀",
        title: "Innovation",
        description: "I love exploring new technologies and finding creative solutions to complex problems that make a real difference.",
        highlight: "Creative Solutions"
      }
    ],
    funFacts: [
      {
        id: 1,
        icon: "☕",
        title: "Coffee Enthusiast",
        description: "I run on caffeine and creativity. My best code is written with a perfect cup of coffee by my side.",
        stat: "5+ cups daily"
      },
      {
        id: 2,
        icon: "🎮",
        title: "Gaming Strategist",
        description: "Strategy games help me think analytically and approach problems from different angles.",
        stat: "Problem Solver"
      },
      {
        id: 3,
        icon: "🌱",
        title: "Lifelong Learner",
        description: "Currently exploring AI and machine learning, always curious about emerging technologies.",
        stat: "Never Stops"
      },
      {
        id: 4,
        icon: "🎵",
        title: "Music-Powered Coding",
        description: "Lo-fi beats and ambient music fuel my productivity and help me stay in the flow state.",
        stat: "Focus Mode"
      }
    ]
  };

  // Initialize content with either stored data or defaults
  const [content, setContent] = useState(aboutContent || {});
  
  const [saved, setSaved] = useState(false);

  // Update content when aboutContent from context changes
  useEffect(() => {
    if (aboutContent) {
      setContent(aboutContent);
    }
  }, [aboutContent]);

  const handleJourneyChange = (index, field, value) => {
    const newJourney = [...content.storyJourney];
    newJourney[index] = { ...newJourney[index], [field]: value };
    setContent(prev => ({ ...prev, storyJourney: newJourney }));
  };

  const handleValueChange = (index, field, value) => {
    const newValues = [...content.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent(prev => ({ ...prev, values: newValues }));
  };

  const handleFactChange = (index, field, value) => {
    const newFacts = [...content.funFacts];
    newFacts[index] = { ...newFacts[index], [field]: value };
    setContent(prev => ({ ...prev, funFacts: newFacts }));
  };

  const addJourneyItem = () => {
    const newItem = {
      id: Date.now(),
      icon: "🔥",
      title: "New Journey Step",
      description: "Description of this journey step..."
    };
    setContent(prev => ({ 
      ...prev, 
      storyJourney: [...prev.storyJourney, newItem] 
    }));
  };

  const addValue = () => {
    const newValue = {
      id: Date.now(),
      icon: "⭐",
      title: "New Value",
      description: "Description of this value...",
      highlight: "Keyword"
    };
    setContent(prev => ({ 
      ...prev, 
      values: [...prev.values, newValue] 
    }));
  };

  const addFunFact = () => {
    const newFact = {
      id: Date.now(),
      icon: "🎉",
      title: "New Fun Fact",
      description: "Description of this fun fact...",
      stat: "Stat"
    };
    setContent(prev => ({ 
      ...prev, 
      funFacts: [...prev.funFacts, newFact] 
    }));
  };

  const removeJourneyItem = (index) => {
    const newJourney = content.storyJourney.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, storyJourney: newJourney }));
  };

  const removeValue = (index) => {
    const newValues = content.values.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, values: newValues }));
  };

  const removeFunFact = (index) => {
    const newFacts = content.funFacts.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, funFacts: newFacts }));
  };

  const handleSave = () => {
    updateData('aboutContent', content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">About Page Content</h1>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px', fontSize: '12px' }}>
          <strong>Debug:</strong> Content loaded with {content.storyJourney?.length || 0} journey items, 
          {content.values?.length || 0} values, {content.funFacts?.length || 0} facts
        </div>
      )}

      {/* Story Journey Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Story Journey Items</h2>
          <button className="btn btn-secondary" onClick={addJourneyItem}>
            Add Journey Step
          </button>
        </div>
        
        {content.storyJourney && content.storyJourney.length > 0 ? (
          content.storyJourney.map((item, index) => (
            <div key={item.id || index} className="item-card">
              <div className="item-header">
                <h3>Journey Step {index + 1}</h3>
                {content.storyJourney.length > 1 && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeJourneyItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={item.icon || ''}
                    onChange={(e) => handleJourneyChange(index, 'icon', e.target.value)}
                    placeholder="🎯"
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleJourneyChange(index, 'title', e.target.value)}
                    placeholder="Journey Step Title"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={item.description || ''}
                  onChange={(e) => handleJourneyChange(index, 'description', e.target.value)}
                  placeholder="Describe this step in your journey..."
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-content-message">
            <p>No journey items yet. Click "Add Journey Step" to get started!</p>
          </div>
        )}
      </div>

      {/* Values Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Values & Beliefs</h2>
          <button className="btn btn-secondary" onClick={addValue}>
            Add Value
          </button>
        </div>
        
        {content.values && content.values.length > 0 ? (
          content.values.map((value, index) => (
            <div key={value.id || index} className="item-card">
              <div className="item-header">
                <h3>Value {index + 1}</h3>
                {content.values.length > 1 && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeValue(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={value.icon || ''}
                    onChange={(e) => handleValueChange(index, 'icon', e.target.value)}
                    placeholder="🎯"
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={value.title || ''}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    placeholder="Value Title"
                  />
                </div>
                <div className="form-group">
                  <label>Highlight Badge</label>
                  <input
                    type="text"
                    value={value.highlight || ''}
                    onChange={(e) => handleValueChange(index, 'highlight', e.target.value)}
                    placeholder="Key Concept"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={value.description || ''}
                  onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  placeholder="Describe this value and why it's important..."
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-content-message">
            <p>No values yet. Click "Add Value" to get started!</p>
          </div>
        )}
      </div>

      {/* Fun Facts Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Fun Facts</h2>
          <button className="btn btn-secondary" onClick={addFunFact}>
            Add Fun Fact
          </button>
        </div>
        
        {content.funFacts && content.funFacts.length > 0 ? (
          content.funFacts.map((fact, index) => (
            <div key={fact.id || index} className="item-card">
              <div className="item-header">
                <h3>Fun Fact {index + 1}</h3>
                {content.funFacts.length > 1 && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFunFact(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={fact.icon || ''}
                    onChange={(e) => handleFactChange(index, 'icon', e.target.value)}
                    placeholder="☕"
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={fact.title || ''}
                    onChange={(e) => handleFactChange(index, 'title', e.target.value)}
                    placeholder="Fun Fact Title"
                  />
                </div>
                <div className="form-group">
                  <label>Stat Badge</label>
                  <input
                    type="text"
                    value={fact.stat || ''}
                    onChange={(e) => handleFactChange(index, 'stat', e.target.value)}
                    placeholder="Quick Stat"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={fact.description || ''}
                  onChange={(e) => handleFactChange(index, 'description', e.target.value)}
                  placeholder="Describe this fun fact about yourself..."
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-content-message">
            <p>No fun facts yet. Click "Add Fun Fact" to get started!</p>
          </div>
        )}
      </div>

      <button 
        className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
        onClick={handleSave}
      >
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}

export default AboutContentEditor;