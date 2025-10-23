import JourneyButtons from "../../components/JourneyButton/JourneyButtons";
import { usePortfolio } from "../../contexts/PortfolioContext";

function LearningJourney() {
  const { learningJourney } = usePortfolio();
  
  // Sort journey items by step number
  const sortedJourney = [...learningJourney].sort((a, b) => parseInt(a.step) - parseInt(b.step));
  
  const leftButtons = sortedJourney.map(item => item.step);
  const rightItems = sortedJourney.map(item => item.title);

  return (
    <div>
      <h2>Learning Journey</h2>
      <p>My learning journey has been filled with challenges and opportunities.</p>
      <JourneyButtons leftButtons={leftButtons} rightItems={rightItems} />
    </div>
  );
}

export default LearningJourney;