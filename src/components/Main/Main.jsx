import { useContext, Suspense } from "react";
import { ThemeContext, themes } from "../../context/themeContext";
import LangsSwitcher from "../common/LangsSwitcher/LangsSwitcher";
import Loader from "../common/Loader/Loader";
import AllRoutes from "../../routes/AllRoutes";
import s from "./Main.module.css";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <Suspense fallback={<Loader />}>
        <LangsSwitcher />
      </Suspense>

      <AllRoutes />
    </main>
  );
};

export default Main;
