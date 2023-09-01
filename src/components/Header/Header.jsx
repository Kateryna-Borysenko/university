import PropTypes from "prop-types";
import s from "./Header.module.css";

const Header = ({ title }) => {
  return <header>{title && <h2>{title}</h2>}</header>;
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
