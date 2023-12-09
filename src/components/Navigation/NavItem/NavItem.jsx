import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavItem.module.css';

const NavItem = ({ name, icon, path }) => {
  const setActive = ({ isActive }) => (isActive ? [s.active] : s.container);
  return (
    <NavLink to={path} className={setActive}>
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
