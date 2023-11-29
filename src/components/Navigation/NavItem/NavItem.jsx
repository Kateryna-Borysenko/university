import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext, themes } from "../../../context/themeContext.js";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <span className={s.icon}>{icon}</span>
      <span className={s.name}>{name}</span>
    </div>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
