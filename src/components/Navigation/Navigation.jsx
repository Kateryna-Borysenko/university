import PropTypes from "prop-types";
import { navConfig } from "../../data/navigation";
import NavItem from "./NavItem/NavItem";

const Navigation = () => {
  return (
    <nav>
      {navConfig.map(({ name }, index) => (
        <NavItem key={index} name={name} />
      ))}
    </nav>
  );
};

Navigation.propTypes = {
  navConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
