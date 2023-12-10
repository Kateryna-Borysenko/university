import { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import { navConfig } from '../../data/navigation';
import useToggle from '../../hooks/useToggle';
import { ThemeContext, themes } from '../../context/themeContext';
import defineStyles from './defineStyles';
import './Sidebar.css';
import s from './Sidebar.module.css';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, toggleSidebar] = useToggle(false);

  return (
    <div className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <div className={defineStyles(isOpen)}>
        <div className="Sidebar-decor"></div>

        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        ></button>

        <Navigation navConfig={navConfig} />
      </div>
    </div>
  );
};

export default Sidebar;
