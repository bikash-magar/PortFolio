import { usePortfolio } from "../../contexts/PortfolioContext";
import './AboutMe.css';

function AboutMe() {
    const { about, personal } = usePortfolio();
    
    return (
        <div className="about-me-container">
            <div className="about-header">
                <h1 className="about-title">{about.title || "About Me"}</h1>
                <div className="about-intro">
                    <p className="about-description">
                        {about.description || "Passionate developer creating amazing digital experiences with modern technologies."}
                    </p>
                </div>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <h2>Who I Am</h2>
                    <p>
                        I'm {personal.name || "a dedicated software developer"} with a passion for creating innovative solutions 
                        that make a difference. My journey in technology has been driven by curiosity, continuous learning, 
                        and a desire to build meaningful digital experiences.
                    </p>
                </div>

                {about.mission && (
                    <div className="about-section">
                        <h2>My Mission</h2>
                        <p>{about.mission}</p>
                    </div>
                )}

                {about.vision && (
                    <div className="about-section">
                        <h2>My Vision</h2>
                        <p>{about.vision}</p>
                    </div>
                )}

                <div className="about-section">
                    <h2>What Drives Me</h2>
                    <div className="qualities-grid">
                        <div className="quality-item">
                            <h3>🚀 Innovation</h3>
                            <p>Always exploring new technologies and approaches to solve complex problems.</p>
                        </div>
                        <div className="quality-item">
                            <h3>🎯 Quality</h3>
                            <p>Committed to writing clean, efficient, and maintainable code.</p>
                        </div>
                        <div className="quality-item">
                            <h3>🤝 Collaboration</h3>
                            <p>Believe in the power of teamwork and knowledge sharing.</p>
                        </div>
                        <div className="quality-item">
                            <h3>📚 Learning</h3>
                            <p>Continuous improvement and staying updated with industry trends.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;