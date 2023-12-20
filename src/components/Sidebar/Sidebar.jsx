import { useContext, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import { navConfig } from '../../data/navigation';
import useToggle from '../../hooks/useToggle';
import { authSelectors } from '../../redux/auth';
import UserInfo from '../../components/common/UserInfo/UserInfo';
import { ThemeContext, themes } from '../../context/themeContext';
import defineStyles from './defineStyles';
import './Sidebar.css';
import s from './Sidebar.module.css';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  const [isOpen, toggleSidebar] = useToggle(false);

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userName = useSelector(authSelectors.getUserName);

  return (
    <div className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <div className={defineStyles(isOpen)}>
        <div className="Sidebar-decor"></div>

        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        ></button>
        <Suspense fallback="Loading...">
          <Navigation navConfig={navConfig} />
        </Suspense>
        {isLoggedIn && <UserInfo username={userName ?? ''} />}
      </div>
    </div>
  );
};

export default Sidebar;
