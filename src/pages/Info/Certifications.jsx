import GlobalContainer from "../../components/ContainerButton/GlobalContainer.jsx";
import { usePortfolio } from "../../contexts/PortfolioContext";

function Certifications() {
  const { certifications } = usePortfolio();

  return (
    <div>
      <h1>Certifications</h1>
      <p>This is the certifications section.</p>
      <GlobalContainer technologies={certifications} />
    </div>
  );
}

export default Certifications;