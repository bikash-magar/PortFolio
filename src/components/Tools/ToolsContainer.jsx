import './ToolsContainer.css';
function ToolsContainer({ tools }) {
  return (
    <div className="tools-container">
      {tools.map((tool, index) => (
        <div key={index} className={`tool-box ${index === 0 ? 'active' : ''}`}>
          <h3>{tool.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default ToolsContainer;