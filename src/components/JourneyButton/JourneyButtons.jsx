import './JourneyButtons.css';
function JourneyButtons({ leftButtons, rightItems }) {
  return (
    <div className="journey-row">
      <div className="journey-left">
        {leftButtons.map((btn, idx) => (
          <div key={idx} className="journey-btn">{btn}</div>
        ))}
      </div>
      <div className="journey-right">
        {rightItems.map((item, idx) => (
          <div key={idx} className="journey-item">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default JourneyButtons;