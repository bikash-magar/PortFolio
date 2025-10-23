import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDark, toggleDarkMode }) => {
  return (
    <button
      className={`dark-mode-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleDarkMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="toggle-icon">{isDark ? '🌙' : '☀️'}</span>
          <span className="toggle-text">{isDark ? 'DARK' : 'LIGHT'}</span>
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;