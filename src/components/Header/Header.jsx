import { useContext } from "react";
import PropTypes from "prop-types";
import s from "./Header.module.css";
import { ThemeContext, themes } from "../../context/themeContext";
import ThemeSwitcher from "../common/ThemeSwitcher/ThemeSwitcher";

const Header = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <header className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <ThemeSwitcher />
      {title && <h2 className="heading">{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
