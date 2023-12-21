import { useContext } from 'react';
import { ThemeContext, themes } from '../../context/themeContext';
import LangsSwitcher from '../common/LangsSwitcher/LangsSwitcher';
import ScrollToTopButton from '../common/ScrollToTopButton/ScrollToTopButton';
import AllRoutes from '../../routes/AllRoutes';
import s from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <LangsSwitcher />
      <AllRoutes />
      <ScrollToTopButton />
    </main>
  );
};

export default Main;
