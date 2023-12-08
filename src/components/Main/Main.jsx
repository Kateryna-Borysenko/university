import { useContext } from "react";
import { ThemeContext, themes } from "../../context/themeContext";
import LangsSwitcher from "../common/LangsSwitcher/LangsSwitcher";

import AllRoutes from "../../routes/AllRoutes";
import s from "./Main.module.css";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <LangsSwitcher />

      <AllRoutes />
    </main>
  );
};

export default Main;
