import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Dashboard.css';

// Import dashboard components
import DashboardHome from './DashboardHome';
import PersonalInfoEditor from './PersonalInfoEditor';
import AboutContentEditor from './AboutContentEditor';
import TechnologiesEditor from './TechnologiesEditor';
import ToolsEditor from './ToolsEditor';
import CertificationsEditor from './CertificationsEditor';
import JourneyEditor from './JourneyEditor';
import ProjectsEditor from './ProjectsEditor';
import BlogEditor from './BlogEditor';
import ResumeEditor from './ResumeEditor';
import DataManager from './DataManager';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { exportData, importData, resetToDefaults, lastUpdated } = usePortfolio();
  const [showDataMenu, setShowDataMenu] = useState(false);

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('portfolio_auth');
    localStorage.removeItem('portfolio_auth_time');
    
    // Redirect to login
    navigate('/login');
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      importData(file).catch(console.error);
    }
    event.target.value = ''; // Reset input
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
    }
  };
  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard Home' },
    { path: '/dashboard/personal', label: 'Personal Info' },
    { path: '/dashboard/about-content', label: 'About Content' },
    { path: '/dashboard/technologies', label: 'Technologies' },
    { path: '/dashboard/tools', label: 'Tools' },
    { path: '/dashboard/certifications', label: 'Certifications' },
    { path: '/dashboard/journey', label: 'Learning Journey' },
    { path: '/dashboard/projects', label: 'Projects' },
    { path: '/dashboard/resume', label: 'Resume' },
    { path: '/dashboard/blog', label: 'Blog Posts' },
    { path: '/dashboard/data-manager', label: 'Data Management' }
  ];

  return (
    <div className="dashboard-container">
      {/* Static Website Banner */}
      <div className="static-banner">
        <div className="static-content">
          <span className="static-icon">📱</span>
          <div className="static-text">
            <strong>Static Portfolio Dashboard</strong>
            <span>All changes saved locally • Last updated: {new Date(lastUpdated).toLocaleString()}</span>
          </div>
          <div className="static-actions">
            <button onClick={exportData} className="btn btn-sm btn-secondary">
              📤 Export Data
            </button>
            <label className="btn btn-sm btn-secondary">
              📥 Import Data
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileImport}
                style={{ display: 'none' }}
              />
            </label>
            <button onClick={handleReset} className="btn btn-sm btn-danger">
              🔄 Reset
            </button>
            <button onClick={handleLogout} className="btn btn-sm btn-outline">
              🔓 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
        <div className="dashboard-header">
          <h2>Portfolio Dashboard</h2>
          <div className="header-actions">
            <Link to="/" className="view-site-btn">View Site</Link>
          </div>
        </div>
        <nav className="dashboard-nav">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/personal" element={<PersonalInfoEditor />} />
          <Route path="/about-content" element={<AboutContentEditor />} />
          <Route path="/technologies" element={<TechnologiesEditor />} />
          <Route path="/tools" element={<ToolsEditor />} />
          <Route path="/certifications" element={<CertificationsEditor />} />
          <Route path="/journey" element={<JourneyEditor />} />
          <Route path="/projects" element={<ProjectsEditor />} />
          <Route path="/resume" element={<ResumeEditor />} />
          <Route path="/blog" element={<BlogEditor />} />
          <Route path="/data-manager" element={<DataManager />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}

export default Dashboard;