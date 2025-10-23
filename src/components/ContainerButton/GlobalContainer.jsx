// GlobalContainer.jsx
import './GlobalContainer.css';
function GlobalContainer({ technologies }) {
  return (
    <div className="global-container">
      {technologies.map((tech, idx) => (
        <div className="tech-box" key={idx}>
          <h2>{tech.name}</h2>
          <p>{tech.description}</p>
          <p>{tech.ending}</p>
        </div>
      ))}
    </div>
  );
}

export default GlobalContainer;