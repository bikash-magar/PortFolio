import { usePortfolio } from '../../contexts/PortfolioContext';
import FloatingBoxCustomizer from '../../components/FloatingBoxCustomizer/FloatingBoxCustomizer';
import ProfilePictureCustomizer from '../../components/ProfilePictureCustomizer/ProfilePictureCustomizer';
import './Dashboard.css';

function DashboardHome() {
  const { technologies, tools, certifications, projects, resume, resetToDefaults } = usePortfolio();
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This action cannot be undone.')) {
      resetToDefaults();
      alert('Data has been reset to defaults!');
    }
  };
  
  const stats = [
    {
      title: technologies.length,
      label: 'Technologies'
    },
    {
      title: tools.length,
      label: 'Tools'
    },
    {
      title: certifications.length,
      label: 'Certifications'
    },
    {
      title: projects.length,
      label: 'Projects'
    },
    {
      title: resume?.sections?.length || 0,
      label: 'Resume Sections'
    }
  ];

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Portfolio Dashboard</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">📷 Profile Picture Customizer</h2>
        <p>Upload and manage your profile picture that appears on the home page hero section.</p>
        <ProfilePictureCustomizer />
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">🎨 Floating Cards Customizer</h2>
        <p>Customize the tech stack cards that appear on your home page. Edit their content, order, and appearance.</p>
        <FloatingBoxCustomizer />
      </div>
      
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <p>Welcome to your portfolio dashboard! Use the navigation menu to edit different sections of your portfolio.</p>
        <ul>
          <li><strong>Personal Info:</strong> Update your name, title, and contact information</li>
          <li><strong>Technologies:</strong> Add or edit programming languages and frameworks you know</li>
          <li><strong>Tools:</strong> Manage the development tools you use</li>
          <li><strong>Certifications:</strong> Add your certifications and achievements</li>
          <li><strong>Learning Journey:</strong> Update your learning milestones</li>
          <li><strong>Projects:</strong> Showcase your work and projects</li>
          <li><strong>Resume:</strong> Edit your professional resume sections</li>
        </ul>
        
        <div className="dashboard-actions">
          <button 
            className="btn btn-danger" 
            onClick={handleReset}
            style={{ marginTop: '20px' }}
          >
            Reset All Data to Defaults
          </button>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            This will clear all your custom data and restore default content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;