import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext, themes } from '../../context/themeContext';
import LangsSwitcher from '../common/LangsSwitcher/LangsSwitcher';
import ScrollToTopButton from '../common/ScrollToTopButton/ScrollToTopButton';
import Spinner from '../common/Spinner/Spinner';
import { authOperations, authSelectors } from '../../redux/auth';
import AllRoutes from '../../routes/AllRoutes';
import s from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const isLoadingUser = useSelector(authSelectors.getLoadingUser);

  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  if (isLoadingUser) {
    return <Spinner />;
  }
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <LangsSwitcher />
      <AllRoutes />
      <ScrollToTopButton />
    </main>
  );
};

export default Main;
