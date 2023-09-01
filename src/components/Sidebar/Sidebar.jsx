import Navigation from "../Navigation/Navigation";
import { navConfig } from "../../data/navigation";

const Sidebar = () => {
  return (
    <div>
      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
