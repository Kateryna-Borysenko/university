import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext, themes } from "../../../context/themeContext";
import s from "./Filter.module.css";

//TODO: реализовать подсветку и фокус на инпуте
const Filter = ({ label = "", value, onFilterChange }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={s.container}>
      <label className={theme === themes.light ? s.lightTheme : s.darkTheme}>
        {label}
        <input
          className={s.textField}
          type="text"
          value={value}
          onChange={(e) => onFilterChange(e.target.value)}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
