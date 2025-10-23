import { useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

function DataManager() {
  const { data, exportData, importData, resetToDefaults } = usePortfolio();
  const [message, setMessage] = useState('');

  const handleSaveAsDefaults = () => {
    try {
      const content = `export const portfolioData = ${JSON.stringify(data, null, 2)};
export default portfolioData;`;
      
      const blob = new Blob([content], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'portfolioData.js';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setMessage('portfolioData.js downloaded! Replace src/data/portfolioData.js to make changes permanent.');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleSaveAsJSON = () => {
    saveAsDefault();
    setMessage('portfolio.json downloaded! Replace public/portfolio.json to make changes permanent.');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="dashboard-content">
      <h1>Data Management</h1>
      
      {message && <div style={{padding: '10px', background: '#d4edda', margin: '10px 0'}}>{message}</div>}
      
      <div style={{marginBottom: '20px'}}>
        <h2>Export & Import</h2>
        <button className="btn btn-primary" onClick={exportData}>Export Data</button>
        <label className="btn btn-secondary" style={{marginLeft: '10px'}}>
          Import Data
          <input type="file" accept=".json" onChange={(e) => {
            const file = e.target.files[0];
            if (file) importData(file);
          }} style={{display: 'none'}} />
        </label>
      </div>
      
      <div style={{marginBottom: '20px'}}>
        <h2>Make Changes Permanent</h2>
        
        <div style={{marginBottom: '15px'}}>
          <h3>Option 1: Update portfolio.json (Recommended)</h3>
          <p>Download updated portfolio.json file - this is your primary data source.</p>
          <button className="btn btn-success" onClick={handleSaveAsJSON}>
            💾 Save as portfolio.json
          </button>
        </div>
        
        <div>
          <h3>Option 2: Update portfolioData.js (Fallback)</h3>
          <p>Download updated portfolioData.js file to replace the fallback data.</p>
          <button className="btn btn-primary" onClick={handleSaveAsDefaults}>
            📁 Save as portfolioData.js
          </button>
        </div>
      </div>
      
      <div>
        <h2>Instructions</h2>
        <div style={{marginBottom: '15px'}}>
          <h3>To make portfolio.json changes permanent:</h3>
          <ol>
            <li>Click "💾 Save as portfolio.json"</li>
            <li>Replace <code>public/portfolio.json</code> with downloaded file</li>
            <li>Deploy your changes</li>
            <li>✅ Your changes are now the default for all visitors!</li>
          </ol>
        </div>
        
        <div>
          <h3>To make portfolioData.js changes permanent:</h3>
          <ol>
            <li>Click "📁 Save as portfolioData.js"</li>
            <li>Replace <code>src/data/portfolioData.js</code> with downloaded file</li>
            <li>Restart dev server and deploy</li>
            <li>✅ Your changes are now the fallback default!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DataManager;
