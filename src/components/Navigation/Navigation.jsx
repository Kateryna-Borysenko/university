import PropTypes from "prop-types";
import NavItem from "./NavItem/NavItem";
import s from "./Navigation.module.css";

const Navigation = ({ navConfig }) => {
  return (
    <nav>
      <ul className={s.container}>
        {navConfig.map(({ name, icon }, index) => (
          <NavItem key={index} name={name} icon={icon} />
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  navConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
