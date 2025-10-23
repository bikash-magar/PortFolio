import ToolsContainer from "../../components/Tools/ToolsContainer";
import { usePortfolio } from "../../contexts/PortfolioContext";

function Tools() {
  const { tools } = usePortfolio();

  return (
    <div>
      <h2>Tools and Utilities</h2>
      <ToolsContainer tools={tools} />
    </div>
  );
}
export default Tools;