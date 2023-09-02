import PropTypes from "prop-types";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon }) => {
  return (
    <div className={s.container}>
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
