import GlobalContainer from "../../components/ContainerButton/GlobalContainer";
import { usePortfolio } from "../../contexts/PortfolioContext";

function ExploringTech() {
  const { technologies } = usePortfolio();
  
  console.log('ExploringTech received technologies:', technologies);

  return (
    <div>
      <h1>Exploring Technology</h1>
      <p>This is the exploring technology section.</p>
      <p>Technologies count: {technologies.length}</p>
      <GlobalContainer technologies={technologies} />
    </div>
  );
}

export default ExploringTech;