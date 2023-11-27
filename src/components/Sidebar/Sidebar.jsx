import Navigation from "../Navigation/Navigation";
import { navConfig } from "../../data/navigation";
import useToggle from "../../hooks/useToggle";
import defineStyles from "./defineStyles";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, toggleSidebar] = useToggle(false);

  return (
    <div className={defineStyles(isOpen)}>
      <div className="Sidebar-decor"></div>

      <button
        className="toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      ></button>

      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
