import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon, path }) => {
  const location = useLocation();
  return (
    <NavLink
      to={path}
      className={classnames(s.container, {
        [s.active]: location.pathname === path,
      })}
    >
      <span className={s.icon}>{icon}</span>
      <span className={s.name}>{name}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
